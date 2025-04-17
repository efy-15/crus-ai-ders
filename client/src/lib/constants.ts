// Color Palette
export const COLORS = {
  primary: "#00F5FF", // neon teal/cyan
  secondary: "#1E90FF", // vivid blue
  background: "#0A0A0A", // deep black
  accent: "#00BFFF", // electric blue
  dark: "#121212", // dark background
  highlight: "#2A2A2A", // highlighted background
  text: "#FFFFFF", // white text
};

// Sample Team Members Data - Fallback if API fails
export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Alexander Knight",
    role: "AI Research Lead",
    bio: "Specializes in neural networks and deep learning architectures with 10+ years of experience in AI research.",
    skills: ["Neural Networks", "Deep Learning", "Research"],
    linkedinUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    name: "Sophia Shield",
    role: "Ethics & Policy Director",
    bio: "Focuses on ethical AI implementation and policy development to ensure responsible technology deployment.",
    skills: ["AI Ethics", "Policy", "Governance"],
    linkedinUrl: "#",
    twitterUrl: "#",
  },
  {
    id: 3,
    name: "Marcus Valor",
    role: "Engineering Lead",
    bio: "Expert in developing scalable AI systems and leading engineering teams to build production-ready solutions.",
    skills: ["ML Ops", "Architecture", "Scalability"],
    linkedinUrl: "#",
    githubUrl: "#",
  },
];

// Sample Projects Data - Fallback if API fails
export const PROJECTS = [
  {
    id: 1,
    title: "AI Accessibility Framework",
    description: "An open-source framework designed to make AI tools accessible to developers with limited resources.",
    category: "Research",
    year: "2023",
    githubUrl: "#",
    externalUrl: "#",
  },
  {
    id: 2,
    title: "Ethics in AI Toolkit",
    description: "Comprehensive resources to help organizations implement ethical guidelines in their AI development.",
    category: "Tool",
    year: "2022",
    githubUrl: "#",
    externalUrl: "#",
  },
  {
    id: 3,
    title: "Community AI Training",
    description: "Free training program bringing AI education to underserved communities and emerging economies.",
    category: "Education",
    year: "2023",
    externalUrl: "#",
  },
];

// Workshop Options
export const WORKSHOPS = [
  {
    id: "fundamentals",
    title: "AI Fundamentals",
    level: "Beginner",
    duration: "3 hours",
    description: "Introduction to AI concepts and practical applications for those new to the field.",
    price: "Free",
  },
  {
    id: "ethical",
    title: "Ethical AI Development",
    level: "Intermediate",
    duration: "6 hours",
    description: "Learn principles and practices for developing AI systems that are fair, transparent, and beneficial.",
    price: "$49.99",
    popular: true,
  },
  {
    id: "implementation",
    title: "AI Implementation",
    level: "Advanced",
    duration: "8 hours",
    description: "Hands-on workshop for implementing AI solutions in real-world applications and scenarios.",
    price: "$99.99",
  },
];
