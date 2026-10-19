import {
  web,
  backend,
  creator,
  github,
  figma,
  git,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  threejs,
  voidMedia,
  voidCast,
  vCommerce,
  amazon,
  emberBite,
  emberPlate,
  smartAntenna,
  fadiPhoto,
  saeedPhoto,
  monzirPhoto,
  abdelmonemPhoto,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "journey",
    title: "Journey",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "team",
    title: "Members",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

/* Only categories that match a real project below. A project can sit in more
   than one (the restaurant pages are both Restaurant & Food and Landing Pages). */
export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "restaurant", label: "Restaurant & Food" },
  { id: "landing", label: "Landing Pages" },
  { id: "education", label: "Education" },
  { id: "social", label: "Social & Community" },
];

export const contactInfo = {
  email: "teamvoiddev@gmail.com",
  phones: ["+250 795 196 889", "+250 795 295 169"],
  github: "https://github.com/VoidDev-Organization",
  instagram: "https://www.instagram.com/voiddevelopers",
};

const services = [
  {
    title: "Clean Code",
    icon: git,
  },
  {
    title: "Modern Design",
    icon: figma,
  },
  {
    title: "Team Collaboration",
    icon: creator,
  },
  {
    title: "Full-Stack Delivery",
    icon: backend,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "Figma",
    icon: figma,
  },
  {
    name: "Web Design",
    icon: web,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Backend",
    icon: backend,
  },
];

const journey = [
  {
    title: "Software Engineering Studies",
    company_name: "University of Lay Adventists of Kigali",
    icon: javascript,
    iconBg: "#383E56",
    date: "2023 — 2027",
    points: [
      "Studying software engineering with a focus on data structures, algorithms and object-oriented programming.",
      "Building a strong foundation in database systems, operating concepts and web technologies.",
      "Working on individual and group projects that turn theory into working software.",
    ],
  },
  {
    title: "Frontend Engineering",
    company_name: "React & Tailwind CSS",
    icon: reactjs,
    iconBg: "#151030",
    date: "2023 — 2026",
    points: [
      "Building responsive, component-based interfaces with React, Tailwind CSS and modern CSS.",
      "Turning Figma designs into pixel-accurate, accessible layouts that work on every screen size.",
      "Adding motion and interaction with Framer Motion and WebGL to make products feel alive.",
    ],
  },
  {
    title: "Backend & Real-Time Systems",
    company_name: "Node.js, Django & Databases",
    icon: backend,
    iconBg: "#0B3D2E",
    date: "2023 — 2026",
    points: [
      "Designing REST APIs, authentication flows and database schemas with MongoDB and SQL databases.",
      "Implementing real-time features with WebSocket and server-side notifications.",
      "Keeping data models clean, versioned in Git, and deployed on cloud platforms.",
    ],
  },
  {
    title: "UI/UX & Product Design",
    company_name: "Figma & Framer",
    icon: figma,
    iconBg: "#4C1D95",
    date: "2023 — 2026",
    points: [
      "Researching users, wireframing flows and prototyping ideas before a line of code is written.",
      "Building design systems in Figma that developers can implement without guesswork.",
      "Shipping no-code and Framer sites for clients who need speed and polish together.",
    ],
  },
];

