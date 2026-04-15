import type { PrismaClient } from '../../generated/prisma';
import { Pricing } from '../../generated/prisma';
import { prisma } from '../../lib/prisma';

// ─── Categories ───────────────────────────────────────────────────────────────

const CATEGORY_DATA = [
  { name: 'AI Tools',             slug: 'ai-tools',      color: '#FF6B6B', icon: 'Sparkles'    },
  { name: 'Design Tools',         slug: 'design-tools',  color: '#6C63FF', icon: 'Pen'         },
  { name: 'Icons',                slug: 'icons',         color: '#6C63FF', icon: 'Star'        },
  { name: 'Fonts & Typography',   slug: 'fonts',         color: '#E94560', icon: 'Type'        },
  { name: 'UI Kits',              slug: 'ui-kits',       color: '#00D2FF', icon: 'LayoutGrid'  },
  { name: 'Prototyping & Motion', slug: 'prototyping',   color: '#00B894', icon: 'Play'        },
  { name: 'Color Tools',          slug: 'color-tools',   color: '#FFA502', icon: 'Palette'     },
  { name: 'Learning',             slug: 'learning',      color: '#FDCB6E', icon: 'BookOpen'    },
  { name: 'Inspiration',          slug: 'inspiration',   color: '#A29BFE', icon: 'Zap'         },
  { name: 'Stock Photos',         slug: 'stock-photos',  color: '#10B981', icon: 'Camera'      },
  { name: 'Productivity',         slug: 'productivity',  color: '#3B82F6', icon: 'CheckSquare' },
  { name: 'Web Builders',         slug: 'web-builders',  color: '#F97316', icon: 'Globe'       },
];

// ─── Resources (10 per category) ─────────────────────────────────────────────

