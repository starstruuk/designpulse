import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config: adjust these paths if needed ──────────────────────────────────────
const COMPONENTS_DIR = path.resolve(__dirname, 'components/ui');
const STORIES_DIR = path.resolve(__dirname, 'stories');

// Compound components: fills automatically from files with multiple exports.
// Only add entries here if you need to OVERRIDE the auto-detected root or
// manually group components that span multiple files.
const COMPOUND_OVERRIDES = {
  Accordion: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'],
  // Select: ['Select', 'SelectTrigger', 'SelectContent', 'SelectItem', 'SelectValue'],
  // Dialog: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle'],
};
// ─────────────────────────────────────────────────────────────────────────────

function getNamedExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = [];

  const braceExports = content.match(/export\s*\{([^}]+)\}/g);
  if (braceExports) {
    braceExports.forEach(block => {
      const names = block
        .replace(/export\s*\{/, '')
        .replace('}', '')
        .split(',')
        .map(n => n.trim().split(/\s+as\s+/).pop().trim())
        .filter(n => /^[A-Z]/.test(n));
      matches.push(...names);
    });
  }

  const inlineExports = [...content.matchAll(/export\s+(?:const|function|class)\s+([A-Z][a-zA-Z0-9]*)/g)];
  inlineExports.forEach(m => matches.push(m[1]));

  return [...new Set(matches)];
}

// Auto-detect compound groups from files with multiple exports.
// The shortest export name is treated as the root.
function buildCompoundMap(allFileExports) {
  const compoundMap = {}; // { ComponentName -> { root, members } }

  // First apply manual overrides
  for (const [root, members] of Object.entries(COMPOUND_OVERRIDES)) {
    members.forEach(m => {
      compoundMap[m] = { root, members };
    });
  }

  // Then auto-detect from files with multiple exports
  for (const { exports } of allFileExports) {
    if (exports.length <= 1) continue;

    // Skip if already handled by an override
    const alreadyHandled = exports.some(e => compoundMap[e]);
    if (alreadyHandled) continue;

    // Shortest name = root (e.g. "Accordion" is shorter than "AccordionItem")
    const root = exports.reduce((a, b) => (a.length <= b.length ? a : b));
    exports.forEach(m => {
      compoundMap[m] = { root, members: exports };
    });
  }

  return compoundMap;
}

function generateCompoundStoryContent(root, members, importPath) {
  const imports = members.join(', ');

  // Known render templates for common shadcn/ui compound components
  const usageMap = {
    Accordion: `
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>Yes. It comes with default styles that match your design system.</AccordionContent>
    </AccordionItem>
  </Accordion>`,
    Select: `
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option-1">Option 1</SelectItem>
      <SelectItem value="option-2">Option 2</SelectItem>
    </SelectContent>
  </Select>`,
    Dialog: `
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
      </DialogHeader>
      <p>Dialog content goes here.</p>
    </DialogContent>
  </Dialog>`,
  };

  const usage = usageMap[root]
    ?? `\n  <${root}>\n    {/* compose ${members.filter(m => m !== root).join(', ')} here */}\n  </${root}>`;

  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${imports} } from '${importPath}';

const meta: Meta<typeof ${root}> = {
  title: 'UI/${root}',
  component: ${root},
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ${root}>;

export const Default: Story = {
  render: () => (${usage}
  ),
};
`;
}

function generateSimpleStoryContent(componentName, importPath) {
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from '${importPath}';

const meta: Meta<typeof ${componentName}> = {
  title: 'UI/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {};
`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

if (!fs.existsSync(STORIES_DIR)) {
  fs.mkdirSync(STORIES_DIR, { recursive: true });
  console.log(`Created stories directory at ${STORIES_DIR}\n`);
}

const files = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.tsx'));

if (files.length === 0) {
  console.log('No .tsx files found in components/ui. Check your COMPONENTS_DIR path.');
  process.exit(1);
}

// First pass: collect all exports per file
const allFileExports = files.map(file => ({
  file,
  filePath: path.join(COMPONENTS_DIR, file),
  componentFileName: path.basename(file, '.tsx'),
  exports: getNamedExports(path.join(COMPONENTS_DIR, file)),
}));

// Build the compound map from all files
const compoundMap = buildCompoundMap(allFileExports);

// Track which compound roots have already been written
const writtenCompoundRoots = new Set();

let created = 0;
let updated = 0;
let skipped = 0;
let deleted = 0;

// Delete stories for sub-components that are now handled by a compound story
const existingStories = fs.readdirSync(STORIES_DIR).filter(f => f.endsWith('.stories.tsx'));
existingStories.forEach(storyFile => {
  const componentName = storyFile.replace('.stories.tsx', '');
  const group = compoundMap[componentName];
  // Delete if it's a sub-component (not the root) of a compound group
  if (group && group.root !== componentName) {
    fs.unlinkSync(path.join(STORIES_DIR, storyFile));
    console.log(`🗑  Deleted sub-component story: ${storyFile}`);
    deleted++;
  }
});

if (deleted > 0) console.log('');

// Second pass: generate stories
allFileExports.forEach(({ file, componentFileName, exports }) => {
  const relativeImport = '../components/ui/' + componentFileName;

  if (exports.length === 0) {
    console.log(`⚠  Skipped ${file} — no PascalCase named exports found`);
    skipped++;
    return;
  }

  exports.forEach(componentName => {
    const group = compoundMap[componentName];

    if (group) {
      // Only write once per compound root
      if (writtenCompoundRoots.has(group.root)) return;

      // Skip sub-components — only write for the root
      if (group.root !== componentName) return;

      writtenCompoundRoots.add(group.root);

      const storyFile = path.join(STORIES_DIR, `${group.root}.stories.tsx`);
      const content = generateCompoundStoryContent(group.root, group.members, relativeImport);
      const existed = fs.existsSync(storyFile);

      fs.writeFileSync(storyFile, content, 'utf-8');
      existed
        ? console.log(`🔄  Remade (compound):  ${group.root}.stories.tsx  [${group.members.join(', ')}]`)
        : console.log(`✅  Created (compound): ${group.root}.stories.tsx  [${group.members.join(', ')}]`);
      existed ? updated++ : created++;

    } else {
      const storyFile = path.join(STORIES_DIR, `${componentName}.stories.tsx`);
      const content = generateSimpleStoryContent(componentName, relativeImport);
      const existed = fs.existsSync(storyFile);

      fs.writeFileSync(storyFile, content, 'utf-8');
      existed
        ? console.log(`🔄  Remade:  ${componentName}.stories.tsx`)
        : console.log(`✅  Created: ${componentName}.stories.tsx`);
      existed ? updated++ : created++;
    }
  });
});

console.log(`\nDone! ${created} created, ${updated} remade, ${deleted} deleted, ${skipped} skipped.`);