const members = [
  {
    name: "Fadi Mohammed-Sami",
    role: "Full-Stack Developer",
    profile: fadiPhoto,
    bio: "Software engineering student building maintainable full-stack applications. Strong foundations in object-oriented programming, data structures, algorithms and database systems.",
    focus: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    education:
      "Bachelor of Software Engineering | University of Lay Adventists of Kigali, Rwanda (Expected Graduation: 2027)",
    languages: ["JavaScript", "Python", "Java", "C", "HTML & CSS", "SQL"],
    frameworks: ["Node.js", "Express.js", "Flask", "Jasmine (JS)", "Cloudinary"],
    databases: ["MongoDB", "SQL"],
    skills: [
      "Full-Stack Web Development",
      "REST API Design",
      "Database Design",
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Version Control (Git & GitHub)",
      "WebSocket",
    ],
    projects: [
      { name: "Void-Media (Social Messaging Platform)", url: "https://void-media-lynj.onrender.com" },
      { name: "Void-Cast", url: "https://void-cast-one.vercel.app" },
      { name: "Amazon Clone", url: null },
      { name: "Credit card validator", url: null },
      { name: "Encryption & decryption program", url: null },
    ],
    email: "fadi.kaizen777@gmail.com",
    github: "https://github.com/Fadi-eclipse",
    linkedin: "",
    cv: "Fadi_Mohammed-Sami_CV.pdf",
  },
  {
    name: "Saeed Hassan",
    role: "Frontend Developer",
    profile: saeedPhoto,
    bio: "Frontend developer focused on modern web applications. Builds responsive interfaces and interactive web experiences with an eye for clean component architecture.",
    focus: ["React", "Tailwind CSS", "Responsive UI", "Django"],
    education:
      "Bachelor of Software Engineering | University of Lay Adventists of Kigali, Rwanda (Expected Graduation: 2027)",
    languages: ["HTML", "CSS", "JavaScript", "Python", "Java"],
    frameworks: ["React", "Tailwind CSS", "Django"],
    databases: [],
    skills: [
      "Responsive UI Design",
      "Component-Based Architecture",
      "Cross-Browser Compatibility",
      "Interactive Web Experiences",
      "UI/UX Design Principles",
      "Version Control (Git & GitHub)",
    ],
    projects: [
      {
        name: "Void Media \u2013 Social Messaging Platform",
        url: "https://void-media-lynj.onrender.com",
      },
    ],
    email: "Saeedahmd2003@gmail.com",
    github: "https://github.com/Saeedhassa",
    linkedin: "",
    cv: "",
  },
  {
    name: "Monzir Ahmed",
    role: "Backend Developer",
    profile: monzirPhoto,
    bio: "Backend developer passionate about real-time systems. Builds server architecture, REST APIs and notification systems that solve practical problems.",
    focus: ["Django", "WebSocket", "PostgreSQL", "Firebase"],
    education:
      "Bachelor of Software Engineering | University of Lay Adventists of Kigali, Rwanda (Expected Graduation: 2027)",
    languages: ["Python", "C", "Java", "JavaScript", "HTML & CSS", "SQL"],
    frameworks: ["Django", "Flask", "Firebase", "WebSocket"],
    databases: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "SQL Server"],
    skills: [
      "Backend Architecture",
      "Real-Time Systems (WebSocket)",
      "Database Design & Administration",
      "REST API Development",
      "Notifications Systems",
      "Mobile-Ready Web Apps",
      "Version Control (Git & GitHub)",
    ],
    projects: [
      {
        name: "Void Media \u2014 Social Media Platform",
        url: "https://void-media-lynj.onrender.com",
      },
      { name: "Mini Discord Clone", url: null },
      { name: "Snake Game & Ping Pong Game", url: null },
      { name: "Smart Selling Machine Simulation", url: null },
    ],
    email: "montherrt@gmail.com",
    github: "https://github.com/RedFox199",
    linkedin: "",
    cv: "",
  },
  {
    name: "Mohamed Abdelmonem Hassan",
    role: "UI/UX Designer & Framer Developer",
    profile: abdelmonemPhoto,
    bio: "UI/UX designer who turns abstract ideas into user-centric visual designs and converts them into high-performance interactive websites with Figma and Framer.",
    focus: ["Figma", "Framer", "Design Systems", "Prototyping"],
    education:
      "Bachelor of Software Engineering | University of Lay Adventists of Kigali, Rwanda (Expected Graduation: 2027)",
    languages: ["HTML", "CSS"],
    frameworks: ["Figma (Advanced)", "Framer", "Web Animations & Interactions"],
    databases: [],
    skills: [
      "UI Design",
      "UX Research",
      "Wireframing & Prototyping",
      "Design Systems & Typography",
      "No-Code Web Development",
      "Responsive & Mobile Design",
      "Visual Hierarchy",
      "End-to-End Project Management",
      "Attention to Detail",
      "Rapid Learning & Adaptability",
    ],
    projects: [
      { name: "High-Fidelity UI & Responsive Layouts (Freelance)", url: null },
      { name: "Animated Websites via Framer (Freelance)", url: null },
    ],
    email: "mhadamu2001@gmail.com",
    github: "",
    linkedin: "",
    cv: "",
  },
];

