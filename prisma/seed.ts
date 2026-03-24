import { fetchAndParseFeeds } from '@/lib/rss';
import { prisma } from '@/lib/prisma';
import { Pricing, EventType, EventStatus } from '../generated/prisma';

async function seedDatabase() {
  try {
    // ─── Articles ───────────────────────────────────────────────
    const articles = await fetchAndParseFeeds();
    console.log(`Fetched ${articles.length} articles`);

    let articleCount = 0;
    for (const article of articles) {
      await prisma.article.upsert({
        where: { url: article.articleUrl },
        create: {
          title: article.title,
          excerpt: article.excerpt ?? null,
          url: article.articleUrl,
          publishedAt: article.publishedAt,
        },
        update: {
          title: article.title,
          excerpt: article.excerpt ?? null,
          publishedAt: article.publishedAt,
        },
      });
      articleCount++;
    }
    console.log(`Upserted ${articleCount} articles`);

    // ─── Categories ─────────────────────────────────────────────
    const categoryData = [
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

    const categoryMap: Record<string, string> = {};
    for (const cat of categoryData) {
      const result = await prisma.category.upsert({
        where: { slug: cat.slug },
        create: cat,
        update: { color: cat.color, icon: cat.icon },
      });
      categoryMap[cat.slug] = result.id;
    }
    console.log(`Upserted ${categoryData.length} categories`);

    // ─── Resources ──────────────────────────────────────────────
    const resources = [
      { name: 'Galileo AI',    url: 'https://www.usegalileo.ai',      description: 'Generate editable UI designs from text descriptions',         pricing: Pricing.PAID,     categorySlug: 'ai-tools',     logoLetter: 'G', logoColor: '#FF6B6B' },
      { name: 'Musho AI',      url: 'https://musho.ai',               description: 'Turn prompts into production-ready websites instantly',        pricing: Pricing.FREEMIUM, categorySlug: 'ai-tools',     logoLetter: 'M', logoColor: '#FF6B6B' },
      { name: 'Relume',        url: 'https://library.relume.io',      description: 'AI-powered sitemap and wireframe builder for designers',        pricing: Pricing.PAID,     categorySlug: 'ai-tools',     logoLetter: 'R', logoColor: '#FF6B6B' },
      { name: 'Uizard',        url: 'https://uizard.io',              description: 'Design mobile apps, web apps, and UIs in minutes with AI',     pricing: Pricing.FREEMIUM, categorySlug: 'ai-tools',     logoLetter: 'U', logoColor: '#FF6B6B' },
      { name: 'Khroma',        url: 'https://www.khroma.co',          description: 'AI color tool that learns which colors you love',              pricing: Pricing.FREE,     categorySlug: 'ai-tools',     logoLetter: 'K', logoColor: '#FF6B6B' },
      { name: 'Figma',         url: 'https://figma.com',              description: 'Collaborative interface design tool used by top product teams', pricing: Pricing.FREEMIUM, categorySlug: 'design-tools', logoLetter: 'F', logoColor: '#6C63FF' },
      { name: 'Penpot',        url: 'https://penpot.app',             description: 'Open-source design and prototyping tool for teams',             pricing: Pricing.FREE,     categorySlug: 'design-tools', logoLetter: 'P', logoColor: '#6C63FF' },
      { name: 'Lunacy',        url: 'https://icons8.com/lunacy',      description: 'Free graphic design software with built-in assets',            pricing: Pricing.FREE,     categorySlug: 'design-tools', logoLetter: 'L', logoColor: '#6C63FF' },
      { name: 'Whimsical',     url: 'https://whimsical.com',          description: 'Flowcharts, wireframes, and mind maps in one tool',            pricing: Pricing.FREEMIUM, categorySlug: 'design-tools', logoLetter: 'W', logoColor: '#6C63FF' },
      { name: 'Sketch',        url: 'https://www.sketch.com',         description: 'Professional vector design tool for Mac',                      pricing: Pricing.PAID,     categorySlug: 'design-tools', logoLetter: 'S', logoColor: '#6C63FF' },
      { name: 'Lucide',        url: 'https://lucide.dev',             description: 'Beautiful open-source icon library with 1,500+ icons',         pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'L', logoColor: '#6C63FF' },
      { name: 'Phosphor Icons',url: 'https://phosphoricons.com',      description: 'Flexible icon family for interfaces and presentations',         pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'P', logoColor: '#6C63FF' },
      { name: 'Heroicons',     url: 'https://heroicons.com',          description: 'Beautiful hand-crafted SVG icons by the Tailwind CSS team',     pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'H', logoColor: '#6C63FF' },
      { name: 'Tabler Icons',  url: 'https://tabler.io/icons',        description: 'Over 5,400 free MIT-licensed high-quality SVG icons',          pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'T', logoColor: '#6C63FF' },
      { name: 'Feather Icons', url: 'https://feathericons.com',       description: 'Simply beautiful open source icons with clean strokes',        pricing: Pricing.FREE,     categorySlug: 'icons',        logoLetter: 'F', logoColor: '#6C63FF' },
      { name: 'Google Fonts',  url: 'https://fonts.google.com',       description: 'Free, open-source fonts optimized for the web',                pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'G', logoColor: '#E94560' },
      { name: 'Fontshare',     url: 'https://www.fontshare.com',      description: 'Free fonts service from the Indian Type Foundry',              pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'F', logoColor: '#E94560' },
      { name: 'Fontsource',    url: 'https://fontsource.org',         description: 'Self-host open source fonts in neatly bundled NPM packages',   pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'F', logoColor: '#E94560' },
      { name: 'Typ.io',        url: 'https://typ.io',                 description: 'Fonts used by other designers, updated daily',                 pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'T', logoColor: '#E94560' },
      { name: 'Inter',         url: 'https://rsms.me/inter',          description: 'Variable font family designed for computer screens',           pricing: Pricing.FREE,     categorySlug: 'fonts',        logoLetter: 'I', logoColor: '#E94560' },
      { name: 'Shadcn UI',     url: 'https://ui.shadcn.com',          description: 'Re-usable components built with Radix UI and Tailwind CSS',    pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'S', logoColor: '#00D2FF' },
      { name: 'Radix UI',      url: 'https://www.radix-ui.com',       description: 'Unstyled, accessible components for React applications',       pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'R', logoColor: '#00D2FF' },
      { name: 'Float UI',      url: 'https://floatui.com',            description: 'Beautiful UI components and templates for Tailwind CSS',       pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'F', logoColor: '#00D2FF' },
      { name: 'Aceternity UI', url: 'https://ui.aceternity.com',      description: 'Copy paste the most trending components and use them in apps', pricing: Pricing.FREE,     categorySlug: 'ui-kits',      logoLetter: 'A', logoColor: '#00D2FF' },
      { name: 'Untitled UI',   url: 'https://www.untitledui.com',     description: 'The largest Figma UI kit and design system',                  pricing: Pricing.PAID,     categorySlug: 'ui-kits',      logoLetter: 'U', logoColor: '#00D2FF' },
      { name: 'Framer',        url: 'https://www.framer.com',         description: 'Ship sites with built-in layout animations and CMS',           pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'F', logoColor: '#00B894' },
      { name: 'ProtoPie',      url: 'https://www.protopie.io',        description: 'High-fidelity prototyping without code',                      pricing: Pricing.PAID,     categorySlug: 'prototyping',  logoLetter: 'P', logoColor: '#00B894' },
      { name: 'Rive',          url: 'https://rive.app',               description: 'Create interactive animations for apps and websites',          pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'R', logoColor: '#00B894' },
      { name: 'LottieFiles',   url: 'https://lottiefiles.com',        description: 'Lightweight animations for web and mobile apps',              pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'L', logoColor: '#00B894' },
      { name: 'Spline',        url: 'https://spline.design',          description: '3D design tool for creating interactive web experiences',      pricing: Pricing.FREEMIUM, categorySlug: 'prototyping',  logoLetter: 'S', logoColor: '#00B894' },
      { name: 'Coolors',       url: 'https://coolors.co',             description: 'Super fast color palette generator for designers',            pricing: Pricing.FREEMIUM, categorySlug: 'color-tools',  logoLetter: 'C', logoColor: '#FFA502' },
      { name: 'Realtime Colors',url: 'https://www.realtimecolors.com',description: 'Visualize your color palette on a real website',              pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'R', logoColor: '#FFA502' },
      { name: 'Huemint',       url: 'https://huemint.com',            description: 'AI color palette generator for brand, website, and graphic',  pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'H', logoColor: '#FFA502' },
      { name: 'ColorHunt',     url: 'https://colorhunt.co',           description: 'Free and open platform for color inspiration',                pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'C', logoColor: '#FFA502' },
      { name: 'Palettte',      url: 'https://palettte.app',           description: 'Build, analyze and edit smooth color palettes',              pricing: Pricing.FREE,     categorySlug: 'color-tools',  logoLetter: 'P', logoColor: '#FFA502' },
      { name: 'Refactoring UI',url: 'https://www.refactoringui.com',  description: 'Learn UI design with practical tips from Tailwind creators',  pricing: Pricing.PAID,     categorySlug: 'learning',     logoLetter: 'R', logoColor: '#FDCB6E' },
      { name: 'Laws of UX',    url: 'https://lawsofux.com',           description: 'Collection of best practices for UX designers',              pricing: Pricing.FREE,     categorySlug: 'learning',     logoLetter: 'L', logoColor: '#FDCB6E' },
      { name: 'Shift Nudge',   url: 'https://shiftnudge.com',         description: 'The systematic approach to learning interface design',        pricing: Pricing.PAID,     categorySlug: 'learning',     logoLetter: 'S', logoColor: '#FDCB6E' },
      { name: 'Design Course', url: 'https://designcourse.com',       description: 'Free design tutorials covering UI, UX, and web design',       pricing: Pricing.FREE,     categorySlug: 'learning',     logoLetter: 'D', logoColor: '#FDCB6E' },
      { name: 'Scrimba',       url: 'https://scrimba.com',            description: 'Interactive coding and design courses with live scrims',       pricing: Pricing.FREEMIUM, categorySlug: 'learning',     logoLetter: 'S', logoColor: '#FDCB6E' },
      { name: 'Dribbble',      url: 'https://dribbble.com',           description: "Discover the world's top designers and creative work",        pricing: Pricing.FREEMIUM, categorySlug: 'inspiration',  logoLetter: 'D', logoColor: '#A29BFE' },
      { name: 'Mobbin',        url: 'https://mobbin.com',             description: 'Mobile and web design reference library with 300k+ screens',  pricing: Pricing.FREEMIUM, categorySlug: 'inspiration',  logoLetter: 'M', logoColor: '#A29BFE' },
      { name: 'Godly',         url: 'https://godly.website',          description: 'Astronomically good web design inspiration',                  pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'G', logoColor: '#A29BFE' },
      { name: 'Lookup Design', url: 'https://lookup.design',          description: 'Browse design examples by component or pattern',              pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'L', logoColor: '#A29BFE' },
      { name: 'Behance',       url: 'https://www.behance.net',        description: 'Showcase and discover creative work from top designers',       pricing: Pricing.FREE,     categorySlug: 'inspiration',  logoLetter: 'B', logoColor: '#A29BFE' },
      { name: 'Unsplash',      url: 'https://unsplash.com',           description: 'Beautiful free images and photos for any project',            pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'U', logoColor: '#10B981' },
      { name: 'Pexels',        url: 'https://www.pexels.com',         description: 'Free stock photos and videos shared by talented creators',    pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'P', logoColor: '#10B981' },
      { name: 'Reshot',        url: 'https://www.reshot.com',         description: 'Free icons, illustrations and photos for commercial use',     pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'R', logoColor: '#10B981' },
      { name: 'StockSnap',     url: 'https://stocksnap.io',           description: 'Hundreds of high resolution images added weekly',             pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'S', logoColor: '#10B981' },
      { name: 'Picsum',        url: 'https://picsum.photos',          description: 'Lorem Ipsum for photos — beautiful placeholder images',       pricing: Pricing.FREE,     categorySlug: 'stock-photos', logoLetter: 'P', logoColor: '#10B981' },
      { name: 'Notion',        url: 'https://notion.so',              description: 'All-in-one workspace for notes, docs, and project management', pricing: Pricing.FREEMIUM, categorySlug: 'productivity', logoLetter: 'N', logoColor: '#3B82F6' },
      { name: 'Linear',        url: 'https://linear.app',             description: 'Streamlined issue tracking for modern software teams',         pricing: Pricing.FREEMIUM, categorySlug: 'productivity', logoLetter: 'L', logoColor: '#3B82F6' },
      { name: 'Raycast',       url: 'https://www.raycast.com',        description: 'Blazingly fast launcher for Mac that boosts productivity',     pricing: Pricing.FREEMIUM, categorySlug: 'productivity', logoLetter: 'R', logoColor: '#3B82F6' },
      { name: 'Cron',          url: 'https://cron.com',               description: 'The next-generation calendar for professionals and teams',      pricing: Pricing.FREE,     categorySlug: 'productivity', logoLetter: 'C', logoColor: '#3B82F6' },
      { name: 'Readwise',      url: 'https://readwise.io',            description: 'Resurface your highlights and retain more of what you read',   pricing: Pricing.PAID,     categorySlug: 'productivity', logoLetter: 'R', logoColor: '#3B82F6' },
      { name: 'Webflow',       url: 'https://webflow.com',            description: 'Build professional websites without writing code',             pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'W', logoColor: '#F97316' },
      { name: 'Framer Sites',  url: 'https://www.framer.com/sites',   description: 'The fastest way to design and publish a website',             pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'F', logoColor: '#F97316' },
      { name: 'Carrd',         url: 'https://carrd.co',               description: 'Simple, free, fully responsive one-page sites for anything',  pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'C', logoColor: '#F97316' },
      { name: 'Squarespace',   url: 'https://www.squarespace.com',    description: 'All-in-one platform to build a beautiful online presence',    pricing: Pricing.PAID,     categorySlug: 'web-builders', logoLetter: 'S', logoColor: '#F97316' },
      { name: 'Editor X',      url: 'https://www.editorx.com',        description: 'Advanced web creation platform for designers and agencies',    pricing: Pricing.FREEMIUM, categorySlug: 'web-builders', logoLetter: 'E', logoColor: '#F97316' },
    ];

    let resourceCount = 0;
    for (const resource of resources) {
      const categoryId = categoryMap[resource.categorySlug];
      if (!categoryId) {
        console.warn(`No category found for slug: ${resource.categorySlug}`);
        continue;
      }
      await prisma.resource.upsert({
        where:  { url: resource.url },
        create: { name: resource.name, url: resource.url, description: resource.description, pricing: resource.pricing, logoLetter: resource.logoLetter, logoColor: resource.logoColor, categoryId },
        update: { name: resource.name, description: resource.description, pricing: resource.pricing, logoLetter: resource.logoLetter, logoColor: resource.logoColor },
      });
      resourceCount++;
    }
    console.log(`Upserted ${resourceCount} resources`);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedEvents() {
  try {
    const events = [
      {
        title:       'Design Systems Summit 2026',
        description: 'A full-day conference exploring the future of design systems, component libraries, and cross-team collaboration at scale. Featuring speakers from Figma, Shopify, and Atlassian.',
        type:        EventType.CONFERENCE,
        status:      EventStatus.UPCOMING,
        date:        '2026-03-28',
        time:        '9:00 AM EST',
        duration:    '8 hours',
        image:       'https://picsum.photos/800/400?random=1',
        isFree:      false,
        price:       '$149',
        attendees:   842,
        maxAttendees:1200,
        tags:        ['Design Systems', 'Components', 'Figma', 'Tokens'],
        url:         'https://designsystemssummit.com',
        hostName:    'Nathan Curtis',
        hostRole:    'Design Systems Consultant',
        hostAvatar:  'https://picsum.photos/100/100?random=101',
      },
      {
        title:       'Figma Advanced Workshop',
        description: 'Deep dive into Figma\'s advanced features — Auto Layout, Variables, Component Properties, and Dev Mode. Hands-on exercises throughout.',
        type:        EventType.WORKSHOP,
        status:      EventStatus.UPCOMING,
        date:        '2026-04-02',
        time:        '1:00 PM EST',
        duration:    '3 hours',
        image:       'https://picsum.photos/800/400?random=2',
        isFree:      false,
        price:       '$49',
        attendees:   156,
        maxAttendees:200,
        tags:        ['Figma', 'Auto Layout', 'Variables', 'Workshop'],
        url:         'https://figma.com/events',
        hostName:    'Figma Team',
        hostRole:    'Official Figma Workshop',
        hostAvatar:  'https://picsum.photos/100/100?random=102',
      },
      {
        title:       'UX Research Methods Live',
        description: 'Live session covering modern UX research methods — from guerrilla testing to unmoderated studies. Q&A with the audience throughout.',
        type:        EventType.WEBINAR,
        status:      EventStatus.LIVE,
        date:        '2026-03-23',
        time:        '2:00 PM EST',
        duration:    '1.5 hours',
        image:       'https://picsum.photos/800/400?random=3',
        isFree:      true,
        price:       null,
        attendees:   1247,
        maxAttendees:null,
        tags:        ['UX Research', 'User Testing', 'Live'],
        url:         'https://nngroup.com/events',
        hostName:    'Nielsen Norman Group',
        hostRole:    'UX Research Leaders',
        hostAvatar:  'https://picsum.photos/100/100?random=103',
      },
      {
        title:       'AI x Design Hackathon',
        description: 'A 48-hour hackathon where designers and developers collaborate to build AI-powered design tools. $10,000 in prizes across three categories.',
        type:        EventType.HACKATHON,
        status:      EventStatus.UPCOMING,
        date:        '2026-04-15',
        time:        '10:00 AM EST',
        duration:    '48 hours',
        image:       'https://picsum.photos/800/400?random=4',
        isFree:      true,
        price:       null,
        attendees:   389,
        maxAttendees:500,
        tags:        ['AI', 'Hackathon', 'Design Tools', 'Prize'],
        url:         'https://hackathon.design',
        hostName:    'Design x AI Community',
        hostRole:    'Community Organizers',
        hostAvatar:  'https://picsum.photos/100/100?random=104',
      },
      {
        title:       'Awwwards Submission Deadline',
        description: 'Last day to submit your website or project for consideration in the Awwwards Site of the Year 2026. Winners announced in May.',
        type:        EventType.AWARD,
        status:      EventStatus.UPCOMING,
        date:        '2026-04-30',
        time:        '11:59 PM CET',
        duration:    'Deadline',
        image:       'https://picsum.photos/800/400?random=5',
        isFree:      false,
        price:       '$85',
        attendees:   2103,
        maxAttendees:null,
        tags:        ['Award', 'Web Design', 'Submission', 'Awwwards'],
        url:         'https://awwwards.com',
        hostName:    'Awwwards',
        hostRole:    'Web Design Awards',
        hostAvatar:  'https://picsum.photos/100/100?random=105',
      },
      {
        title:       'Design Tokens Deep Dive',
        description: 'A recorded session on implementing design tokens across web, iOS, and Android. Covers naming conventions, tooling, and real-world case studies.',
        type:        EventType.WEBINAR,
        status:      EventStatus.ARCHIVED,
        date:        '2026-03-10',
        time:        '3:00 PM EST',
        duration:    '1 hour',
        image:       'https://picsum.photos/800/400?random=6',
        isFree:      true,
        price:       null,
        attendees:   934,
        maxAttendees:null,
        tags:        ['Design Tokens', 'Tokens Studio', 'Multi-platform'],
        url:         'https://youtube.com',
        hostName:    'Tokens Studio',
        hostRole:    'Design Tokens Specialists',
        hostAvatar:  'https://picsum.photos/100/100?random=106',
      },
      {
        title:       'Interaction Design Foundation Meetup',
        description: 'Monthly local meetup for IxDF members and design enthusiasts. This month\'s topic: designing for accessibility in 2026.',
        type:        EventType.MEETUP,
        status:      EventStatus.UPCOMING,
        date:        '2026-04-08',
        time:        '6:30 PM EST',
        duration:    '2 hours',
        image:       'https://picsum.photos/800/400?random=7',
        isFree:      true,
        price:       null,
        attendees:   87,
        maxAttendees:120,
        tags:        ['Meetup', 'Accessibility', 'IxDF', 'Community'],
        url:         'https://interaction-design.org',
        hostName:    'IxDF Community',
        hostRole:    'Design Community',
        hostAvatar:  'https://picsum.photos/100/100?random=107',
      },
      {
        title:       'Motion Design Masterclass',
        description: 'Three-day intensive workshop on motion design for interfaces — from micro-interactions to full page transitions using Rive and Framer.',
        type:        EventType.WORKSHOP,
        status:      EventStatus.UPCOMING,
        date:        '2026-05-05',
        time:        '10:00 AM EST',
        duration:    '3 days',
        image:       'https://picsum.photos/800/400?random=8',
        isFree:      false,
        price:       '$299',
        attendees:   64,
        maxAttendees:80,
        tags:        ['Motion Design', 'Rive', 'Framer', 'Animation'],
        url:         'https://motiondesign.school',
        hostName:    'Motion Design School',
        hostRole:    'Motion Design Educators',
        hostAvatar:  'https://picsum.photos/100/100?random=108',
      },
      {
        title:       'CSS Day 2026',
        description: 'The premier conference for CSS and design engineering. Two days of deep technical talks on modern CSS, design tokens, and styling architecture.',
        type:        EventType.CONFERENCE,
        status:      EventStatus.UPCOMING,
        date:        '2026-05-14',
        time:        '9:00 AM CET',
        duration:    '2 days',
        image:       'https://picsum.photos/800/400?random=9',
        isFree:      false,
        price:       '$399',
        attendees:   521,
        maxAttendees:600,
        tags:        ['CSS', 'Design Engineering', 'Web', 'Conference'],
        url:         'https://cssday.nl',
        hostName:    'CSS Day',
        hostRole:    'Annual CSS Conference',
        hostAvatar:  'https://picsum.photos/100/100?random=109',
      },
      {
        title:       'Figma Config 2026',
        description: 'Figma\'s annual design conference featuring product announcements, hands-on workshops, and community talks from designers around the world.',
        type:        EventType.CONFERENCE,
        status:      EventStatus.UPCOMING,
        date:        '2026-06-03',
        time:        '9:00 AM PST',
        duration:    '2 days',
        image:       'https://picsum.photos/800/400?random=10',
        isFree:      false,
        price:       '$199',
        attendees:   3847,
        maxAttendees:5000,
        tags:        ['Figma', 'Config', 'Conference', 'Product Design'],
        url:         'https://config.figma.com',
        hostName:    'Figma',
        hostRole:    'Design Platform',
        hostAvatar:  'https://picsum.photos/100/100?random=110',
      },
      {
        title:       'UX Writing Summit',
        description: 'Virtual summit dedicated to UX writing, content design, and plain language. Hear from writers at Google, Duolingo, and Mailchimp.',
        type:        EventType.WEBINAR,
        status:      EventStatus.UPCOMING,
        date:        '2026-05-22',
        time:        '10:00 AM EST',
        duration:    '6 hours',
        image:       'https://picsum.photos/800/400?random=11',
        isFree:      false,
        price:       '$79',
        attendees:   418,
        maxAttendees:800,
        tags:        ['UX Writing', 'Content Design', 'Copy', 'Summit'],
        url:         'https://uxwritingsummit.com',
        hostName:    'UX Writing Hub',
        hostRole:    'UX Writing Community',
        hostAvatar:  'https://picsum.photos/100/100?random=111',
      },
      {
        title:       'Dribbble Design Awards 2026',
        description: 'Annual awards celebrating the best design work submitted to Dribbble. Categories include UI, Brand, Illustration, and Motion.',
        type:        EventType.AWARD,
        status:      EventStatus.UPCOMING,
        date:        '2026-06-20',
        time:        '12:00 PM EST',
        duration:    'Ceremony',
        image:       'https://picsum.photos/800/400?random=12',
        isFree:      true,
        price:       null,
        attendees:   9241,
        maxAttendees:null,
        tags:        ['Award', 'Dribbble', 'Design', 'Community'],
        url:         'https://dribbble.com/awards',
        hostName:    'Dribbble',
        hostRole:    'Design Community Platform',
        hostAvatar:  'https://picsum.photos/100/100?random=112',
      },
    ];

    let eventCount = 0;
    for (const event of events) {
      await prisma.event.upsert({
        where:  { title: event.title },
        create: event,
        update: {
          description: event.description,
          status:      event.status,
          attendees:   event.attendees,
        },
      });
      eventCount++;
    }
    console.log(`Upserted ${eventCount} events`);

  } catch (error) {
    console.error('Error seeding events:', error);
    throw error;
  }
}

seedDatabase()
  .then(() => seedEvents())
  .then(() => {
    console.log('All seeding complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });