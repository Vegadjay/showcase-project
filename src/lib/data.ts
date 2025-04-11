// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  timeline: string;
  techStack: string[];
  problemSolved: string;
  features: string[];
  developmentChallenges: string;
  imageUrls: string[];
  videoUrl?: string;
  links: {
    live: string;
    github?: string;
    twitter?: string;
  };
  owner: {
    name: string;
    avatar: string;
  };
  rating: number;
  createdAt: string;
  teamWork: boolean;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  date: string;
  replies?: Comment[];
}

export interface HireListing {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  remote: boolean;
  description: string;
  requirements: string[];
  salary?: string;
  contact: string;
  postedAt: string;
  status: 'open' | 'hired' | 'interviewing' | 'confidential';
}

// Dummy data for projects
export const projectsData: Project[] = [
  {
    id: 1,
    title: "Personal Finance Tracker",
    shortDescription: "A comprehensive app for tracking expenses, budgeting, and financial planning with beautiful visualizations.",
    description: "A comprehensive personal finance tracking application designed to help users manage their finances effectively.",
    timeline: "Oct 2022 - Jan 2023",
    techStack: ["React", "TypeScript", "TailwindCSS", "Chart.js", "Firebase"],
    problemSolved: "Many people struggle to keep track of their expenses and budgets effectively. Traditional methods like spreadsheets are cumbersome and lack visual insights. This application solves those problems with an intuitive interface and powerful analytics.",
    features: [
      "Expense tracking with categories and tags",
      "Monthly budget planning and alerts",
      "Financial goal setting and progress tracking",
      "Data visualization with interactive charts",
      "Bank account integration (read-only)",
      "Expense forecasting using historical data"
    ],
    developmentChallenges: "The main challenge was creating a secure system for storing financial data while maintaining performance. I implemented end-to-end encryption for sensitive data and used IndexedDB for offline capabilities.",
    imageUrls: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://financetracker.example.com",
      github: "https://github.com/username/finance-tracker"
    },
    owner: {
      name: "Eric Chen",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=50&h=50"
    },
    rating: 4.7,
    createdAt: "2023-01-15",
    teamWork: false,
    comments: [
      {
        id: 1,
        author: {
          name: "Olivia Martinez",
          avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "This looks amazing! I've been looking for a good finance tracker. Does it support importing data from CSV files?",
        date: "2 days ago",
        replies: [
          {
            id: 2,
            author: {
              name: "Eric Chen",
              avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=40&h=40"
            },
            text: "Yes! It supports CSV imports from most major banks and financial institutions. I'm also working on adding direct API connections.",
            date: "1 day ago"
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "James Wilson",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "The UI looks clean and intuitive. What tech stack did you use for the front-end visualizations?",
        date: "3 days ago"
      }
    ]
  },
  {
    id: 2,
    title: "Weather Forecast App",
    shortDescription: "A sleek weather application with hourly and 7-day forecasts, utilizing multiple APIs for accurate data.",
    description: "A modern weather application that provides accurate forecasts with a beautiful user interface.",
    timeline: "Jul 2022 - Sep 2022",
    techStack: ["Node.js", "Express", "React", "OpenWeather API"],
    problemSolved: "Many weather apps have cluttered interfaces and don't provide the right level of detail. This app simplifies the experience while providing all necessary information at a glance.",
    features: [
      "Real-time weather updates",
      "Hourly and 7-day forecasts",
      "Location-based weather data",
      "Animated weather conditions",
      "Severe weather alerts",
      "Multiple location saving"
    ],
    developmentChallenges: "Integrating multiple weather APIs and creating a seamless experience across devices was challenging. I implemented a caching layer to improve performance and reduce API calls.",
    imageUrls: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1530908295418-a12e326966ba?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://weatherapp.example.com",
      github: "https://github.com/username/weather-app"
    },
    owner: {
      name: "Maya Kim",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.9,
    createdAt: "2022-09-10",
    teamWork: false,
    comments: [
      {
        id: 4,
        author: {
          name: "David Lee",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "This is so much better than the default weather app! The hourly forecast feature is particularly useful.",
        date: "1 week ago"
      }
    ]
  },
  {
    id: 3,
    title: "Team Collaboration Tool",
    shortDescription: "A real-time collaboration platform for teams with task management, file sharing, and communication.",
    description: "A comprehensive platform that enables seamless communication and collaboration for remote teams.",
    timeline: "Feb 2022 - Jun 2022",
    techStack: ["Vue", "Vuex", "Firebase", "Socket.io"],
    problemSolved: "Remote teams struggle with scattered communication across multiple platforms. This tool centralizes everything in one place, improving productivity and reducing confusion.",
    features: [
      "Real-time messaging and video calls",
      "Task management with progress tracking",
      "Document collaboration",
      "Team calendar and scheduling",
      "File sharing and storage",
      "Integration with popular tools"
    ],
    developmentChallenges: "Building the real-time collaboration features required careful architecture to ensure performance at scale. I used WebSockets and optimistic UI updates to create a seamless experience.",
    imageUrls: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://teamcollab.example.com",
      github: "https://github.com/username/team-collab"
    },
    owner: {
      name: "Ryan Taylor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.6,
    createdAt: "2022-06-15",
    teamWork: true,
    comments: [
      {
        id: 5,
        author: {
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "We've started using this at our startup and it's been a game-changer for our remote team.",
        date: "2 weeks ago"
      }
    ]
  },
  {
    id: 4,
    title: "AI Image Generator",
    shortDescription: "Generate unique images using AI and machine learning models with customizable parameters.",
    description: "A cutting-edge application that leverages AI to generate unique images based on text prompts.",
    timeline: "Mar 2023 - Aug 2023",
    techStack: ["Python", "TensorFlow", "Flask", "React"],
    problemSolved: "Creators and designers often need unique visual assets but lack the skills or time to create them from scratch. This tool democratizes image creation through AI.",
    features: [
      "Text-to-image generation",
      "Style transfer options",
      "Resolution customization",
      "Batch processing",
      "Image editing and refinement",
      "Export in multiple formats"
    ],
    developmentChallenges: "Training the AI model required significant compute resources and data. I optimized the model for web deployment to ensure reasonable performance on consumer hardware.",
    imageUrls: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://ai-images.example.com",
      github: "https://github.com/username/ai-image-generator"
    },
    owner: {
      name: "Sophia Williams",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.8,
    createdAt: "2023-08-20",
    teamWork: true,
    comments: [
      {
        id: 6,
        author: {
          name: "Michael Brown",
          avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "The quality of the generated images is incredible. What models did you use as the foundation?",
        date: "3 days ago"
      }
    ]
  },
  {
    id: 5,
    title: "Code Review Platform",
    shortDescription: "A platform for developers to review code, collaborate on problems, and learn from each other.",
    description: "A specialized platform that helps developers improve their code quality through collaborative reviews and feedback.",
    timeline: "Jan 2023 - Apr 2023",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "React"],
    problemSolved: "Code reviews are essential for quality but often bottlenecked by process. This platform streamlines reviews and makes them more accessible to developers at all levels.",
    features: [
      "Code snippet sharing and review",
      "Inline commenting and suggestions",
      "Version control integration",
      "Automated code quality checks",
      "Learning resources and best practices",
      "Community challenges and exercises"
    ],
    developmentChallenges: "Creating a code editor with syntax highlighting and inline comments required complex UI work. I built a custom editor component that supports multiple languages.",
    imageUrls: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://codereview.example.com",
      github: "https://github.com/username/code-review-platform"
    },
    owner: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.5,
    createdAt: "2023-04-05",
    teamWork: false,
    comments: [
      {
        id: 7,
        author: {
          name: "Alex Morgan",
          avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "I've been using this with my team for a month now, and our code quality has improved significantly.",
        date: "1 month ago"
      }
    ]
  },
  {
    id: 6,
    title: "E-learning Management System",
    shortDescription: "A complete LMS with course creation, student management, and progress tracking.",
    description: "A comprehensive learning management system for educational institutions and course creators.",
    timeline: "Nov 2022 - Feb 2023",
    techStack: ["PHP", "Laravel", "MySQL", "Vue.js"],
    problemSolved: "Traditional education systems don't scale well for online learning. This platform provides all the tools needed for effective online education.",
    features: [
      "Course creation and management",
      "Student enrollment and progress tracking",
      "Quiz and assignment tools",
      "Discussion forums",
      "Certificate generation",
      "Analytics dashboard for educators"
    ],
    developmentChallenges: "Designing a system that works for various educational contexts required a highly modular architecture. I implemented a plugin system for customizing features.",
    imageUrls: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://elearning.example.com",
      github: "https://github.com/username/elearning-platform"
    },
    owner: {
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.7,
    createdAt: "2023-02-28",
    teamWork: true,
    comments: [
      {
        id: 8,
        author: {
          name: "Robert Kim",
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "We implemented this at our community college and the interface is much more intuitive than our previous system.",
        date: "2 months ago"
      }
    ]
  },
  {
    id: 7,
    title: "Fitness Tracking App",
    shortDescription: "A mobile app for tracking workouts, nutrition, and health metrics with personalized recommendations.",
    description: "A holistic fitness companion that helps users achieve their health goals through personalized tracking and insights.",
    timeline: "May 2023 - Aug 2023",
    techStack: ["Swift", "SwiftUI", "CoreData", "HealthKit"],
    problemSolved: "Most fitness apps focus on just one aspect of health. This app combines workout tracking, nutrition, and wellness metrics in one place for a complete picture.",
    features: [
      "Workout planning and tracking",
      "Nutrition and meal logging",
      "Body metrics and progress photos",
      "Sleep and recovery analysis",
      "AI-powered workout recommendations",
      "Social challenges and sharing"
    ],
    developmentChallenges: "Integrating with health devices and ensuring data accuracy was complex. I developed a calibration system to improve tracking precision.",
    imageUrls: [
      "https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://fitness-app.example.com",
      github: "https://github.com/username/fitness-tracker"
    },
    owner: {
      name: "Daniel Park",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.6,
    createdAt: "2023-08-15",
    teamWork: false,
    comments: [
      {
        id: 9,
        author: {
          name: "Jennifer Lopez",
          avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "I love how it syncs with my Apple Watch and gives me actionable insights about my training.",
        date: "1 week ago"
      }
    ]
  },
  {
    id: 8,
    title: "Recipe Sharing Platform",
    shortDescription: "A community-driven platform for sharing and discovering recipes with ingredient tracking.",
    description: "A social platform for food enthusiasts to share recipes, discover new dishes, and plan meals.",
    timeline: "Aug 2022 - Dec 2022",
    techStack: ["Angular", "Firebase", "Node.js", "MongoDB"],
    problemSolved: "Recipe discovery is fragmented across blogs and websites with inconsistent formats. This platform standardizes recipe sharing and adds social features.",
    features: [
      "Recipe creation with structured format",
      "Ingredient-based search",
      "Dietary restriction filters",
      "Meal planning calendar",
      "Shopping list generation",
      "User reviews and ratings"
    ],
    developmentChallenges: "Parsing and standardizing recipe inputs was difficult. I created a natural language processing system to extract structured data from text recipes.",
    imageUrls: [
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://recipe-share.example.com",
      github: "https://github.com/username/recipe-platform"
    },
    owner: {
      name: "Olivia Martinez",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.8,
    createdAt: "2022-12-10",
    teamWork: false,
    comments: [
      {
        id: 10,
        author: {
          name: "Thomas Zhang",
          avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "The meal planning feature has transformed how I approach cooking for the week. Great work!",
        date: "3 weeks ago"
      }
    ]
  },
  {
    id: 9,
    title: "Modern Dashboard Analytics",
    shortDescription: "A comprehensive analytics dashboard with real-time data visualization and customizable widgets.",
    description: "An enterprise-grade analytics platform that helps businesses make data-driven decisions.",
    timeline: "Apr 2022 - Sep 2022",
    techStack: ["React", "Redux", "D3.js", "Node.js", "MongoDB"],
    problemSolved: "Businesses struggle to consolidate data from multiple sources and turn it into actionable insights. This dashboard centralizes data and makes it accessible to all team members.",
    features: [
      "Real-time data visualization",
      "Customizable dashboard widgets",
      "Data source integration",
      "Automated reporting",
      "Anomaly detection",
      "Role-based access control"
    ],
    developmentChallenges: "Creating performant visualizations with large datasets required optimization. I implemented data sampling and progressive loading techniques.",
    imageUrls: [
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://analytics-dashboard.example.com",
      github: "https://github.com/username/analytics-dashboard"
    },
    owner: {
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=50&h=50"
    },
    rating: 4.9,
    createdAt: "2022-09-30",
    teamWork: true,
    comments: [
      {
        id: 11,
        author: {
          name: "Laura Chen",
          avatar: "https://images.unsplash.com/photo-1604426633861-11b2faead63c?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "We've integrated this with our CRM and the insights have been invaluable for our sales team.",
        date: "2 months ago"
      }
    ]
  },
  {
    id: 10,
    title: "NextGen E-commerce Platform",
    shortDescription: "A full-featured e-commerce solution with AI product recommendations and seamless checkout.",
    description: "A modern e-commerce platform built for scale and conversion optimization.",
    timeline: "Jun 2022 - Dec 2022",
    techStack: ["React", "Next.js", "GraphQL", "MongoDB", "Stripe"],
    problemSolved: "Small businesses struggle with setting up e-commerce platforms that can compete with large retailers. This platform provides enterprise features at an accessible price point.",
    features: [
      "Product catalog management",
      "AI-powered product recommendations",
      "One-click checkout",
      "Inventory management",
      "Customer relationship tools",
      "Analytics and sales reporting"
    ],
    developmentChallenges: "Building a checkout process that balances security with convenience was challenging. I implemented a progressive enhancement approach that works across devices.",
    imageUrls: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://nextgen-ecommerce.example.com",
      github: "https://github.com/username/ecommerce-platform"
    },
    owner: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=50&h=50"
    },
    rating: 4.8,
    createdAt: "2022-12-15",
    teamWork: true,
    comments: [
      {
        id: 12,
        author: {
          name: "Mark Wilson",
          avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "We migrated our store to this platform and saw a 15% increase in conversion rate immediately.",
        date: "1 month ago"
      }
    ]
  },
  {
    id: 11,
    title: "Social Connect Mobile App",
    shortDescription: "A social media platform focused on connecting developers and designers through shared projects.",
    description: "A niche social network that helps creative professionals connect, collaborate, and share their work.",
    timeline: "Jan 2023 - May 2023",
    techStack: ["React Native", "Firebase", "Node.js", "MongoDB"],
    problemSolved: "Developers and designers often work in isolation. This platform creates a community where they can showcase work, get feedback, and find collaborators.",
    features: [
      "Portfolio showcase",
      "Project collaboration tools",
      "Skill matching algorithm",
      "Job board integration",
      "Learning resources and tutorials",
      "Event discovery and networking"
    ],
    developmentChallenges: "Building a cross-platform app with native performance was difficult. I optimized rendering and implemented virtualized lists for smooth scrolling.",
    imageUrls: [
      "https://images.unsplash.com/photo-1601430854328-26d0d85392e9?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1573152143286-0c422b4d2175?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://socialconnect.example.com",
      github: "https://github.com/username/social-connect"
    },
    owner: {
      name: "David Lee",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=50&h=50"
    },
    rating: 4.7,
    createdAt: "2023-05-20",
    teamWork: true,
    comments: [
      {
        id: 13,
        author: {
          name: "Nina Patel",
          avatar: "https://images.unsplash.com/photo-1605993439219-9d09d2020fa3?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "This app helped me find a developer for my startup idea. The matching algorithm is spot on!",
        date: "2 weeks ago"
      }
    ]
  },
  // Add more projects to reach 20+ total
  {
    id: 12,
    title: "Smart Home Control System",
    shortDescription: "IoT-based home automation solution for controlling lights, temperature, and security devices.",
    description: "A comprehensive smart home system that connects and controls all your IoT devices through a single interface.",
    timeline: "Mar 2022 - Aug 2022",
    techStack: ["Python", "Flask", "React", "MQTT", "Raspberry Pi"],
    problemSolved: "Smart home devices often use different ecosystems, creating a fragmented user experience. This system unifies control of various devices regardless of manufacturer.",
    features: [
      "Universal device control",
      "Automation rules and schedules",
      "Voice command integration",
      "Energy usage monitoring",
      "Security camera feeds",
      "Remote access and control"
    ],
    developmentChallenges: "Integrating with various IoT protocols and ensuring reliable communication was complex. I created adapter modules for each major ecosystem.",
    imageUrls: [
      "https://images.unsplash.com/photo-1558002038-bb0401b89c8d?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://smarthome.example.com",
      github: "https://github.com/username/smart-home-system"
    },
    owner: {
      name: "Jason Rodriguez",
      avatar: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.6,
    createdAt: "2022-08-12",
    teamWork: false,
    comments: [
      {
        id: 14,
        author: {
          name: "Eleanor Wright",
          avatar: "https://images.unsplash.com/photo-1535468884333-2b531f6b55b0?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "This has completely transformed how I interact with my home. The energy monitoring feature has helped reduce our electricity bill significantly.",
        date: "3 months ago"
      }
    ]
  },
  {
    id: 13,
    title: "Augmented Reality Navigation",
    shortDescription: "AR application that overlays navigation directions and points of interest on the real world.",
    description: "An innovative navigation system that uses augmented reality to display directions directly on your surroundings.",
    timeline: "Sep 2022 - Jan 2023",
    techStack: ["Swift", "ARKit", "Core Location", "MapKit"],
    problemSolved: "Traditional map navigation requires constantly looking down at a phone. This AR solution keeps users aware of their surroundings while providing guidance.",
    features: [
      "Real-time AR navigation overlays",
      "Points of interest highlighting",
      "Offline map support",
      "Voice guidance",
      "Location sharing",
      "Historical tour guides"
    ],
    developmentChallenges: "Achieving precise AR placement in various lighting conditions was difficult. I implemented a hybrid approach that combines GPS, visual markers, and inertial data.",
    imageUrls: [
      "https://images.unsplash.com/photo-1626379801357-537572de4ad6?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1487139975590-b4f1dce9b035?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1610213989750-edd68b6a3b23?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://ar-navigation.example.com",
      github: "https://github.com/username/ar-navigation"
    },
    owner: {
      name: "Michelle Chang",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.7,
    createdAt: "2023-01-25",
    teamWork: true,
    comments: [
      {
        id: 15,
        author: {
          name: "Kevin Hart",
          avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "Used this on my trip to Tokyo and it made exploring the city so much easier. Fantastic technology!",
        date: "2 months ago"
      }
    ]
  },
  {
    id: 14,
    title: "Blockchain Voting System",
    shortDescription: "Secure and transparent voting platform built on blockchain technology for organizations.",
    description: "A decentralized voting system that ensures transparency, security, and immutability of election results.",
    timeline: "Apr 2023 - Jul 2023",
    techStack: ["Solidity", "Ethereum", "React", "Web3.js"],
    problemSolved: "Traditional voting systems lack transparency and are vulnerable to manipulation. This blockchain solution ensures votes cannot be altered and provides complete auditability.",
    features: [
      "Secure voter authentication",
      "Anonymous voting",
      "Real-time results",
      "Immutable vote recording",
      "Audit trail and verification",
      "Customizable election rules"
    ],
    developmentChallenges: "Balancing voter privacy with verification capabilities was challenging. I implemented zero-knowledge proofs to allow verification without revealing individual votes.",
    imageUrls: [
      "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1596367407372-96cb88503db6?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://blockchain-voting.example.com",
      github: "https://github.com/username/blockchain-voting"
    },
    owner: {
      name: "Victor Nguyen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.8,
    createdAt: "2023-07-10",
    teamWork: true,
    comments: [
      {
        id: 16,
        author: {
          name: "Sandra Garcia",
          avatar: "https://images.unsplash.com/photo-1609132718484-cc90df3417f8?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "We implemented this for our cooperative's board elections and it increased member participation by 40%.",
        date: "3 weeks ago"
      }
    ]
  },
  {
    id: 15,
    title: "Virtual Reality Therapy",
    shortDescription: "VR application for therapy and rehabilitation with customizable environments and exercises.",
    description: "A therapeutic VR platform that helps patients recover from physical injuries and manage psychological conditions.",
    timeline: "Feb 2023 - Jun 2023",
    techStack: ["Unity", "C#", "Oculus SDK", "Azure"],
    problemSolved: "Traditional therapy can be repetitive and disengaging. This VR solution increases patient motivation and adherence through immersive environments.",
    features: [
      "Customizable therapeutic exercises",
      "Progress tracking and reporting",
      "Clinician dashboard",
      "Pain distraction modules",
      "Gradual exposure therapy",
      "Remote session capabilities"
    ],
    developmentChallenges: "Creating exercises that were therapeutically effective while being engaging required close collaboration with healthcare professionals. I implemented a modular system that allows therapists to customize treatments.",
    imageUrls: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://vr-therapy.example.com",
      github: "https://github.com/username/vr-therapy"
    },
    owner: {
      name: "Dr. Rachel Kim",
      avatar: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.9,
    createdAt: "2023-06-15",
    teamWork: true,
    comments: [
      {
        id: 17,
        author: {
          name: "Dr. Michael Johnson",
          avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "I've been using this with my patients who have mobility issues, and the engagement levels are remarkable compared to traditional exercises.",
        date: "1 month ago"
      }
    ]
  },
  {
    id: 16,
    title: "AI Language Learning Assistant",
    shortDescription: "Language learning application with AI conversation partners and personalized lessons.",
    description: "An innovative language learning platform that uses artificial intelligence to create natural conversations and personalized learning paths.",
    timeline: "Jul 2022 - Nov 2022",
    techStack: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
    problemSolved: "Traditional language learning apps lack authentic conversation practice. This AI solution provides realistic dialogue partners that adapt to the learner's level.",
    features: [
      "AI conversation partners",
      "Speech recognition and correction",
      "Personalized learning paths",
      "Cultural context explanations",
      "Vocabulary tracking and spaced repetition",
      "Progress analytics and recommendations"
    ],
    developmentChallenges: "Creating conversational AI that could adapt to different language levels was complex. I used transfer learning from large language models fine-tuned for educational purposes.",
    imageUrls: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1604882328180-501d867ea63d?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://ai-language.example.com",
      github: "https://github.com/username/language-assistant"
    },
    owner: {
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.7,
    createdAt: "2022-11-25",
    teamWork: true,
    comments: [
      {
        id: 18,
        author: {
          name: "Marco Rossi",
          avatar: "https://images.unsplash.com/photo-1563237023-b1e970526dcb?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "I've tried many language apps, and this is the only one that actually helped me become conversational in Japanese.",
        date: "4 months ago"
      }
    ]
  },
  {
    id: 17,
    title: "Sustainable Supply Chain Tracker",
    shortDescription: "Blockchain-based system for tracking product origins and ensuring ethical sourcing.",
    description: "A supply chain transparency platform that allows businesses and consumers to verify the ethical and sustainable origins of products.",
    timeline: "Oct 2022 - Mar 2023",
    techStack: ["Hyperledger Fabric", "Node.js", "React", "PostgreSQL"],
    problemSolved: "Supply chains are often opaque, making it difficult to verify ethical sourcing claims. This system provides immutable records of a product's journey from source to consumer.",
    features: [
      "QR code product tracking",
      "Blockchain verification of origins",
      "Environmental impact assessment",
      "Supplier certification management",
      "Consumer-facing transparency portal",
      "Reporting and analytics tools"
    ],
    developmentChallenges: "Creating a system that works across diverse industries with different supply chain structures required a highly adaptable architecture. I implemented a modular data model that can be customized per industry.",
    imageUrls: [
      "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://supply-chain.example.com",
      github: "https://github.com/username/sustainable-supply-chain"
    },
    owner: {
      name: "Andrew Thompson",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.8,
    createdAt: "2023-03-20",
    teamWork: true,
    comments: [
      {
        id: 19,
        author: {
          name: "Lisa Campbell",
          avatar: "https://images.unsplash.com/photo-1598346762291-aee88549193f?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "We've implemented this in our coffee business and our customers love being able to trace their beans back to the exact farm.",
        date: "2 months ago"
      }
    ]
  },
  {
    id: 18,
    title: "Digital Garden Planner",
    shortDescription: "Smart gardening application with plant recommendations, care schedules, and climate data.",
    description: "A comprehensive gardening assistant that helps users plan, maintain, and optimize their gardens based on local conditions.",
    timeline: "Jan 2022 - Apr 2022",
    techStack: ["React", "Node.js", "MongoDB", "Weather API"],
    problemSolved: "Gardening requires specialized knowledge that many beginners lack. This app provides personalized guidance based on location, climate, and available space.",
    features: [
      "Personalized plant recommendations",
      "Garden layout planning tool",
      "Care schedule and reminders",
      "Pest and disease identification",
      "Harvest tracking and recipes",
      "Community knowledge sharing"
    ],
    developmentChallenges: "Creating accurate plant recommendations based on multiple factors (climate, soil, sun exposure) required a complex recommendation algorithm. I built a machine learning model trained on successful gardens in different regions.",
    imageUrls: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1651310758504-eb712036f22a?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://garden-planner.example.com",
      github: "https://github.com/username/garden-planner"
    },
    owner: {
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1506956191951-7a88da4435e5?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.6,
    createdAt: "2022-04-15",
    teamWork: false,
    comments: [
      {
        id: 20,
        author: {
          name: "Robert Greene",
          avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "This app helped me create my first successful vegetable garden! The recommendations for companion planting were especially helpful.",
        date: "6 months ago"
      }
    ]
  },
  {
    id: 19,
    title: "Mindfulness Meditation App",
    shortDescription: "Personalized meditation app with AI-guided sessions and progress tracking.",
    description: "A mindfulness platform that provides personalized meditation sessions and tracks mental wellbeing over time.",
    timeline: "May 2022 - Sep 2022",
    techStack: ["Flutter", "Firebase", "TensorFlow Lite", "Node.js"],
    problemSolved: "Generic meditation apps don't adapt to individual needs and progress. This app uses AI to customize sessions based on the user's stress levels and meditation history.",
    features: [
      "AI-guided meditation sessions",
      "Breathing exercise visualizations",
      "Mood and stress tracking",
      "Sleep stories and soundscapes",
      "Progress insights and trends",
      "Community challenges and groups"
    ],
    developmentChallenges: "Creating an AI that could effectively guide meditation sessions required extensive testing with meditation practitioners. I developed a feedback system that continuously improves recommendations based on user outcomes.",
    imageUrls: [
      "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1589207924121-8f3a55b3b398?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://mindfulness-app.example.com",
      github: "https://github.com/username/mindfulness-app"
    },
    owner: {
      name: "Aiden Wong",
      avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.9,
    createdAt: "2022-09-10",
    teamWork: false,
    comments: [
      {
        id: 21,
        author: {
          name: "Emma Davis",
          avatar: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "This app has been life-changing for my anxiety management. The AI seems to know exactly what kind of meditation I need each day.",
        date: "5 months ago"
      }
    ]
  },
  {
    id: 20,
    title: "Community Volunteer Matching",
    shortDescription: "Platform connecting volunteers with local community projects and tracking impact.",
    description: "A social impact platform that connects volunteers with community organizations based on skills and interests.",
    timeline: "Aug 2022 - Jan 2023",
    techStack: ["Ruby on Rails", "PostgreSQL", "React", "MapBox"],
    problemSolved: "Connecting willing volunteers with appropriate opportunities is often inefficient. This platform streamlines matching based on skills, interests, and availability.",
    features: [
      "Skill-based volunteer matching",
      "Project discovery map",
      "Impact tracking and reporting",
      "Volunteer hour verification",
      "Organization verification",
      "Community recognition system"
    ],
    developmentChallenges: "Creating an effective matching algorithm that considers multiple factors (skills, location, availability, interests) was complex. I implemented a recommendation system similar to those used in job matching platforms.",
    imageUrls: [
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1000&h=600",
      "https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=1000&h=600"
    ],
    links: {
      live: "https://volunteer-match.example.com",
      github: "https://github.com/username/volunteer-platform"
    },
    owner: {
      name: "Jessica Martinez",
      avatar: "https://images.unsplash.com/photo-1591084728795-1149f32d9866?auto=format&fit=crop&q=80&w=40&h=40"
    },
    rating: 4.7,
    createdAt: "2023-01-30",
    teamWork: true,
    comments: [
      {
        id: 22,
        author: {
          name: "Carlos Rodriguez",
          avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=40&h=40"
        },
        text: "Our nonprofit has found amazing skilled volunteers through this platform. The impact tracking features also help us report to our funders.",
        date: "2 months ago"
      }
    ]
  }
];

// Dummy data for hire listings
export const hireListingsData: HireListing[] = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechInnovate",
    logo: "https://images.unsplash.com/photo-1586374579358-9d19d632b6d7?auto=format&fit=crop&q=80&w=100&h=100",
    location: "San Francisco, CA",
    remote: true,
    description: "We're looking for an experienced React developer to help build our next-generation web applications. You'll work with a talented team on challenging projects using the latest technologies.",
    requirements: [
      "5+ years of experience with React and modern JavaScript",
      "Experience with TypeScript and state management libraries",
      "Knowledge of performance optimization and responsive design",
      "Excellent communication and teamwork skills"
    ],
    salary: "$120,000 - $150,000",
    contact: "careers@techinnovate.example.com",
    postedAt: "2023-09-15",
    status: 'open'
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "DataVision",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=100&h=100",
    location: "Boston, MA",
    remote: true,
    description: "Join our growing team to build data-driven applications that help businesses make better decisions. You'll work on both frontend and backend components of our platform.",
    requirements: [
      "3+ years of experience with full stack development",
      "Proficiency in React, Node.js, and SQL/NoSQL databases",
      "Experience with cloud services (AWS/Azure/GCP)",
      "Ability to work in a fast-paced environment"
    ],
    salary: "$100,000 - $130,000",
    contact: "jobs@datavision.example.com",
    postedAt: "2023-10-02",
    status: 'interviewing'
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "CreativeWorks",
    logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=100&h=100",
    location: "New York, NY",
    remote: false,
    description: "We're seeking a talented UI/UX designer to create beautiful, intuitive interfaces for our clients. You'll work closely with developers and product managers to bring designs to life.",
    requirements: [
      "Portfolio demonstrating strong UI/UX work",
      "Proficiency in Figma, Adobe XD, or similar tools",
      "Understanding of user-centered design principles",
      "Experience with design systems and component libraries"
    ],
    salary: "$90,000 - $120,000",
    contact: "design@creativeworks.example.com",
    postedAt: "2023-09-28",
    status: 'hired'
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    company: "AI Solutions",
    logo: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=100&h=100",
    location: "Seattle, WA",
    remote: true,
    description: "Help us build the next generation of AI-powered products. You'll work on developing and deploying machine learning models for various applications.",
    requirements: [
      "MS or PhD in Computer Science, AI, or related field",
      "Experience with TensorFlow, PyTorch, or similar frameworks",
      "Strong programming skills in Python",
      "Knowledge of data preprocessing and feature engineering"
    ],
    contact: "recruiting@aisolutions.example.com",
    postedAt: "2023-10-10",
    status: 'confidential'
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    logo: "https://images.unsplash.com/photo-1529612700005-e35377bf1415?auto=format&fit=crop&q=80&w=100&h=100",
    location: "Austin, TX",
    remote: true,
    description: "Join our infrastructure team to help build and maintain our cloud-based platform. You'll work on automation, CI/CD pipelines, and infrastructure as code.",
    requirements: [
      "3+ years of experience in DevOps or SRE roles",
      "Proficiency with AWS, Kubernetes, and Docker",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Knowledge of monitoring and logging systems"
    ],
    salary: "$110,000 - $140,000",
    contact: "jobs@cloudtech.example.com",
    postedAt: "2023-09-20",
    status: 'open'
  },
  {
    id: 6,
    title: "Mobile Developer (React Native)",
    company: "AppWorks",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100&h=100",
    location: "Chicago, IL",
    remote: true,
    description: "We're looking for a React Native developer to help build cross-platform mobile applications. You'll work on new features and improvements to our existing apps.",
    requirements: [
      "2+ years of experience with React Native",
      "Understanding of mobile app architecture and state management",
      "Experience with native modules and third-party integrations",
      "Knowledge of app publishing processes for iOS and Android"
    ],
    salary: "$85,000 - $115,000",
    contact: "careers@appworks.example.com",
    postedAt: "2023-10-05",
    status: 'interviewing'
  },
  {
    id: 7,
    title: "Frontend Developer",
    company: "WebSolutions",
    logo: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&q=80&w=100&h=100",
    location: "Denver, CO",
    remote: true,
    description: "Join our team to build beautiful and responsive web applications. You'll work with designers and backend developers to create seamless user experiences.",
    requirements: [
      "2+ years of experience with modern JavaScript frameworks",
      "Proficiency with HTML, CSS, and responsive design",
      "Experience with state management and API integration",
      "Eye for detail and commitment to code quality"
    ],
    salary: "$80,000 - $110,000",
    contact: "hr@websolutions.example.com",
    postedAt: "2023-09-25",
    status: 'open'
  },
  {
    id: 8,
    title: "Backend Developer (Node.js)",
    company: "ServerPro",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=100&h=100",
    location: "Portland, OR",
    remote: true,
    description: "We're seeking a Node.js developer to help build and scale our backend services. You'll work on API development, database optimization, and system architecture.",
    requirements: [
      "3+ years of experience with Node.js",
      "Proficiency with Express or similar frameworks",
      "Experience with SQL and NoSQL databases",
      "Understanding of RESTful API design principles"
    ],
    salary: "$90,000 - $120,000",
    contact: "jobs@serverpro.example.com",
    postedAt: "2023-10-08",
    status: 'confidential'
  }
];

// Tech stack list for filtering
export const techStackList: string[] = [
  "All",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "TypeScript",
  "C#",
  "Go",
  "Rust"
];
