export const projects = [
  {
    id: 'sparkyai',
    title: 'SparkyAI',
    tagline: 'Educational writing assistant that gamifies the process of writing.',
    description:
      'Full-stack React application with Firebase backend integrating OpenAI API. Features user authentication, real-time chat interface, conversation memory system, and comprehensive progress tracking across 13 gamified achievements. Led a cross-disciplinary team to first-place victory, defeating 30+ competing projects.',
    tech: ['React', 'Firebase', 'OpenAI API', 'Netlify'],
    award: { place: '1st Place', prize: '$2,500', event: "ASN+PIA Hackathon '25" },
    links: {
      live: 'https://sparkifyai.netlify.app',
      github: 'https://github.com/hkumar30/SparkyAi',
    },
    featured: true,
  },
  {
    id: 'supertutor',
    title: 'SuperTutor',
    tagline: 'Interactive AI learning platform for LaTeX through office-hour style guidance.',
    description:
      'An interactive web app for learning and practicing LaTeX through office-hour style guidance, instant AI feedback, accessibility tools (text-to-speech, customizable UI), and community-built courses. Features a real-time exercise engine with smart validation and a course creator for community contributions.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'SQLite', 'React'],
    award: { place: '2nd Place', prize: '$240', event: "HackSoDA '24" },
    links: {
      devpost: 'https://devpost.com/software/supertutor',
      github: 'https://github.com/hkumar30/SuperTutor',
    },
    featured: true,
  },
  {
    id: 'splayer',
    title: 'Splayer',
    tagline: 'Interactive web app for learning and practicing Splay Trees.',
    description:
      'Visualizes tree rotations in real time and challenges users to match a reference tree across multiple levels. Includes a complete Splay Tree implementation (insert, search, delete, splay operations), Cytoscape.js visualization, and a live leaderboard powered by Firestore.',
    tech: ['HTML5', 'JavaScript', 'Firebase', 'Cytoscape.js'],
    award: null,
    links: {
      live: 'https://splayer-game.netlify.app',
      github: 'https://github.com/hkumar30/Splayer',
    },
    featured: true,
  },
  {
    id: 'yakuza',
    title: 'Yakuza',
    tagline: 'A 2D fighting game inspired by Mortal Kombat for two players.',
    description:
      'A two-player 2D fighting game built with vanilla JavaScript and HTML5 Canvas. Features sprite-based character animations, health bar systems, collision detection, and attack combos. Inspired by the Mortal Kombat franchise.',
    tech: ['JavaScript', 'HTML5 Canvas'],
    award: null,
    links: {
      live: 'https://yakuza-game.netlify.app',
      github: 'https://github.com/hkumar30/Yakuza',
    },
    featured: true,
  },
];
