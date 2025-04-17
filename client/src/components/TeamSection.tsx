import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { TeamMember } from "@shared/schema";
import NeuralBackground from "./NeuralBackground";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      className="bg-[#031835]/80 backdrop-blur-sm border border-[#0A4080] rounded-lg overflow-hidden shadow-lg transform hover:translate-y-[-5px] transition-transform group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-64 relative overflow-hidden bg-[#052553]/60">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#00F5FF]/70 shadow-[0_0_15px_rgba(0,245,255,0.4)]">
            {member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#0A4080] flex items-center justify-center">
                <i className="fas fa-user text-4xl text-[#00F5FF]"></i>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#031835] to-transparent">
          <h3 className="font-orbitron text-xl font-bold text-white">
            {member.name}
          </h3>
          <p className="text-[#00F5FF]">{member.role}</p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-300/80 mb-4">{member.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {member.skills?.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-[#0A4080]/50 text-[#00F5FF] text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button className="text-[#00F5FF] font-orbitron text-sm flex items-center gap-1 group-hover:underline">
            <span>VIEW PROFILE</span>
            <i className="fas fa-chevron-right transform group-hover:translate-x-1 transition-transform"></i>
          </button>

          <div className="flex gap-3">
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00F5FF] transition-colors"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {member.githubUrl && (
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00F5FF] transition-colors"
              >
                <i className="fab fa-github"></i>
              </a>
            )}
            {member.twitterUrl && (
              <a
                href={member.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00F5FF] transition-colors"
              >
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
    name: "Prathap Chandran",
    role: "EVP of Data",
    bio: "Shapes Loadsure's data and AI vision-governing data quality, scaling AI initiatives, and enabling every department to build with confidence.",
    skills: ["Data Strategy", "AI Enablement", "Insurance Innovation"],
    linkedinUrl: "#",
    githubUrl: "#",
    twitterUrl: null,
    imageUrl: null,
  },
  {
    id: 2,
    name: "Estefany Montoya",
    role: "Machine Learning Engineer",
    bio: "Builds AI-powered systems that drive automation, accuracy, and agility across Loadsure’s core products and processes.",
    skills: ["AI Solutions", "Scalability", "Research"],
    linkedinUrl: "#",
    githubUrl: null,
    twitterUrl: "#",
    imageUrl: null,
  },
  {
    id: 3,
    name: "Lisanne Teschner",
    role: "Customer Experience Rep – Operations",
    bio: "Acts as the voice of the user, ensuring AI tools and processes are intuitive, accessible, and impactful in day-to-day operations.",
    skills: ["User Advocacy", "AI Adoption", "Operational Insights"],
    linkedinUrl: "#",
    githubUrl: "#",
    twitterUrl: null,
    imageUrl: null,
  },
];

export default function TeamSection() {
  const {
    data: teamMembers,
    isLoading,
    error,
  } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
    retry: 1,
  });

  // Fall back to sample team members if API fails
  const displayedMembers = teamMembers || sampleTeamMembers;

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#020B18]">
      {/* Neural Network Background with slightly different color for visual variety */}
      <NeuralBackground opacity={0.8} color="#0A6EFF" particleDensity={12} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="inline-block font-orbitron text-3xl md:text-5xl font-bold relative">
            Our Knights
            <span className="block h-1 w-full bg-primary mt-3 rounded-full glow-effect"></span>
          </h2>
          <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-300/90">
            Meet our team of modern knights, each bringing unique skills and
            expertise to our quest of democratizing AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedMembers.slice(0, 3).map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#"
            className="inline-flex items-center px-8 py-3 font-orbitron text-sm uppercase tracking-widest bg-[#0A2C4D] hover:bg-[#0A3A6D] text-[#00F5FF] rounded-md group transition-all duration-300"
          >
            <span>View All Team Members</span>
            <i className="fas fa-users ml-3 group-hover:scale-110 transition-transform"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
