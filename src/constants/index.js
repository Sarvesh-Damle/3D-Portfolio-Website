import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  // typescript,
  html,
  css,
  reactjs,
  // redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  // starbucks,
  // tesla,
  // shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  // food_delivery_website,
  portfolio_website,
  react_projects_website,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "works",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Associate Software Engineer",
    icon: creator,
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
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Associate Software Engineer",
    company_name: "CodeArray Technologies Pvt Ltd",
    icon: meta, // Placeholder
    iconBg: "#E6DEDD",
    date: "Sept 2024 - Present",
    points: [
      "EZOrder (React Native Mobile App): Developed subscription module pages with dynamic fee calculations, renewal adjustments, Razorpay integration, and subscription expiry messages. Resolved multiple bugs to enhance user experience.",
      "GYB (Green Your Bills) Web App Development: Redesigned a vital bill search page, focusing on UI improvement and performance optimization. Modernized legacy code. Concurrent API calls for efficient processing.",
    ],
  },
];

const testimonials = [];

const projects = [
  {
    name: "Buddies - A Rental Platform",
    description:
      "A Rental Platform for finding and renting Flats/PGs/Hostels. Especially designed for students and working professionals. Allows property listing verification and direct owner interaction. Features Maps API integration.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide, // Placeholder
    source_code_link: "https://github.com/Sarvesh-Damle",
    deployed_url: "https://github.com/Sarvesh-Damle", // Placeholder
  },
  {
    name: "Green Your Bills",
    description:
      "Hospital Management System combined with Bill Generation features. The platform primarily serves healthcare providers in handling patient management, insurance claims, billing, and reporting.",
    tags: [
      {
        name: "asp.net",
        color: "blue-text-gradient",
      },
      {
        name: "sql-server",
        color: "green-text-gradient",
      },
      {
        name: "azure",
        color: "pink-text-gradient",
      },
    ],
    image: jobit, // Placeholder
    source_code_link: "https://github.com/Sarvesh-Damle",
    deployed_url: "https://github.com/Sarvesh-Damle",
  },
  {
    name: "EZ Order",
    description:
      "Retail Management Multi-faceted App for Both Android and IOS. Implemented subscription modules and payment gateway integrations.",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
    ],
    image: carrent, // Placeholder
    source_code_link: "https://github.com/Sarvesh-Damle",
    deployed_url: "https://github.com/Sarvesh-Damle",
  },
  {
    name: "3D Portfolio Website",
    description:
      "Developed and Deployed an immersive 3D portfolio website utilizing React, featuring an intricately designed 3D model and captivating animations. Showcased creative projects and achievements in a visually stunning and interactive manner.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "three.js",
        color: "green-text-gradient",
      },
      {
        name: "tailwind-css",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio_website,
    source_code_link: "https://github.com/Sarvesh-Damle/3D-Portfolio-Website.git",
    deployed_url: "https://github.com/Sarvesh-Damle",
  },
  {
    name: "Other Projects",
    description:
      "Includes Quizzie (Trivia Quiz App), To-do App, Real-Time Space News, Real-Time Video Game Prices and Deals, URL Shortener. Built with React, Node.js, and other modern technologies.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
    ],
    image: react_projects_website,
    source_code_link: "https://github.com/Sarvesh-Damle/5-React-Projects.git",
    deployed_url: "https://github.com/Sarvesh-Damle",
  },
];

export { services, technologies, experiences, testimonials, projects };
