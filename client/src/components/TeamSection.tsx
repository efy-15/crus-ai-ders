import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { TeamMember } from "@shared/schema";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div 
      className="bg-dark rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-64 bg-gradient-to-r from-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-dark bg-opacity-80">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
            {member.imageUrl ? (
              <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-highlight flex items-center justify-center">
                <i className="fas fa-user text-4xl text-primary"></i>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-dark to-transparent">
          <h3 className="font-orbitron text-xl font-bold">{member.name}</h3>
          <p className="text-primary">{member.role}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="opacity-80 mb-4">{member.bio}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {member.skills?.map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-highlight text-primary text-xs rounded-full">{skill}</span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <button className="text-primary font-orbitron text-sm flex items-center gap-1 group-hover:underline">
            <span>VIEW PROFILE</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="flex gap-2">
            {member.linkedinUrl && (
              <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {member.githubUrl && (
              <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-github"></i>
              </a>
            )}
            {member.twitterUrl && (
              <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Default sample team members in case API call fails
const sampleTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alexander Knight",
    role: "AI Research Lead",
    bio: "Specializes in neural networks and deep learning architectures with 10+ years of experience in AI research.",
    skills: ["Neural Networks", "Deep Learning", "Research"],
    linkedinUrl: "#",
    githubUrl: "#",
    twitterUrl: undefined,
    imageUrl: undefined,
  },
  {
    id: 2,
    name: "Sophia Shield",
    role: "Ethics & Policy Director",
    bio: "Focuses on ethical AI implementation and policy development to ensure responsible technology deployment.",
    skills: ["AI Ethics", "Policy", "Governance"],
    linkedinUrl: "#",
    githubUrl: undefined,
    twitterUrl: "#",
    imageUrl: undefined,
  },
  {
    id: 3,
    name: "Marcus Valor",
    role: "Engineering Lead",
    bio: "Expert in developing scalable AI systems and leading engineering teams to build production-ready solutions.",
    skills: ["ML Ops", "Architecture", "Scalability"],
    linkedinUrl: "#",
    githubUrl: "#",
    twitterUrl: undefined,
    imageUrl: undefined,
  },
];

export default function TeamSection() {
  const { data: teamMembers, isLoading, error } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
    retry: 1,
  });

  // Fall back to sample team members if API fails
  const displayedMembers = teamMembers || sampleTeamMembers;

  return (
    <section id="team" className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background opacity-90"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="inline-block font-orbitron text-3xl md:text-4xl font-bold relative">
            Our Knights
            <span className="block h-1 w-full bg-primary mt-2"></span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto opacity-80">Meet our team of modern knights, each bringing unique skills and expertise to our quest of democratizing AI.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedMembers.slice(0, 3).map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
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
            <span>View All Team Members</span>
            <i className="fas fa-users ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
