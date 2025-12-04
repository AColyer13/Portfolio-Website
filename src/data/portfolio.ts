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
  { name: 'AWS Lambda', icon: 'λ' },
  { name: 'DynamoDB', icon: 'fas fa-database' },
  { name: 'Redis', icon: 'R' },
  { name: 'CloudWatch', icon: 'fas fa-terminal' },
  { name: 'Kafka', icon: 'fas fa-feather' },
  { name: 'CloudFormation', icon: 'fas fa-cloud-upload-alt' },
  { name: 'AWS API Gateway', icon: 'fab fa-aws' },
  { name: 'Serverless', icon: 'fas fa-server' },
  { name: 'React', icon: 'fab fa-react' },
  { name: 'Redux', icon: 'fas fa-atom' },
  { name: 'JavaScript', icon: 'fab fa-js' },
  { name: 'Node/Express', icon: 'fab fa-node-js' },
  { name: 'MongoDB', icon: 'fas fa-leaf' },
  { name: 'TypeScript', icon: 'fas fa-i-cursor' },
  { name: 'PostgreSQL', icon: 'fas fa-database' },
  { name: 'AWS IAM', icon: 'fab fa-aws' },
  { name: 'Python/Flask', icon: 'fa fa-flask' },
  { name: 'HTML5', icon: 'fab fa-html5' },
  { name: 'CSS3', icon: 'fab fa-css3-alt' },
  { name: 'Git', icon: 'fas fa-code-branch' },
];

export const timeline: TimelineItem[] = [
  {
    year: 'Present',
    title: 'AI Search Quality Evaluator',
    company: 'Activus Connect – Remote',
    description: 'Evaluating Search results to improve AI algorithms and enhance user experience.',
  },
  {
    year: '2022',
    title: 'Account Executive',
    company: 'Citizen Observer – St. Paul, MN',
    description: 'Closed adoption of tip411 across 6 municipalities via 100+ customized demos. 95% outbound.',
  },
  {
    year: '2021',
    title: 'Sales Development Representative',
    company: 'Digital River – Minnetonka, MN',
    description: 'Secured a $500K deal with a game called Rec Room through targeted outreach.',
  },
  {
    year: '2020',
    title: 'Account Executive',
    company: 'INRY – Eden Prairie, MN',
    description: 'Managed a pipeline of over $400K, managed RFPs for companies like Kohler & Heineken.',
  },
  {
    year: '2019',
    title: 'Business Development Representative',
    company: 'Epicor Software – St. Louis Park, MN',
    description: 'Qualified $3.7M in opportunities; added $1.1M to pipeline; earned Excellence Award.',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Event Center Website v2',
    tech: 'HTML, CSS, JS',
    imageUrl: 'images/Eventcentericon.png',
    liveUrl: 'https://acolyer13.github.io/Event-Center-Example-Website/',
    githubUrl: 'https://github.com/AColyer13/Event-Center-Example-Website',
  },
  {
    id: 2,
    title: 'Swimming Techniques v2',
    tech: 'HTML, CSS, JS',
    imageUrl: 'images/Swimmingsiteicon.png',
    liveUrl: 'https://acolyer13.github.io/Swimming-Techniques-V2/index.html',
    githubUrl: 'https://github.com/acolyer13/Swimming-Techniques-V2',
  },
  {
    id: 3,
    title: 'Vikes Quiz App',
    tech: 'JavaScript',
    imageUrl: 'images/vikingsquizicon.png',
    liveUrl: 'https://acolyer13.github.io/vikes-quiz-app/',
    githubUrl: 'https://github.com/acolyer13/vikes-quiz-app',
  },
  {
    id: 4,
    title: 'Trivia API React App',
    tech: 'React',
    imageUrl: 'images/triviaapicion.png',
    liveUrl: 'https://acolyer13.github.io/triviaapi-react-app/',
    githubUrl: 'https://github.com/acolyer13/triviaapi-react-app',
  },
  {
    id: 5,
    title: 'DashConnect Build Fetch #4',
    tech: 'JavaScript, Fetch API',
    imageUrl: 'images/dashconnecticon.png',
    liveUrl: 'https://acolyer13.github.io/DashConnect-Build-Fetch/',
    githubUrl: 'https://github.com/acolyer13/DashConnect-Build-Fetch',
  },
  {
    id: 6,
    title: 'Mechanic Website',
    tech: 'HTML, CSS, JS',
    imageUrl: 'images/mechanicapiicon.png',
    liveUrl: 'https://acolyer13.github.io/Mechanic-Website/',
    githubUrl: 'https://github.com/AColyer13/Mechanic-API---Copy-with-Testing-and-Documentation',
  },
];