const RESOURCE_DATA = [
  // ── AI Tools ──────────────────────────────────────────────────────────────
  { name: 'Galileo AI',      url: 'https://www.usegalileo.ai',         description: 'Generate editable UI designs from text descriptions',                  pricing: Pricing.PAID,     categorySlug: 'ai-tools',     logoLetter: 'G', logoColor: '#FF6B6B' },
  { name: 'Musho AI',        url: 'https://musho.ai',                  description: 'Turn prompts into production-ready websites instantly',                 pricing: Pricing.FREEMIUM, categorySlug: 'ai-tools',     logoLetter: 'M', logoColor: '#FF6B6B' },
  { name: 'Relume',          url: 'https://library.relume.io',         description: 'AI-powered sitemap and wireframe builder for designers',                pricing: Pricing.PAID,     categorySlug: 'ai-tools',     logoLetter: 'R', logoColor: '#FF6B6B' },
  { name: 'Uizard',          url: 'https://uizard.io',                 description: 'Design mobile apps, web apps, and UIs in minutes with AI',              pricing: Pricing.FREEMIUM, categorySlug: 'ai-tools',     logoLetter: 'U', logoColor: '#FF6B6B' },
  { name: 'Khroma',          url: 'https://www.khroma.co',             description: 'AI color tool that learns which colors you love',                       pricing: Pricing.FREE,     categorySlug: 'ai-tools',     logoLetter: 'K', logoColor: '#FF6B6B' },
  { name: 'Visily',          url: 'https://www.visily.ai',             description: 'AI-powered wireframing tool that converts screenshots to designs',      pricing: Pricing.FREEMIUM, categorySlug: 'ai-tools',     logoLetter: 'V', logoColor: '#FF6B6B' },
  { name: 'Magician',        url: 'https://magician.design',           description: 'Magical design tool for Figma powered by AI',                          pricing: Pricing.FREEMIUM, categorySlug: 'ai-tools',     logoLetter: 'M', logoColor: '#FF6B6B' },
  { name: 'Adobe Firefly',   url: 'https://firefly.adobe.com',         description: 'Adobe\'s family of creative generative AI models',                     pricing: Pricing.FREEMIUM, categorySlug: 'ai-tools',     logoLetter: 'A', logoColor: '#FF6B6B' },
  { name: 'Runway',          url: 'https://runwayml.com',              description: 'AI-powered video and image generation for creatives',                   pricing: Pricing.FREEMIUM, categorySlug: 'ai-tools',     logoLetter: 'R', logoColor: '#FF6B6B' },
  { name: 'Autodraw',        url: 'https://www.autodraw.com',          description: 'Google\'s AI drawing tool that guesses what you\'re trying to draw',   pricing: Pricing.FREE,     categorySlug: 'ai-tools',     logoLetter: 'A', logoColor: '#FF6B6B' },

  // ── Design Tools ──────────────────────────────────────────────────────────
  { name: 'Figma',           url: 'https://figma.com',                 description: 'Collaborative interface design tool used by top product teams',         pricing: Pricing.FREEMIUM, categorySlug: 'design-tools', logoLetter: 'F', logoColor: '#6C63FF' },
  { name: 'Penpot',          url: 'https://penpot.app',                description: 'Open-source design and prototyping tool for teams',                    pricing: Pricing.FREE,     categorySlug: 'design-tools', logoLetter: 'P', logoColor: '#6C63FF' },
  { name: 'Lunacy',          url: 'https://icons8.com/lunacy',         description: 'Free graphic design software with built-in assets',                    pricing: Pricing.FREE,     categorySlug: 'design-tools', logoLetter: 'L', logoColor: '#6C63FF' },
  { name: 'Whimsical',       url: 'https://whimsical.com',             description: 'Flowcharts, wireframes, and mind maps in one tool',                    pricing: Pricing.FREEMIUM, categorySlug: 'design-tools', logoLetter: 'W', logoColor: '#6C63FF' },
  { name: 'Sketch',          url: 'https://www.sketch.com',            description: 'Professional vector design tool for Mac',                              pricing: Pricing.PAID,     categorySlug: 'design-tools', logoLetter: 'S', logoColor: '#6C63FF' },
  { name: 'Canva',           url: 'https://www.canva.com',             description: 'Accessible design platform for presentations, social media, and print', pricing: Pricing.FREEMIUM, categorySlug: 'design-tools', logoLetter: 'C', logoColor: '#6C63FF' },
  { name: 'Affinity Designer',url:'https://affinity.serif.com/designer','description': 'Professional vector and raster design software at a one-time price', pricing: Pricing.PAID,     categorySlug: 'design-tools', logoLetter: 'A', logoColor: '#6C63FF' },
  { name: 'Zeplin',          url: 'https://zeplin.io',                 description: 'Design handoff and collaboration platform for teams',                   pricing: Pricing.FREEMIUM, categorySlug: 'design-tools', logoLetter: 'Z', logoColor: '#6C63FF' },
  { name: 'Overflow',        url: 'https://overflow.io',               description: 'User flow diagramming tool that syncs with Figma and Sketch',          pricing: Pricing.FREEMIUM, categorySlug: 'design-tools', logoLetter: 'O', logoColor: '#6C63FF' },
  { name: 'Avocode',         url: 'https://avocode.com',               description: 'Open designs and export assets across all design tools',               pricing: Pricing.PAID,     categorySlug: 'design-tools', logoLetter: 'A', logoColor: '#6C63FF' },

  // ── Icons ─────────────────────────────────────────────────────────────────
  { name: 'Lucide',          url: 'https://lucide.dev',                description: 'Beautiful open-source icon library with 1,500+ icons',                pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'L', logoColor: '#6C63FF' },
  { name: 'Phosphor Icons',  url: 'https://phosphoricons.com',         description: 'Flexible icon family for interfaces and presentations',                pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'P', logoColor: '#6C63FF' },
  { name: 'Heroicons',       url: 'https://heroicons.com',             description: 'Beautiful hand-crafted SVG icons by the Tailwind CSS team',            pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'H', logoColor: '#6C63FF' },
  { name: 'Tabler Icons',    url: 'https://tabler.io/icons',           description: 'Over 5,400 free MIT-licensed high-quality SVG icons',                 pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'T', logoColor: '#6C63FF' },
  { name: 'Feather Icons',   url: 'https://feathericons.com',          description: 'Simply beautiful open source icons with clean strokes',               pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'F', logoColor: '#6C63FF' },
  { name: 'Remix Icon',      url: 'https://remixicon.com',             description: 'Open-source neutral-style system symbols for designers and developers',pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'R', logoColor: '#6C63FF' },
  { name: 'Bootstrap Icons', url: 'https://icons.getbootstrap.com',    description: 'Official open-source SVG icon library from the Bootstrap team',       pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'B', logoColor: '#6C63FF' },
  { name: 'Material Icons',  url: 'https://fonts.google.com/icons',    description: 'Official Material Design icons from Google',                          pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'M', logoColor: '#6C63FF' },
  { name: 'Ionicons',        url: 'https://ionic.io/ionicons',         description: 'Premium icons for web, iOS, Android, and desktop apps',               pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'I', logoColor: '#6C63FF' },
  { name: 'Font Awesome',    url: 'https://fontawesome.com',           description: 'The world\'s most popular icon set with 2,000+ free icons',           pricing: Pricing.FREEMIUM, categorySlug: 'icons',        logoLetter: 'F', logoColor: '#6C63FF' },

  // ── Fonts & Typography ────────────────────────────────────────────────────
  { name: 'Google Fonts',    url: 'https://fonts.google.com',          description: 'Free, open-source fonts optimized for the web',                       pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'G', logoColor: '#E94560' },
  { name: 'Fontshare',       url: 'https://www.fontshare.com',         description: 'Free fonts service from the Indian Type Foundry',                     pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'F', logoColor: '#E94560' },
  { name: 'Fontsource',      url: 'https://fontsource.org',            description: 'Self-host open source fonts in neatly bundled NPM packages',          pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'F', logoColor: '#E94560' },
  { name: 'Typ.io',          url: 'https://typ.io',                    description: 'Fonts used by other designers, updated daily',                        pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'T', logoColor: '#E94560' },
  { name: 'Inter',           url: 'https://rsms.me/inter',             description: 'Variable font family designed for computer screens',                  pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'I', logoColor: '#E94560' },
  { name: 'Adobe Fonts',     url: 'https://fonts.adobe.com',           description: 'Thousands of fonts included with any Creative Cloud subscription',    pricing: Pricing.PAID,     categorySlug: 'fonts',        logoLetter: 'A', logoColor: '#E94560' },
  { name: 'Bunny Fonts',     url: 'https://fonts.bunny.net',           description: 'Privacy-friendly drop-in replacement for Google Fonts',               pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'B', logoColor: '#E94560' },
  { name: 'Variable Fonts',  url: 'https://v-fonts.com',               description: 'A simple resource for finding and trying variable fonts',             pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'V', logoColor: '#E94560' },
  { name: 'Fonts In Use',    url: 'https://fontsinuse.com',            description: 'A searchable archive of typographic design in use',                   pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'F', logoColor: '#E94560' },
  { name: 'What The Font',   url: 'https://www.myfonts.com/pages/whatthefont', description: 'Identify fonts from any image using AI recognition',          pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'W', logoColor: '#E94560' },

  // ── UI Kits ───────────────────────────────────────────────────────────────
  { name: 'Shadcn UI',       url: 'https://ui.shadcn.com',             description: 'Re-usable components built with Radix UI and Tailwind CSS',           pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'S', logoColor: '#00D2FF' },
  { name: 'Radix UI',        url: 'https://www.radix-ui.com',          description: 'Unstyled, accessible components for React applications',              pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'R', logoColor: '#00D2FF' },
  { name: 'Float UI',        url: 'https://floatui.com',               description: 'Beautiful UI components and templates for Tailwind CSS',             pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'F', logoColor: '#00D2FF' },
  { name: 'Aceternity UI',   url: 'https://ui.aceternity.com',         description: 'Copy paste the most trending components and use them in apps',        pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'A', logoColor: '#00D2FF' },
  { name: 'Untitled UI',     url: 'https://www.untitledui.com',        description: 'The largest Figma UI kit and design system',                         pricing: Pricing.PAID,     categorySlug: 'ui-kits',      logoLetter: 'U', logoColor: '#00D2FF' },
  { name: 'DaisyUI',         url: 'https://daisyui.com',               description: 'The most popular Tailwind CSS component library',                    pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'D', logoColor: '#00D2FF' },
  { name: 'HyperUI',         url: 'https://www.hyperui.dev',           description: 'Free open source Tailwind CSS components for marketing and ecommerce',pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'H', logoColor: '#00D2FF' },
  { name: 'Headless UI',     url: 'https://headlessui.com',            description: 'Completely unstyled, fully accessible UI components for React',       pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'H', logoColor: '#00D2FF' },
  { name: 'Flowbite',        url: 'https://flowbite.com',              description: 'Open-source UI components built with Tailwind CSS',                  pricing: Pricing.FREEMIUM, categorySlug: 'ui-kits',      logoLetter: 'F', logoColor: '#00D2FF' },
  { name: 'Origin UI',       url: 'https://originui.com',              description: 'Beautiful UI components built with Tailwind CSS and React',           pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'O', logoColor: '#00D2FF' },

  // ── Prototyping & Motion ──────────────────────────────────────────────────
  { name: 'Framer',          url: 'https://www.framer.com',            description: 'Ship sites with built-in layout animations and CMS',                  pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'F', logoColor: '#00B894' },
  { name: 'ProtoPie',        url: 'https://www.protopie.io',           description: 'High-fidelity prototyping without code',                             pricing: Pricing.PAID,     categorySlug: 'prototyping',  logoLetter: 'P', logoColor: '#00B894' },
  { name: 'Rive',            url: 'https://rive.app',                  description: 'Create interactive animations for apps and websites',                 pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'R', logoColor: '#00B894' },
  { name: 'LottieFiles',     url: 'https://lottiefiles.com',           description: 'Lightweight animations for web and mobile apps',                     pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'L', logoColor: '#00B894' },
  { name: 'Spline',          url: 'https://spline.design',             description: '3D design tool for creating interactive web experiences',             pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'S', logoColor: '#00B894' },
  { name: 'Principle',       url: 'https://principleformac.com',       description: 'Animate your designs and create interactive prototypes on Mac',       pricing: Pricing.PAID,     categorySlug: 'prototyping',  logoLetter: 'P', logoColor: '#00B894' },
  { name: 'Marvel',          url: 'https://marvelapp.com',             description: 'Design, prototype, and collaborate all in one place',                pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'M', logoColor: '#00B894' },
  { name: 'InVision',        url: 'https://www.invisionapp.com',       description: 'Digital product design platform for prototyping and collaboration',   pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'I', logoColor: '#00B894' },
  { name: 'Origami Studio',  url: 'https://origami.design',            description: 'Design tool for creating advanced prototypes by Meta',               pricing: Pricing.FREE,     categorySlug: 'prototyping',  logoLetter: 'O', logoColor: '#00B894' },
  { name: 'Haiku Animator',  url: 'https://www.haikuanimator.com',     description: 'Animation tool that exports to code for web and native apps',        pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'H', logoColor: '#00B894' },

  // ── Color Tools ───────────────────────────────────────────────────────────
  { name: 'Coolors',         url: 'https://coolors.co',                description: 'Super fast color palette generator for designers',                   pricing: Pricing.FREEMIUM, categorySlug: 'color-tools',  logoLetter: 'C', logoColor: '#FFA502' },
  { name: 'Realtime Colors', url: 'https://www.realtimecolors.com',    description: 'Visualize your color palette on a real website',                    pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'R', logoColor: '#FFA502' },
  { name: 'Huemint',         url: 'https://huemint.com',               description: 'AI color palette generator for brand, website, and graphic',        pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'H', logoColor: '#FFA502' },
  { name: 'ColorHunt',       url: 'https://colorhunt.co',              description: 'Free and open platform for color inspiration',                       pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'C', logoColor: '#FFA502' },
  { name: 'Palettte',        url: 'https://palettte.app',              description: 'Build, analyze and edit smooth color palettes',                     pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'P', logoColor: '#FFA502' },
  { name: 'Adobe Color',     url: 'https://color.adobe.com',           description: 'Create color palettes from images or the color wheel',              pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'A', logoColor: '#FFA502' },
  { name: 'Colormind',       url: 'http://colormind.io',               description: 'AI color scheme generator trained on movies and art',               pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'C', logoColor: '#FFA502' },
  { name: 'ColorSpace',      url: 'https://mycolor.space',             description: 'Generate beautiful color palettes from a single seed color',        pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'C', logoColor: '#FFA502' },
  { name: 'Pigment',         url: 'https://pigment.shapefactory.co',   description: 'Unique and beautiful color palettes based on lighting and pigment',  pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'P', logoColor: '#FFA502' },
  { name: 'Accessible Colors',url:'https://accessible-colors.com',     description: 'Evaluate color combinations against WCAG accessibility guidelines', pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'A', logoColor: '#FFA502' },

  // ── Learning ──────────────────────────────────────────────────────────────
  { name: 'Refactoring UI',  url: 'https://www.refactoringui.com',     description: 'Learn UI design with practical tips from Tailwind creators',         pricing: Pricing.PAID,     categorySlug: 'learning',     logoLetter: 'R', logoColor: '#FDCB6E' },
  { name: 'Laws of UX',      url: 'https://lawsofux.com',              description: 'Collection of best practices for UX designers',                     pricing: Pricing.FREE,     categorySlug: 'learning',     logoLetter: 'L', logoColor: '#FDCB6E' },
  { name: 'Shift Nudge',     url: 'https://shiftnudge.com',            description: 'The systematic approach to learning interface design',               pricing: Pricing.PAID,     categorySlug: 'learning',     logoLetter: 'S', logoColor: '#FDCB6E' },
  { name: 'Design Course',   url: 'https://designcourse.com',          description: 'Free design tutorials covering UI, UX, and web design',             pricing: Pricing.FREE,     categorySlug: 'learning',     logoLetter: 'D', logoColor: '#FDCB6E' },
  { name: 'Scrimba',         url: 'https://scrimba.com',               description: 'Interactive coding and design courses with live scrims',             pricing: Pricing.FREEMIUM, categorySlug: 'learning',     logoLetter: 'S', logoColor: '#FDCB6E' },
  { name: 'IxDF Courses',    url: 'https://www.interaction-design.org',description: 'UX and design courses taught by industry experts',                  pricing: Pricing.FREEMIUM, categorySlug: 'learning',     logoLetter: 'I', logoColor: '#FDCB6E' },
  { name: 'DesignBetter',    url: 'https://www.designbetter.co',       description: 'Books and podcasts on design leadership and product thinking',      pricing: Pricing.FREE,     categorySlug: 'learning',     logoLetter: 'D', logoColor: '#FDCB6E' },
  { name: 'UX Collective',   url: 'https://uxdesign.cc',               description: 'Curated stories on user experience and product design',             pricing: Pricing.FREE,     categorySlug: 'learning',     logoLetter: 'U', logoColor: '#FDCB6E' },
  { name: 'Coursera Design', url: 'https://www.coursera.org/browse/arts-and-humanities/music-and-art', description: 'University-level UX and design courses from top institutions', pricing: Pricing.FREEMIUM, categorySlug: 'learning', logoLetter: 'C', logoColor: '#FDCB6E' },
  { name: 'Frontend Masters',url: 'https://frontendmasters.com',       description: 'Expert-led courses on design engineering and frontend development',  pricing: Pricing.PAID,     categorySlug: 'learning',     logoLetter: 'F', logoColor: '#FDCB6E' },

  // ── Inspiration ───────────────────────────────────────────────────────────
  { name: 'Dribbble',        url: 'https://dribbble.com',              description: "Discover the world's top designers and creative work",               pricing: Pricing.FREEMIUM, categorySlug: 'inspiration',  logoLetter: 'D', logoColor: '#A29BFE' },
  { name: 'Mobbin',          url: 'https://mobbin.com',                description: 'Mobile and web design reference library with 300k+ screens',        pricing: Pricing.FREEMIUM, categorySlug: 'inspiration',  logoLetter: 'M', logoColor: '#A29BFE' },
  { name: 'Godly',           url: 'https://godly.website',             description: 'Astronomically good web design inspiration',                        pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'G', logoColor: '#A29BFE' },
  { name: 'Lookup Design',   url: 'https://lookup.design',             description: 'Browse design examples by component or pattern',                    pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'L', logoColor: '#A29BFE' },
  { name: 'Behance',         url: 'https://www.behance.net',           description: 'Showcase and discover creative work from top designers',             pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'B', logoColor: '#A29BFE' },
  { name: 'Awwwards',        url: 'https://www.awwwards.com',          description: 'Website awards recognizing the best web design in the world',        pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'A', logoColor: '#A29BFE' },
  { name: 'SiteInspire',     url: 'https://www.siteinspire.com',       description: 'A curated showcase of the finest web and interactive design',        pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'S', logoColor: '#A29BFE' },
  { name: 'Lapa Ninja',      url: 'https://www.lapa.ninja',            description: 'Landing page design inspiration from real products',                 pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'L', logoColor: '#A29BFE' },
  { name: 'Pageflows',       url: 'https://pageflows.com',             description: 'User flow videos and screenshots from popular apps',                 pricing: Pricing.FREEMIUM, categorySlug: 'inspiration',  logoLetter: 'P', logoColor: '#A29BFE' },
  { name: 'Muzli',           url: 'https://muz.li',                    description: 'Design inspiration browser extension with curated daily picks',     pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'M', logoColor: '#A29BFE' },

  // ── Stock Photos ──────────────────────────────────────────────────────────
  { name: 'Unsplash',        url: 'https://unsplash.com',              description: 'Beautiful free images and photos for any project',                   pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'U', logoColor: '#10B981' },
  { name: 'Pexels',          url: 'https://www.pexels.com',            description: 'Free stock photos and videos shared by talented creators',           pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'P', logoColor: '#10B981' },
  { name: 'Reshot',          url: 'https://www.reshot.com',            description: 'Free icons, illustrations and photos for commercial use',            pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'R', logoColor: '#10B981' },
  { name: 'StockSnap',       url: 'https://stocksnap.io',              description: 'Hundreds of high resolution images added weekly',                    pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'S', logoColor: '#10B981' },
  { name: 'Picsum',          url: 'https://picsum.photos',             description: 'Lorem Ipsum for photos — beautiful placeholder images',              pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'P', logoColor: '#10B981' },
  { name: 'Pixabay',         url: 'https://pixabay.com',               description: 'Over 4 million free stock images, videos, and music',               pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'P', logoColor: '#10B981' },
  { name: 'Burst',           url: 'https://burst.shopify.com',         description: 'Free stock photos for entrepreneurs by Shopify',                    pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'B', logoColor: '#10B981' },
  { name: 'ISO Republic',    url: 'https://isorepublic.com',           description: 'Free high-resolution photos and videos for creative projects',       pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'I', logoColor: '#10B981' },
  { name: 'Life of Pix',     url: 'https://www.lifeofpix.com',         description: 'Free high-resolution photography shared by professional artists',   pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'L', logoColor: '#10B981' },
  { name: 'Gratisography',   url: 'https://gratisography.com',         description: 'Quirky, creative free stock photos updated weekly',                 pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'G', logoColor: '#10B981' },

  // ── Productivity ──────────────────────────────────────────────────────────
  { name: 'Notion',          url: 'https://notion.so',                 description: 'All-in-one workspace for notes, docs, and project management',       pricing: Pricing.FREEMIUM, categorySlug: 'productivity', logoLetter: 'N', logoColor: '#3B82F6' },
  { name: 'Linear',          url: 'https://linear.app',                description: 'Streamlined issue tracking for modern software teams',               pricing: Pricing.FREEMIUM, categorySlug: 'productivity', logoLetter: 'L', logoColor: '#3B82F6' },
  { name: 'Raycast',         url: 'https://www.raycast.com',           description: 'Blazingly fast launcher for Mac that boosts productivity',           pricing: Pricing.FREEMIUM, categorySlug: 'productivity', logoLetter: 'R', logoColor: '#3B82F6' },
  { name: 'Cron',            url: 'https://cron.com',                  description: 'The next-generation calendar for professionals and teams',            pricing: Pricing.FREE,     categorySlug: 'productivity', logoLetter: 'C', logoColor: '#3B82F6' },
  { name: 'Readwise',        url: 'https://readwise.io',               description: 'Resurface your highlights and retain more of what you read',         pricing: Pricing.PAID,     categorySlug: 'productivity', logoLetter: 'R', logoColor: '#3B82F6' },
  { name: 'Obsidian',        url: 'https://obsidian.md',               description: 'A powerful knowledge base and note-taking app using markdown',       pricing: Pricing.FREEMIUM, categorySlug: 'productivity', logoLetter: 'O', logoColor: '#3B82F6' },
  { name: 'Craft',           url: 'https://www.craft.do',              description: 'Beautiful documents and notes that feel native on Apple devices',    pricing: Pricing.FREEMIUM, categorySlug: 'productivity', logoLetter: 'C', logoColor: '#3B82F6' },
  { name: 'Arc Browser',     url: 'https://arc.net',                   description: 'The browser for power users that reimagines how you use the web',    pricing: Pricing.FREE,     categorySlug: 'productivity', logoLetter: 'A', logoColor: '#3B82F6' },
  { name: 'Superhuman',      url: 'https://superhuman.com',            description: 'The fastest email experience ever made',                             pricing: Pricing.PAID,     categorySlug: 'productivity', logoLetter: 'S', logoColor: '#3B82F6' },
  { name: 'Capacities',      url: 'https://capacities.io',             description: 'Your second brain — a studio for curious minds',                    pricing: Pricing.FREEMIUM, categorySlug: 'productivity', logoLetter: 'C', logoColor: '#3B82F6' },

  // ── Web Builders ──────────────────────────────────────────────────────────
  { name: 'Webflow',         url: 'https://webflow.com',               description: 'Build professional websites without writing code',                   pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'W', logoColor: '#F97316' },
  { name: 'Framer Sites',    url: 'https://www.framer.com/sites',      description: 'The fastest way to design and publish a website',                   pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'F', logoColor: '#F97316' },
  { name: 'Carrd',           url: 'https://carrd.co',                  description: 'Simple, free, fully responsive one-page sites for anything',        pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'C', logoColor: '#F97316' },
  { name: 'Squarespace',     url: 'https://www.squarespace.com',       description: 'All-in-one platform to build a beautiful online presence',          pricing: Pricing.PAID,     categorySlug: 'web-builders', logoLetter: 'S', logoColor: '#F97316' },
  { name: 'Editor X',        url: 'https://www.editorx.com',           description: 'Advanced web creation platform for designers and agencies',         pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'E', logoColor: '#F97316' },
  { name: 'Wix',             url: 'https://www.wix.com',               description: 'AI-powered website builder for any business or project',            pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'W', logoColor: '#F97316' },
  { name: 'Ghost',           url: 'https://ghost.org',                 description: 'Open-source publishing platform for newsletters and memberships',   pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'G', logoColor: '#F97316' },
  { name: 'Bubble',          url: 'https://bubble.io',                 description: 'No-code platform for building web apps without writing code',       pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'B', logoColor: '#F97316' },
  { name: 'Super.so',        url: 'https://super.so',                  description: 'Turn your Notion pages into fast, customizable websites',           pricing: Pricing.PAID,     categorySlug: 'web-builders', logoLetter: 'S', logoColor: '#F97316' },
  { name: 'Typedream',       url: 'https://typedream.com',             description: 'No-code website builder with beautiful templates for startups',     pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'T', logoColor: '#F97316' },
];

