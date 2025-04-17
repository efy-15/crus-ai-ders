import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div 
      className="group relative bg-highlight rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform h-[400px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
      {project.imageUrl ? (
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="absolute w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      ) : (
        <div className="absolute w-full h-full bg-dark circuit-overlay"></div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex justify-between items-start mb-2">
          <span className="px-3 py-1 bg-primary bg-opacity-90 text-background rounded-full text-xs font-orbitron uppercase">{project.category}</span>
          <span className="bg-dark bg-opacity-60 px-2 py-1 rounded text-xs">{project.year}</span>
        </div>
        <h3 className="font-orbitron text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm opacity-90 mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex justify-between items-center">
          <button className="text-primary font-orbitron text-sm flex items-center gap-1 group-hover:underline">
            <span>VIEW PROJECT</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="flex gap-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-github"></i>
              </a>
            )}
            {project.externalUrl && (
              <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
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
    imageUrl: undefined,
  },
  {
    id: 2,
    title: "Ethics in AI Toolkit",
    description: "Comprehensive resources to help organizations implement ethical guidelines in their AI development.",
    category: "Tool",
    year: "2022",
    githubUrl: "#",
    externalUrl: "#",
    imageUrl: undefined,
  },
  {
    id: 3,
    title: "Community AI Training",
    description: "Free training program bringing AI education to underserved communities and emerging economies.",
    category: "Education",
    year: "2023",
    githubUrl: undefined,
    externalUrl: "#",
    imageUrl: undefined,
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
    <section id="projects" className="py-20 relative bg-dark">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="inline-block font-orbitron text-3xl md:text-4xl font-bold relative">
            Our Quests
            <span className="block h-1 w-full bg-primary mt-2"></span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto opacity-80">Explore our innovative AI projects, each designed to push the boundaries of what's possible while making the technology more accessible.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#" className="inline-flex items-center px-8 py-3 font-orbitron text-sm uppercase tracking-widest border border-primary text-primary rounded hover:bg-primary hover:bg-opacity-10 transition-all">
            <span>Explore All Projects</span>
            <i className="fas fa-project-diagram ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
