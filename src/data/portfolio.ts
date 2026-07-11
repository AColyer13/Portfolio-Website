export interface Skill {
  name: string;
}

export interface SkillBlock {
  title: string;
  skills: Skill[];
}

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  tech: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  liveUrl?: string;
  githubUrl: string;
  featured?: boolean;
}

/** Curated skills — three groups, four items each. */
export const skillBlocks: SkillBlock[] = [
  {
    title: 'Build',
    skills: [
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'Python' },
    ],
  },
  {
    title: 'Data & cloud',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'Firebase' },
      { name: 'AWS' },
      { name: 'Docker' },
    ],
  },
  {
    title: 'Quality',
    skills: [
      { name: 'Vitest' },
      { name: 'Playwright' },
      { name: 'CI/CD' },
      { name: 'Gemini API' },
    ],
  },
];

export const timeline: TimelineItem[] = [
  {
    year: 'Present',
    title: 'AI Search Quality Evaluator',
    company: 'Activus Connect – Remote',
    description: 'Evaluating user queries to identify severity and factuality issues in AI outputs, delivering feedback that improves model performance for Google Gemini.',
  },
  {
    year: '2022',
    title: 'Account Executive',
    company: 'Citizen Observer – St. Paul, MN',
    description: 'Led adoption of the tip411 platform across six municipalities through 100+ live product demonstrations, including travel to Dallas, TX and San Diego, CA.',
  },
  {
    year: '2021',
    title: 'Sales Development Representative',
    company: 'Digital River – Minnetonka, MN',
    description: 'Secured a $500,000+ deal with gaming client Rec Room through targeted outreach and executive meetings.',
  },
  {
    year: '2020',
    title: 'Account Executive',
    company: 'INRY – Eden Prairie, MN',
    description: 'Managed $400,000+ pipeline through full sales cycle; built relationships with HR and IT stakeholders to position ServiceNow solutions strategically.',
  },
  {
    year: '2019',
    title: 'Business Development Representative',
    company: 'Epicor Software – St. Louis Park, MN',
    description: 'Qualified $3.7M in opportunities and added $1.1M to pipeline for ERP solutions in manufacturing. Received Excellence Award for consistent performance.',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'MissionCtrl',
    tech: 'React, Firebase, Firestore, Gemini AI',
    imageUrl: 'images/missionctrl-tr41-groundctrl.png',
    imageWidth: 1024,
    imageHeight: 526,
    liveUrl: 'https://missionctrl.org',
    githubUrl: 'https://github.com/growthwithcoding/TR41-GroundCTRL',
    featured: true,
  },
  {
    id: 2,
    title: 'Valley Forge Automotive',
    tech: 'React, Firebase, Firestore',
    imageUrl: 'images/mechanicapiicon.png',
    imageWidth: 1024,
    imageHeight: 519,
    liveUrl: 'https://valleyforgeautomotive.org',
    githubUrl: 'https://github.com/AColyer13/Mechanic-API---Copy-with-Testing-and-Documentation',
    featured: true,
  },
  {
    id: 3,
    title: 'Legal Eagle Project',
    tech: 'Next.js, Prisma, AI SDK, Tailwind',
    imageUrl: 'images/legaleagleproject.png',
    imageWidth: 1280,
    imageHeight: 640,
    liveUrl: 'https://legaleagleproject-mu.vercel.app',
    githubUrl: 'https://github.com/AColyer13/legaleagleproject',
    featured: true,
  },
  {
    id: 4,
    title: 'Writing Consultant',
    tech: 'Python',
    imageUrl: 'images/writing-consultant.png',
    imageWidth: 1280,
    imageHeight: 640,
    githubUrl: 'https://github.com/AColyer13/writing_consultant',
  },
  {
    id: 5,
    title: 'Event Center Website',
    tech: 'HTML, CSS, JS',
    imageUrl: 'images/Eventcentericon.png',
    imageWidth: 1280,
    imageHeight: 640,
    liveUrl: 'https://acolyer13.github.io/Event-Center-Example-Website/',
    githubUrl: 'https://github.com/AColyer13/Event-Center-Example-Website',
  },
  {
    id: 6,
    title: 'Dream Vacation App',
    tech: 'React, Vite, Hono, LangChain, Mapbox',
    imageUrl: 'images/dream-vacation-app.png',
    imageWidth: 1280,
    imageHeight: 640,
    githubUrl: 'https://github.com/AColyer13/DreamVacationApp',
  },
  {
    id: 7,
    title: 'Swimming Website',
    tech: 'HTML, CSS, JS',
    imageUrl: 'images/Swimmingsiteicon.png',
    imageWidth: 2552,
    imageHeight: 1278,
    liveUrl: 'https://acolyer13.github.io/Swim-Teaching-Website/',
    githubUrl: 'https://github.com/AColyer13/Swim-Teaching-Website',
  },
  {
    id: 8,
    title: 'Stardust',
    tech: 'Next.js, FastAPI, PWA',
    imageUrl: 'images/stardust.png',
    imageWidth: 1280,
    imageHeight: 640,
    liveUrl: 'https://acolyer13.github.io/Stardust/',
    githubUrl: 'https://github.com/AColyer13/Stardust',
  },
  {
    id: 9,
    title: 'The Office',
    tech: 'Node.js, Express, Three.js',
    imageUrl: 'images/the-office.png',
    imageWidth: 1280,
    imageHeight: 640,
    githubUrl: 'https://github.com/AColyer13/the-office',
  },
  {
    id: 10,
    title: 'Immaculate Draft',
    tech: 'HTML, CSS, JavaScript',
    imageUrl: 'images/immaculate-grid-copy.png',
    imageWidth: 1024,
    imageHeight: 519,
    liveUrl: 'https://acolyer13.github.io/Immaculate-Grid-Copy/',
    githubUrl: 'https://github.com/AColyer13/Immaculate-Grid-Copy',
  },
  {
    id: 11,
    title: 'UFO Abductor',
    tech: 'Three.js, WebGL, Supabase',
    imageUrl: 'images/ufo-abductor.png',
    imageWidth: 1280,
    imageHeight: 640,
    liveUrl: 'https://acolyer13.github.io/moovellous/',
    githubUrl: 'https://github.com/AColyer13/moovellous',
  },
  {
    id: 12,
    title: 'Minnesota Snowmobile',
    tech: 'HTML, Canvas, JavaScript',
    imageUrl: 'images/minnesota-snowmobile.png',
    imageWidth: 1280,
    imageHeight: 640,
    liveUrl: 'https://acolyer13.github.io/minnesota-snowmobile/',
    githubUrl: 'https://github.com/AColyer13/minnesota-snowmobile',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