/**
 * Upserts all category and resource records.
 * 10 resources per category — 120 total.
 */
export async function seedResources(prisma: PrismaClient): Promise<void> {
  // ── Categories ────────────────────────────────────────────────
  const categoryMap: Record<string, string> = {};
  for (const cat of CATEGORY_DATA) {
    const result = await prisma.category.upsert({
      where:  { slug: cat.slug },
      create: cat,
      update: { color: cat.color, icon: cat.icon },
    });
    categoryMap[cat.slug] = result.id;
  }
  console.log(`✓ Categories — upserted ${CATEGORY_DATA.length}`);

  // ── Resources ─────────────────────────────────────────────────
  let count = 0;
  for (const resource of RESOURCE_DATA) {
    const categoryId = categoryMap[resource.categorySlug];
    if (!categoryId) {
      console.warn(`  No category for slug: ${resource.categorySlug}`);
      continue;
    }
    await prisma.resource.upsert({
      where:  { url: resource.url },
      create: { name: resource.name, url: resource.url, description: resource.description, pricing: resource.pricing, logoLetter: resource.logoLetter, logoColor: resource.logoColor, categoryId },
      update: { name: resource.name, description: resource.description, pricing: resource.pricing, logoLetter: resource.logoLetter, logoColor: resource.logoColor },
    });
    count++;
  }
  console.log(`✓ Resources — upserted ${count} (${count / CATEGORY_DATA.length} per category)`);
}

// ── Standalone runner ─────────────────────────────────────────────────────────
if (require.main === module) {
  seedResources(prisma)
    .catch((err) => { console.error(err); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
