import type { PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Raydel Ernesto Reuco García",
    title: "Desarrollador Web Full Stack",
    location: "Havana, Cuba",
    email: "raydel.reuco@gmail.com",
    phone: "+5355791136",
    linkedin:
      "https://www.linkedin.com/in/raydel-ernesto-reuco-garc%C3%ADa-contact-info",
    summary:
      "Computer Science student specializing in full-stack development with focus on scalable web applications and database optimization. Committed to delivering efficient, user-centered solutions through modern technologies and best practices.",
    avatar: "/images/avatar/raydel-avatar.jpg",
  },

  education: [
    {
      id: "education-1",
      degree: "Ingeniería",
      field: "Ingeniería informática",
      institution: "Universidad de las Ciencias Informáticas",
      startDate: "01/2023",
      endDate: "07/2026",
      description:
        "Currently pursuing a degree in Computer Engineering with focus on software development, database management, and modern programming practices.",
    },
  ],

  whatIBring: [
    {
      id: "value-1",
      title: "whatibring.value-1.title",
      description: "whatibring.value-1.description",
      icon: "rocket",
      algorithm: "algorithm.blue-green",
      tech: ["Docker", "GitHub Actions", "Vercel"],
    },
    {
      id: "value-2",
      title: "whatibring.value-2.title",
      description: "whatibring.value-2.description",
      icon: "zap",
      algorithm: "algorithm.critical-path",
      tech: ["Astro", "SSG", "CDN"],
    },
    {
      id: "value-3",
      title: "whatibring.value-3.title",
      description: "whatibring.value-3.description",
      icon: "database",
      algorithm: "algorithm.normalized-indexing",
      tech: ["PostgreSQL", "Supabase", "Redis"],
    },
    {
      id: "value-4",
      title: "whatibring.value-4.title",
      description: "whatibring.value-4.description",
      icon: "shield",
      algorithm: "algorithm.tdd",
      tech: ["TypeScript", "Jest", "Cypress"],
    },
  ],

  techStack: {
    languages: [
      {
        id: "lang-1",
        name: "TypeScript",
        description: "Type safety that prevents 3 AM debugging sessions",
        icon: "typescript",
        useCase: "Everything web-related",
        yearsOfExp: 2,
      },
      {
        id: "lang-2",
        name: "Python",
        description: "When you need to get stuff done, not write a novel",
        icon: "python",
        useCase: "Data processing & APIs",
        yearsOfExp: 3,
      },
      {
        id: "lang-3",
        name: "JavaScript",
        description:
          "The language that runs the internet (for better or worse)",
        icon: "javascript",
        useCase: "Client & server magic",
        yearsOfExp: 3,
      },
      {
        id: "lang-4",
        name: "SQL",
        description: "Making databases do exactly what they should",
        icon: "database",
        useCase: "Data architecture",
        yearsOfExp: 2,
      },
    ],
    frameworks: [
      {
        id: "fw-1",
        name: "Astro",
        description: "Static sites that feel dynamic",
        icon: "astro",
        performance: "Ships 0kb JS by default",
        bestFor: "Content-heavy sites",
      },
      {
        id: "fw-2",
        name: "React",
        description: "Component-based UI that scales",
        icon: "react",
        performance: "Virtual DOM optimization",
        bestFor: "Interactive applications",
      },
      {
        id: "fw-3",
        name: "Django",
        description: "Batteries included backend framework",
        icon: "django",
        performance: "ORM query optimization",
        bestFor: "Full-stack applications",
      },
    ],
    tools: [
      {
        id: "tool-1",
        name: "Supabase",
        description: "PostgreSQL with superpowers",
        icon: "supabase",
        whyCool: "Real-time subscriptions out of the box",
      },
      {
        id: "tool-2",
        name: "Docker",
        description: "It works on my machine → It works everywhere",
        icon: "docker",
        whyCool: "Consistent environments across all stages",
      },
      {
        id: "tool-3",
        name: "Git",
        description: "Time travel for code",
        icon: "git",
        whyCool: "Never lose code again (unless you force push)",
      },
    ],
    algorithms: [
      {
        id: "algo-1",
        name: "A* Pathfinding",
        description: "Intelligent pathfinding with heuristics",
        complexity: "O(b^d) where b is branching factor",
        realWorldUse: "Game AI, GPS navigation, robotics",
        implemented: true,
      },
      {
        id: "algo-2",
        name: "Quick Sort (Optimized)",
        description: "Fast divide-and-conquer sorting with median-of-3",
        complexity: "O(n log n) average, O(n²) worst",
        realWorldUse: "System libraries, high-performance sorting",
        implemented: true,
      },
      {
        id: "algo-3",
        name: "Hash Table with Chaining",
        description: "Dynamic hash table with collision resolution",
        complexity: "O(1) average insertion/lookup",
        realWorldUse: "Database indexing, caching systems",
        implemented: true,
      },
      {
        id: "algo-4",
        name: "Dynamic Programming (LCS)",
        description: "Longest Common Subsequence optimization",
        complexity: "O(m×n) time, O(m×n) space",
        realWorldUse: "DNA analysis, diff algorithms, version control",
        implemented: true,
      },
      {
        id: "algo-5",
        name: "Breadth-First Search",
        description: "Graph traversal for shortest unweighted paths",
        complexity: "O(V + E) time complexity",
        realWorldUse: "Social networks, web crawling, maze solving",
        implemented: true,
      },
      {
        id: "algo-6",
        name: "Binary Heap (Priority Queue)",
        description: "Efficient priority-based data structure",
        complexity: "O(log n) insert/extract",
        realWorldUse: "Task scheduling, Dijkstra's algorithm",
        implemented: true,
      },
    ],
  },

  projects: [
    {
      id: "project-1",
      titleKey: "project.personal-portfolio.title",
      descriptionKey: "project.personal-portfolio.description",
      technologies: [
        "Astro",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
      ],
      imageUrl: undefined,
      featured: true,
    },
    {
      id: "project-2",
      titleKey: "project.academic-management.title",
      descriptionKey: "project.academic-management.description",
      technologies: ["Python", "Django", "PostgreSQL", "Bootstrap"],
      imageUrl: undefined,
      featured: true,
    },
    {
      id: "project-3",
      titleKey: "project.unity-game.title",
      descriptionKey: "project.unity-game.description",
      technologies: ["Unity", "C#", "Game Development"],
      imageUrl: undefined,
      featured: true,
    },
    {
      id: "project-4",
      titleKey: "project.nodejs-api.title",
      descriptionKey: "project.nodejs-api.description",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      imageUrl: undefined,
      featured: false,
    },
  ],

  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/raydel-ernesto-reuco-garcía-252933364",
      icon: "linkedin",
      label: "Connect on LinkedIn",
    },
    {
      platform: "Email",
      url: "mailto:raydel.reuco@gmail.com",
      icon: "mail",
      label: "Send an Email",
    },
    {
      platform: "Phone",
      url: "tel:+5355791136",
      icon: "phone",
      label: "Call Me",
    },
    {
      platform: "GitHub",
      url: "https://github.com/YuuNakata",
      icon: "github",
      label: "View GitHub Profile",
    },
  ],
};
