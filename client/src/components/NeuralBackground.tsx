import { useRef, useEffect } from "react";

interface NeuralBackgroundProps {
  opacity?: number;
  color?: string;
  particleDensity?: number;
}

export default function NeuralBackground({ 
  opacity = 0.9, 
  color = '#00BFFF', 
  particleDensity = 15 
}: NeuralBackgroundProps) {
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

    // Determine particles count based on screen size and density
    const particlesCount = Math.min(Math.floor(canvas.width / 100) * particleDensity, 50);
    
    // Nodes and connections
    const nodes: {x: number, y: number, radius: number, speed: number}[] = [];
    const connections: {from: number, to: number, width: number, alpha: number, pulse: boolean, pulseDirection: number, pulseAlpha: number}[] = [];
    
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
    for (let i = 0; i < particlesCount / 2; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.3 + 0.1
      });
    }
    
    // Color parsing helper
    const parseColor = (colorStr: string): {r: number, g: number, b: number} => {
      // Default
      let r = 0, g = 190, b = 255;
      
      if (colorStr.startsWith('#')) {
        if (colorStr.length === 4) {
          r = parseInt(colorStr[1] + colorStr[1], 16);
          g = parseInt(colorStr[2] + colorStr[2], 16);
          b = parseInt(colorStr[3] + colorStr[3], 16);
        } else if (colorStr.length === 7) {
          r = parseInt(colorStr.substring(1, 3), 16);
          g = parseInt(colorStr.substring(3, 5), 16);
          b = parseInt(colorStr.substring(5, 7), 16);
        }
      }
      
      return { r, g, b };
    };
    
    const colorRGB = parseColor(color);
    
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
          
          ctx.strokeStyle = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${connection.alpha + connection.pulseAlpha})`;
        } else {
          ctx.strokeStyle = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${connection.alpha})`;
        }
        
        ctx.lineWidth = connection.width;
        ctx.stroke();
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, 0.8)`;
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
        gradient.addColorStop(0, `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${particle.alpha})`);
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
  }, [color, particleDensity]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000814]/50 to-[#011E3C]/50 backdrop-blur-[2px]"></div>
    </>
  );
}