import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-dark opacity-90"></div>
        <div className="w-full h-full">
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary opacity-5 filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-secondary opacity-5 filter blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Medieval</span>
              <span className="text-primary">Wisdom</span>
              <span className="block">Meets</span>
              <span className="bg-clip-text text-transparent animated-gradient">AI Innovation</span>
            </h1>
            
            <p className="text-lg mb-8 opacity-90 max-w-lg">
              We blend the honor and courage of medieval crusaders with the cutting-edge potential of artificial intelligence to democratize AI for all.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#mission" 
                className="px-8 py-3 font-orbitron text-sm uppercase tracking-widest bg-primary text-background rounded hover:bg-opacity-80 transition-all flex items-center gap-2"
              >
                <span>Our Mission</span>
                <i className="fas fa-chevron-right"></i>
              </a>
              <a 
                href="#projects" 
                className="px-8 py-3 font-orbitron text-sm uppercase tracking-widest border border-primary text-primary rounded hover:bg-primary hover:bg-opacity-10 transition-all flex items-center gap-2"
              >
                <span>View Projects</span>
                <i className="fas fa-th"></i>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 mx-auto"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "loop",
                ease: "easeInOut" 
              }}
            >
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-full object-contain animate-glow"
                fill="white"
              >
                <path d="M100 20 L150 50 L150 150 L100 180 L50 150 L50 50 Z" stroke="#00F5FF" strokeWidth="4" fill="none" />
                <path d="M100 40 L140 65 V135 L100 160 L60 135 V65 Z" fill="white" />
                <path d="M100 40 V160 M60 65 H140 M60 135 H140" stroke="#00F5FF" strokeWidth="2" />
                {/* Circuit lines radiating out */}
                <g stroke="#00F5FF" strokeWidth="2">
                  <path d="M160 60 L190 50" />
                  <path d="M160 80 L190 80" />
                  <path d="M160 100 L190 110" />
                  <path d="M160 120 L190 130" />
                  <path d="M160 140 L190 150" />
                  <path d="M40 60 L10 50" />
                  <path d="M40 80 L10 80" />
                  <path d="M40 100 L10 110" />
                  <path d="M40 120 L10 130" />
                  <path d="M40 140 L10 150" />
                </g>
                {/* Circuit dots */}
                <g fill="#00F5FF">
                  <circle cx="190" cy="50" r="4" className="animate-pulse" />
                  <circle cx="190" cy="80" r="4" className="animate-pulse" />
                  <circle cx="190" cy="110" r="4" className="animate-pulse" />
                  <circle cx="190" cy="130" r="4" className="animate-pulse" />
                  <circle cx="190" cy="150" r="4" className="animate-pulse" />
                  <circle cx="10" cy="50" r="4" className="animate-pulse" />
                  <circle cx="10" cy="80" r="4" className="animate-pulse" />
                  <circle cx="10" cy="110" r="4" className="animate-pulse" />
                  <circle cx="10" cy="130" r="4" className="animate-pulse" />
                  <circle cx="10" cy="150" r="4" className="animate-pulse" />
                </g>
              </svg>
              
              {/* Animated circuit lines */}
              <div className="absolute inset-0 circuit-overlay opacity-30 animate-circuit-flow"></div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <span className="text-xs text-primary font-orbitron mb-2">SCROLL DOWN</span>
          <i className="fas fa-chevron-down text-primary"></i>
        </motion.div>
      </div>
    </section>
  );
}
