export interface Skill {
  name: string;
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  tech: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
}

export const skills: Skill[] = [
  { name: 'React', icon: 'fab fa-react' },
  { name: 'TypeScript', icon: 'fas fa-i-cursor' },
  { name: 'HTML5', icon: 'fab fa-html5' },
  { name: 'CSS3', icon: 'fab fa-css3-alt' },
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'Java', icon: 'fab fa-java' },
  { name: 'Flask', icon: 'fas fa-flask' },
  { name: 'FastAPI', icon: 'fas fa-bolt' },
  { name: 'Django', icon: 'fas fa-diagram-project' },
  { name: 'Gemini', icon: 'fab fa-google' },
  { name: 'xAI', icon: 'fas fa-rocket' },
  { name: 'OpenAI', icon: 'fas fa-brain' },
  { name: 'Claude', icon: 'fas fa-feather-pointed' },
  { name: 'OpenClaw', icon: 'fas fa-shrimp' },
  { name: 'Firestore', icon: 'fas fa-fire' },
  { name: 'DynamoDB', icon: 'fas fa-database' },
  { name: 'PostgreSQL', icon: 'fas fa-database' },
  { name: 'Redis', icon: 'R' },
  { name: 'CI/CD', icon: 'fas fa-code-branch' },
  { name: 'QA/Testing', icon: 'fas fa-vial' },
  { name: 'Security', icon: 'fas fa-shield-alt' },
  { name: 'Git', icon: 'fas fa-code-branch' },
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
    title: 'Valley Forge Automotive',
    tech: 'React, Firebase, Firestore',
    imageUrl: 'images/mechanicapiicon.png',
    liveUrl: 'https://valleyforgeautomotive.org',
    githubUrl: 'https://github.com/AColyer13/Mechanic-API---Copy-with-Testing-and-Documentation',
  },
  {
    id: 2,
    title: 'MissionCtrl',
    tech: 'React, Firebase, Firestore, Gemini AI',
    imageUrl: 'images/dashconnecticon.png',
    liveUrl: 'https://missionctrl.org',
    githubUrl: 'https://github.com/AColyer13',
  },
  {
    id: 3,
    title: 'Immaculate Draft',
    tech: 'HTML, CSS, JavaScript',
    imageUrl: 'images/triviaapicion.png',
    liveUrl: 'https://acolyer13.github.io/immaculate-draft/',
    githubUrl: 'https://github.com/AColyer13/immaculate-draft',
  },
  {
    id: 4,
    title: 'Vikes Quiz App',
    tech: 'JavaScript',
    imageUrl: 'images/vikingsquizicon.png',
    liveUrl: 'https://acolyer13.github.io/vikes-quiz-app/',
    githubUrl: 'https://github.com/AColyer13/vikes-quiz-app',
  },
  {
    id: 5,
    title: 'Event Center Website',
    tech: 'HTML, CSS, JS',
    imageUrl: 'images/Eventcentericon.png',
    liveUrl: 'https://acolyer13.github.io/Event-Center-Example-Website/',
    githubUrl: 'https://github.com/AColyer13/Event-Center-Example-Website',
  },
  {
    id: 6,
    title: 'Swimming Website',
    tech: 'HTML, CSS, JS',
    imageUrl: 'images/Swimmingsiteicon.png',
    liveUrl: 'https://acolyer13.github.io/Swim-Teaching-Website/',
    githubUrl: 'https://github.com/AColyer13/Swim-Teaching-Website',
  },
];
