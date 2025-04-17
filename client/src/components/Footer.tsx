import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/newsletter/subscribe", { email });
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        variant: "default",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-dark pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 relative glow-effect">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full object-contain"
                  fill="white"
                >
                  <path d="M50 10 L75 25 L75 75 L50 90 L25 75 L25 25 Z" stroke="#00F5FF" strokeWidth="2" fill="none" />
                  <path d="M50 20 L70 35 V65 L50 80 L30 65 V35 Z" fill="white" />
                  <path d="M50 20 V80 M30 35 H70 M30 65 H70" stroke="#00F5FF" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-lg tracking-wider">CRUS<span className="text-primary">AI</span>DERS</h3>
              </div>
            </div>
            
            <p className="opacity-80 mb-4">Our mission is to democratize AI and ensure its ethical development for the benefit of humanity.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#mission" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Our Mission</a></li>
              <li><a href="#team" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Team</a></li>
              <li><a href="#projects" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#register" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Workshops</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Research Papers</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">AI Ethics Guidelines</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Open-source Projects</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-orbitron text-lg font-bold mb-4">Newsletter</h3>
            <p className="opacity-80 mb-4">Subscribe to our newsletter for updates on projects, workshops, and AI developments.</p>
            
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                className="w-full bg-highlight border border-highlight focus:border-primary rounded px-4 py-2 outline-none transition-colors" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2 font-orbitron text-sm uppercase tracking-widest bg-primary text-background rounded hover:bg-opacity-80 transition-all disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-highlight pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="opacity-60 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} CrusAIders. All rights reserved.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
