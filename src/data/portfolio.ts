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
    title: 'Software Developer & Sr. Technical Instructor',
    company: 'Hashmap Labs/App Academy',
    description: 'Company has shifted away from Ruby on Rails and more toward Python/Flask at this point. Consistently ranked as a top performer. Continued to teach, build internal tooling, and develop curriculum. Played critical role in implementing MERN stack curriculum. Used JSForce to automate many work flows, including notetaking with students, allowing instructors to take on double their original caseloads',
  },
  {
    year: '2018',
    title: 'Software Developer & Technical Instructor',
    company: 'Hashmap Labs/App Academy',
    description: 'After attending App Academy as a student. I received an offer to teach at a competitor in the Bay Area. Instead I took that offer and leveraged it for a role with a/A. Working here is where my skills really started to accelerate. Created tests, lectures, apps, and instructional videos designed to teach students the ins and outs of Javascript, PostgreSQL, React, Redux, and Ruby on Rails',
  },
  {
    year: '2017',
    title: 'Freelance Developer',
    company: 'Taylor Agency',
    description: 'Still getting my feet wet with the industry. Did some contracting work this year building websites for one of my old bosses. I also attended a bootcamp to learn the ins and outs of pro development. Mostly working in JS, HTML, & CSS.',
  },
  {
    year: '2014',
    title: 'CSR/Bookkeeper',
    company: 'S&G Global Holdings',
    description: 'The beginning of my career and my first foray into programming. In this role I automated over 100 hours of data entry work per week using Python.',
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Event Center Website v2',
    tech: 'HTML, CSS, JS',
    imageUrl: '/images/Eventcentericon.png',
    liveUrl: 'https://acolyer13.github.io/Event-Center-Website-v2/index.html',
    githubUrl: 'https://github.com/acolyer13/Event-Center-Website-v2',
  },
  {
    id: 2,
    title: 'Swimming Techniques v2',
    tech: 'HTML, CSS, JS',
    imageUrl: '/images/Swimmingsiteicon.png',
    liveUrl: 'https://acolyer13.github.io/Swimming-Techniques-V2/index.html',
    githubUrl: 'https://github.com/acolyer13/Swimming-Techniques-V2',
  },
  {
    id: 3,
    title: 'Vikes Quiz App',
    tech: 'JavaScript',
    imageUrl: '/images/vikingsquizicon.png',
    liveUrl: 'https://acolyer13.github.io/vikes-quiz-app/',
    githubUrl: 'https://github.com/acolyer13/vikes-quiz-app',
  },
  {
    id: 4,
    title: 'Trivia API React App',
    tech: 'React',
    imageUrl: '/images/triviaapicion.png',
    liveUrl: 'https://acolyer13.github.io/triviaapi-react-app/',
    githubUrl: 'https://github.com/acolyer13/triviaapi-react-app',
  },
  {
    id: 5,
    title: 'DashConnect Build Fetch #4',
    tech: 'JavaScript, Fetch API',
    imageUrl: '/images/dashconnecticon.png',
    liveUrl: 'https://acolyer13.github.io/DashConnect-Build-Fetch/',
    githubUrl: 'https://github.com/acolyer13/DashConnect-Build-Fetch',
  },
  {
    id: 6,
    title: 'Mechanic Website',
    tech: 'HTML, CSS, JS',
    imageUrl: '/images/mechanicapiicon.png',
    liveUrl: 'https://acolyer13.github.io/Mechanic-Website/',
    githubUrl: 'https://github.com/AColyer13/Mechanic-API---Copy-with-Testing-and-Documentation',
  },
];
