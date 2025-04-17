import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import NeuralBackground from "./NeuralBackground";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div 
      className="group relative bg-[#031835]/80 backdrop-blur-sm border border-[#0A4080] rounded-lg overflow-hidden shadow-lg transform hover:translate-y-[-5px] transition-transform h-[400px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020B18]/40 to-[#020B18]/95 z-10"></div>
      {project.imageUrl ? (
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="absolute w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 bg-[#052553]/40 bg-opacity-50">
          <div className="absolute inset-0 pattern-circuit opacity-20"></div>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex justify-between items-start mb-2">
          <span className="px-3 py-1 bg-[#00F5FF] text-[#031835] rounded-md text-xs font-orbitron uppercase shadow-glow">{project.category}</span>
          <span className="bg-[#0A2C4D] px-3 py-1 rounded-md text-xs border border-[#0A4080]/30">{project.year}</span>
        </div>
        <h3 className="font-orbitron text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-sm text-gray-300/90 mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex justify-between items-center">
          <button className="text-[#00F5FF] font-orbitron text-sm flex items-center gap-1 group-hover:underline">
            <span>VIEW PROJECT</span>
            <i className="fas fa-chevron-right transform group-hover:translate-x-1 transition-transform"></i>
          </button>
          
          <div className="flex gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00F5FF] transition-colors">
                <i className="fab fa-github"></i>
              </a>
            )}
            {project.externalUrl && (
              <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00F5FF] transition-colors">
                <i className="fas fa-external-link-alt"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Default sample projects in case API call fails
const sampleProjects: Project[] = [
  {
    id: 1,
    title: "AI Accessibility Framework",
    description: "An open-source framework designed to make AI tools accessible to developers with limited resources.",
    category: "Research",
    year: "2023",
    githubUrl: "#",
    externalUrl: "#",
    imageUrl: null,
  },
  {
    id: 2,
    title: "Ethics in AI Toolkit",
    description: "Comprehensive resources to help organizations implement ethical guidelines in their AI development.",
    category: "Tool",
    year: "2022",
    githubUrl: "#",
    externalUrl: "#",
    imageUrl: null,
  },
  {
    id: 3,
    title: "Community AI Training",
    description: "Free training program bringing AI education to underserved communities and emerging economies.",
    category: "Education",
    year: "2023",
    githubUrl: null,
    externalUrl: "#",
    imageUrl: null,
  },
];

export default function ProjectsSection() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    retry: 1,
  });

  // Fall back to sample projects if API fails
  const displayedProjects = projects || sampleProjects;

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#020B18]">
      {/* Neural Network Background with a different color hue */}
      <NeuralBackground opacity={0.85} color="#00BFFF" particleDensity={10} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="inline-block font-orbitron text-3xl md:text-5xl font-bold relative">
            Our Quests
            <span className="block h-1 w-full bg-primary mt-3 rounded-full glow-effect"></span>
          </h2>
          <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-300/90">
            Explore our innovative AI projects, each designed to push the boundaries of what's possible while making the technology more accessible.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#" className="inline-flex items-center px-8 py-3 font-orbitron text-sm uppercase tracking-widest bg-[#0A2C4D] hover:bg-[#0A3A6D] text-[#00F5FF] rounded-md group transition-all duration-300">
            <span>Explore All Projects</span>
            <i className="fas fa-project-diagram ml-3 group-hover:scale-110 transition-transform"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
