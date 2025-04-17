import { motion } from "framer-motion";
import NeuralBackground from "./NeuralBackground";

export default function MissionSection() {
  return (
    <section id="mission" className="py-24 relative overflow-hidden bg-[#020B18]">
      {/* Neural Network Background */}
      <NeuralBackground opacity={0.9} color="#00BFFF" particleDensity={15} />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="inline-block font-orbitron text-3xl md:text-5xl font-bold relative">
            Our Mission
            <span className="block h-1 w-full bg-primary mt-3 rounded-full glow-effect"></span>
          </h2>
          <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-300/90">
            Blending medieval valor with cutting-edge innovation, we're on a quest to reshape the future of artificial intelligence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Mission Pillars */}
          <motion.div 
            className="bg-[#031835]/80 backdrop-blur-sm border border-[#0A4080] p-8 rounded-md shadow-lg transform hover:translate-y-[-5px] transition-transform"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-full flex justify-start mb-6">
              <div className="h-16 w-16 flex items-center justify-center rounded-md bg-[#0047AB]/20 border border-[#0A6EFF]/20">
                <i className="fas fa-brain text-[#00F5FF] text-3xl"></i>
              </div>
            </div>
            <h3 className="font-orbitron text-xl font-bold mb-4 text-white">Democratize AI</h3>
            <p className="text-gray-300/80">Making artificial intelligence accessible to individuals and organizations of all sizes, not just tech giants.</p>
            <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#0A6EFF]"></div>
          </motion.div>
          
          <motion.div 
            className="bg-[#031835]/80 backdrop-blur-sm border border-[#0A4080] p-8 rounded-md shadow-lg transform hover:translate-y-[-5px] transition-transform"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-full flex justify-start mb-6">
              <div className="h-16 w-16 flex items-center justify-center rounded-md bg-[#0047AB]/20 border border-[#0A6EFF]/20">
                <i className="fas fa-shield-alt text-[#00F5FF] text-3xl"></i>
              </div>
            </div>
            <h3 className="font-orbitron text-xl font-bold mb-4 text-white">Ethical Development</h3>
            <p className="text-gray-300/80">Upholding a code of honor in AI development, ensuring technology serves humanity with fairness and transparency.</p>
            <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#0A6EFF]"></div>
          </motion.div>
          
          <motion.div 
            className="bg-[#031835]/80 backdrop-blur-sm border border-[#0A4080] p-8 rounded-md shadow-lg transform hover:translate-y-[-5px] transition-transform"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="w-full flex justify-start mb-6">
              <div className="h-16 w-16 flex items-center justify-center rounded-md bg-[#0047AB]/20 border border-[#0A6EFF]/20">
                <i className="fas fa-users text-[#00F5FF] text-3xl"></i>
              </div>
            </div>
            <h3 className="font-orbitron text-xl font-bold mb-4 text-white">Community Building</h3>
            <p className="text-gray-300/80">Creating a brotherhood of innovators who share knowledge, tools, and best practices to advance AI for the greater good.</p>
            <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#0A6EFF]"></div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 max-w-4xl mx-auto bg-[#031835]/40 backdrop-blur-md rounded-lg border border-[#0A4080]/50 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 relative flex items-center">
              <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00F5FF]/30 to-transparent"></div>
              <blockquote>
                <p className="text-xl text-gray-200 italic leading-relaxed mb-4">
                  "We're not just developing AI - we're forging a new path where technology and human values unite in perfect harmony."
                </p>
                <footer className="font-orbitron text-[#00F5FF]">— CrusAIders Manifesto</footer>
              </blockquote>
            </div>
            
            <div className="p-8 bg-[#052553]/40">
              <h3 className="font-orbitron text-2xl font-bold mb-4 text-white">Value-Driven Innovation</h3>
              <p className="text-gray-300/90 mb-6">Like the knights of old, we believe in a code of honor. Our approach to AI blends medieval principles of service and protection with futuristic technology.</p>
              <a href="#register" className="inline-flex items-center text-[#00F5FF] font-orbitron bg-[#0A2C4D] hover:bg-[#0A3A6D] px-6 py-3 rounded-md group transition-all duration-300">
                <span>JOIN OUR CAUSE</span>
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