const projects = [
  {
    name: "Amazon Clone",
    description:
      "An e-commerce storefront clone recreating a full shopping flow \u2014 product browsing, search, cart state, quantity controls and checkout UI \u2014 as a frontend engineering exercise.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "green-text-gradient" },
      { name: "ui", color: "pink-text-gradient" },
    ],
    categories: ["ecommerce"],
    image: amazon,
    live_url: "https://js-shop-project.vercel.app/",
    source_code_link: contactInfo.github,
  },
  {
    name: "Ember & Bite",
    categories: ["restaurant", "landing"],
    description:
      "A burger kitchen landing page built around one idea: smash it hot and serve it fast. Arch-framed hero product shot, oversized display type and a featured-item card with an inline add-to-order button.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "css", color: "green-text-gradient" },
      { name: "ui", color: "pink-text-gradient" },
    ],
    image: emberBite,
    live_url: "https://emper-bite.vercel.app/",
    source_code_link: contactInfo.github,
  },
  {
    name: "Ember & Plate",
    categories: ["restaurant", "landing"],
    description:
      "A fine-dining restaurant page with a full-bleed photo hero, serif display headline and a paired call-to-action row. Layout and type scale tuned so the food photography stays the focus.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "css", color: "green-text-gradient" },
      { name: "responsive", color: "pink-text-gradient" },
    ],
    image: emberPlate,
    live_url: "https://ember-plate-nine.vercel.app/",
    source_code_link: contactInfo.github,
  },
  {
    name: "V-Commerce",
    categories: ["ecommerce"],
    description:
      "A full-stack e-commerce store built with Django and Bootstrap. Product catalogue with categories, search, cart, authentication, Cloudinary-hosted media and a light/dark theme that follows the visitor's system preference.",
    tags: [
      {
        name: "django",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },
    ],
    image: vCommerce,
    live_url: "https://v-commerce-c1fb.onrender.com",
    source_code_link: contactInfo.github,
  },
  {
    name: "Void Media",
    description:
      "A social messaging platform with real-time conversations, media sharing and notifications. Built with a Node.js and Express API, MongoDB data layer and WebSocket messaging.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "websocket",
        color: "pink-text-gradient",
      },
    ],
    categories: ["social"],
    image: voidMedia,
    live_url: "https://void-media-lynj.onrender.com",
    source_code_link: contactInfo.github,
  },
  {
    name: "Smart Antenna",
    description:
      "An online learning platform featuring expert-led courses across Computer Science, Medicine, Fine Arts, and more.",
    tags: [
      { name: "education", color: "blue-text-gradient" },
      { name: "e-learning", color: "green-text-gradient" },
      { name: "courses", color: "pink-text-gradient" },
    ],
    categories: ["education"],
    image: smartAntenna,
    live_url: "https://smart-antenna-educational-platform.vercel.app/",
    source_code_link: contactInfo.github,
  },
  {
    name: "Void Cast",
    description:
      "A polished web experience built as a creative front-end showcase, focused on smooth interaction, modern layout and a fast, dependency-light build.",
    tags: [
      {
        name: "javascript",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
      {
        name: "responsive",
        color: "pink-text-gradient",
      },
    ],
    categories: ["landing"],
    image: voidCast,
    live_url: "https://void-cast-one.vercel.app",
    source_code_link: contactInfo.github,
  },
];

export { services, technologies, journey, members, projects, github };
