import { motion } from "framer-motion";

export default function MissionSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
      }
    }),
  };

  return (
    <section id="mission" className="py-20 relative bg-dark overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="inline-block font-orbitron text-3xl md:text-4xl font-bold relative">
            Our Mission
            <span className="block h-1 w-full bg-primary mt-2"></span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission Card 1 */}
          <motion.div 
            className="hex-border p-[2px] transform hover:scale-[1.02] transition-transform"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className="bg-dark hex p-6 flex flex-col h-full">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-highlight rounded-xl">
                <i className="fas fa-brain text-primary text-3xl"></i>
              </div>
              <h3 className="font-orbitron text-xl font-bold mb-4">Democratize AI</h3>
              <p className="opacity-80 flex-grow">Making artificial intelligence accessible to individuals and organizations of all sizes, not just tech giants.</p>
              <div className="h-1 w-24 bg-primary mt-4"></div>
            </div>
          </motion.div>
          
          {/* Mission Card 2 */}
          <motion.div 
            className="hex-border p-[2px] transform hover:scale-[1.02] transition-transform"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className="bg-dark hex p-6 flex flex-col h-full">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-highlight rounded-xl">
                <i className="fas fa-shield-alt text-primary text-3xl"></i>
              </div>
              <h3 className="font-orbitron text-xl font-bold mb-4">Ethical Development</h3>
              <p className="opacity-80 flex-grow">Upholding a code of honor in AI development, ensuring technology serves humanity with fairness and transparency.</p>
              <div className="h-1 w-24 bg-primary mt-4"></div>
            </div>
          </motion.div>
          
          {/* Mission Card 3 */}
          <motion.div 
            className="hex-border p-[2px] transform hover:scale-[1.02] transition-transform"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className="bg-dark hex p-6 flex flex-col h-full">
              <div className="h-16 w-16 mb-4 flex items-center justify-center bg-highlight rounded-xl">
                <i className="fas fa-users text-primary text-3xl"></i>
              </div>
              <h3 className="font-orbitron text-xl font-bold mb-4">Community Building</h3>
              <p className="opacity-80 flex-grow">Creating a brotherhood of innovators who share knowledge, tools, and best practices to advance AI for the greater good.</p>
              <div className="h-1 w-24 bg-primary mt-4"></div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 lg:mt-24 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <div className="hex bg-highlight p-6 relative overflow-hidden">
                <div className="absolute inset-0 circuit-overlay opacity-20"></div>
                <blockquote className="relative z-10">
                  <p className="text-lg italic opacity-90 mb-4">"We're not just developing AI - we're forging a new path where technology and human values unite in perfect harmony."</p>
                  <footer className="font-orbitron text-primary">— CrusAIders Manifesto</footer>
                </blockquote>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h3 className="font-orbitron text-2xl font-bold mb-4">Value-Driven Innovation</h3>
              <p className="opacity-80 mb-4">Like the knights of old, we believe in a code of honor. Our approach to AI blends medieval principles of service and protection with futuristic technology.</p>
              <a href="#register" className="inline-flex items-center text-primary font-orbitron group">
                <span>JOIN OUR CAUSE</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
