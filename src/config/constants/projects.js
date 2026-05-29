import { carrent, jobit, portfolio_website, react_projects_website, tripguide } from "@assets";

export const projects = [
  {
    name: "Buddies - A Rental Platform",
    description:
      "Student-focused rental platform concept for discovering Flats, PGs, and Hostels with property verification, direct owner interaction, and map-assisted discovery.",
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
    image: tripguide,
    source_code_link: "",
    deployed_url: "",
    source_label: "Repository not published",
    demo_label: "Demo not published",
  },
  {
    name: "Green Your Bills",
    description:
      "Professional healthcare billing and operations platform work focused on patient workflows, insurance claims, billing flows, reporting, and performance-focused UI modernization.",
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
    image: jobit,
    source_code_link: "",
    deployed_url: "",
    source_label: "Private client repository",
    demo_label: "Private production system",
  },
  {
    name: "EZ Order",
    description:
      "React Native retail-management app work covering subscription screens, renewal calculations, Razorpay payment integration, expiry states, and production bug fixes.",
    tags: [
      {
        name: "react-native",
        color: "blue-text-gradient",
      },
      {
        name: "razorpay",
        color: "green-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "",
    deployed_url: "",
    source_label: "Private company repository",
    demo_label: "Private mobile app",
  },
  {
    name: "3D Portfolio Website",
    description:
      "Interactive portfolio built with React, Three.js, Framer Motion, Tailwind CSS, reusable UI components, validation, tests, and a production Vite build pipeline.",
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
    deployed_url: "",
    demo_label: "Deployment pending",
  },
  {
    name: "Other Projects",
    description:
      "Collection of smaller React and Node.js projects including Quizzie, a to-do app, real-time space news, game-deals tracking, and a URL shortener.",
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
    deployed_url: "",
    demo_label: "Repository contains project details",
  },
];
