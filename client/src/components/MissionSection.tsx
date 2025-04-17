import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function MissionSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Neural network animation for the background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Nodes and connections
    const nodes: {x: number, y: number, radius: number, speed: number}[] = [];
    const connections: {from: number, to: number, width: number, alpha: number, pulse: boolean, pulseDirection: number, pulseAlpha: number}[] = [];
    const particlesCount = Math.min(Math.floor(canvas.width / 100) * 15, 50);
    
    // Create nodes
    for (let i = 0; i < particlesCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    
    // Create connections
    for (let i = 0; i < particlesCount; i++) {
      const connectionsCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < connectionsCount; j++) {
        const target = Math.floor(Math.random() * particlesCount);
        if (i !== target) {
          connections.push({
            from: i,
            to: target,
            width: Math.random() * 0.5 + 0.2,
            alpha: Math.random() * 0.2 + 0.1,
            pulse: Math.random() > 0.7,
            pulseDirection: Math.random() > 0.5 ? 1 : -1,
            pulseAlpha: 0
          });
        }
      }
    }

    // Light particles (bokeh effect)
    const particles: {x: number, y: number, size: number, alpha: number, speed: number}[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.3 + 0.1
      });
    }
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = '#05152E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections with pulses
      connections.forEach(connection => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        
        if (connection.pulse) {
          connection.pulseAlpha += 0.01 * connection.pulseDirection;
          if (connection.pulseAlpha > 0.8 || connection.pulseAlpha < 0) {
            connection.pulseDirection *= -1;
          }
          
          ctx.strokeStyle = `rgba(0, 190, 255, ${connection.alpha + connection.pulseAlpha})`;
        } else {
          ctx.strokeStyle = `rgba(0, 190, 255, ${connection.alpha})`;
        }
        
        ctx.lineWidth = connection.width;
        ctx.stroke();
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
        ctx.fill();
        
        // Update node position
        node.y += node.speed;
        if (node.y > canvas.height + 10) {
          node.y = -10;
          node.x = Math.random() * canvas.width;
        }
      });
      
      // Draw light particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(147, 197, 253, ${particle.alpha})`);
        gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Update particle position
        particle.y += particle.speed;
        if (particle.y > canvas.height + particle.size) {
          particle.y = -particle.size;
          particle.x = Math.random() * canvas.width;
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="mission" className="py-24 relative overflow-hidden bg-[#020B18]">
      {/* Neural Network Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#000814]/50 to-[#011E3C]/50 backdrop-blur-[2px]"></div>
      
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
