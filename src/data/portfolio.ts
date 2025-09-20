import type { PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Raydel Ernesto Reuco García",
    title: "Estudiante en Universidad de las Ciencias Informáticas",
    location: "Havana, Cuba",
    email: "raydel.reuco@gmail.com",
    phone: "+535571136",
    linkedin:
      "https://www.linkedin.com/in/raydel-ernesto-reuco-garc%C3%ADa-contact-info",
    summary:
      "Strong foundation in computer engineering and programming is held, with a passion for using technology to enhance user experiences and solve complex problems. Eagerness to contribute to a team focused on cutting edge software development is evident, along with commitment to continuous learning and technological excellence. Skills in various programming languages and database management position well for impactful contributions in a dynamic environment.",
    avatar: undefined,
  },

  education: [
    {
      id: "education-1",
      degree: "Ingeniería",
      field: "Ingeniería informática",
      institution: "Universidad de las Ciencias Informáticas",
      startDate: "01/2023",
      endDate: "01/2026",
      description:
        "Currently pursuing a degree in Computer Engineering with focus on software development, database management, and modern programming practices.",
    },
  ],

  achievements: [
    {
      id: "achievement-1",
      title: "Web Application Development",
      description: "Developed a web application used by over 500 users daily.",
      icon: "globe",
      metrics: "500+ daily users",
    },
    {
      id: "achievement-2",
      title: "SQL Efficiency Enhancement",
      description:
        "Improved SQL query efficiency by 30% leading to faster data retrieval.",
      icon: "database",
      metrics: "30% improvement",
    },
    {
      id: "achievement-3",
      title: "Unity Game Project Leadership",
      description:
        "Led a team of 4 in creating a Unity game with 1,000 downloads.",
      icon: "gamepad-2",
      metrics: "1,000+ downloads",
    },
    {
      id: "achievement-4",
      title: "Database Backup Automation",
      description: "Automated database backups reducing data loss risk by 90%.",
      icon: "shield-check",
      metrics: "90% risk reduction",
    },
  ],

  skills: [
    // Programming Languages
    {
      id: "skill-1",
      name: "JavaScript",
      category: "programming",
      level: "advanced",
      icon: "javascript",
    },
    {
      id: "skill-2",
      name: "Python",
      category: "programming",
      level: "advanced",
      icon: "python",
    },
    {
      id: "skill-3",
      name: "Java",
      category: "programming",
      level: "intermediate",
      icon: "java",
    },
    {
      id: "skill-4",
      name: "C#",
      category: "programming",
      level: "intermediate",
      icon: "csharp",
    },

    // Databases
    {
      id: "skill-5",
      name: "SQL",
      category: "database",
      level: "advanced",
      icon: "database",
    },
    {
      id: "skill-6",
      name: "PostgreSQL",
      category: "database",
      level: "advanced",
      icon: "postgresql",
    },

    // Frameworks & Tools
    {
      id: "skill-7",
      name: "Django",
      category: "framework",
      level: "intermediate",
      icon: "django",
    },
    {
      id: "skill-8",
      name: "Unity",
      category: "tool",
      level: "intermediate",
      icon: "unity",
    },
    {
      id: "skill-9",
      name: "Godot",
      category: "tool",
      level: "intermediate",
      icon: "godot",
    },
    {
      id: "skill-10",
      name: "Git",
      category: "tool",
      level: "advanced",
      icon: "git",
    },

    // Languages
    {
      id: "skill-11",
      name: "Inglés",
      category: "language",
      level: "intermediate",
      icon: "language",
    },
    {
      id: "skill-12",
      name: "Español",
      category: "language",
      level: "expert",
      icon: "language",
    },
  ],

  projects: [
    {
      id: "project-1",
      title: "Web Application Platform",
      description:
        "Developed and deployed a comprehensive web application serving over 500 daily users with advanced database integration and optimized performance.",
      technologies: ["JavaScript", "Python", "PostgreSQL", "Django"],
      imageUrl: undefined,
      featured: true,
    },
    {
      id: "project-2",
      title: "Unity Game Development",
      description:
        "Led a team of 4 developers to create an engaging Unity game that achieved over 1,000 downloads with innovative gameplay mechanics.",
      technologies: ["Unity", "C#", "Game Development"],
      imageUrl: undefined,
      featured: true,
    },
    {
      id: "project-3",
      title: "Database Optimization System",
      description:
        "Designed and implemented automated database backup solutions that reduced data loss risk by 90% while improving query performance by 30%.",
      technologies: ["SQL", "PostgreSQL", "Python", "Automation"],
      imageUrl: undefined,
      featured: true,
    },
    {
      id: "project-4",
      title: "Backend Development Projects",
      description:
        "Multiple backend development projects focusing on API design, database management, and server-side optimization.",
      technologies: ["Python", "Django", "PostgreSQL", "Git"],
      imageUrl: undefined,
      featured: false,
    },
  ],

  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/raydel-ernesto-reuco-garc%C3%ADa-contact-info",
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
      url: "tel:+535571136",
      icon: "phone",
      label: "Call Me",
    },
    {
      platform: "GitHub",
      url: "https://github.com/raydel-reuco",
      icon: "github",
      label: "View GitHub Profile",
    },
  ],
};
