import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Close mobile menu when the location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative z-50 py-4">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 relative glow-effect">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full object-contain animate-pulse-slow"
                  fill="white"
                >
                  <path d="M50 10 L75 25 L75 75 L50 90 L25 75 L25 25 Z" stroke="#00F5FF" strokeWidth="2" fill="none" />
                  <path d="M50 20 L70 35 V65 L50 80 L30 65 V35 Z" fill="white" />
                  <path d="M50 20 V80 M30 35 H70 M30 65 H70" stroke="#00F5FF" strokeWidth="1" />
                  {/* Circuit lines radiating out */}
                  <g stroke="#00F5FF" strokeWidth="1">
                    <path d="M80 30 L95 25" />
                    <path d="M80 40 L95 40" />
                    <path d="M80 50 L95 55" />
                    <path d="M80 60 L95 65" />
                    <path d="M80 70 L95 75" />
                    <path d="M20 30 L5 25" />
                    <path d="M20 40 L5 40" />
                    <path d="M20 50 L5 55" />
                    <path d="M20 60 L5 65" />
                    <path d="M20 70 L5 75" />
                  </g>
                  {/* Circuit dots */}
                  <g fill="#00F5FF">
                    <circle cx="95" cy="25" r="2" className="animate-pulse" />
                    <circle cx="95" cy="40" r="2" className="animate-pulse" />
                    <circle cx="95" cy="55" r="2" className="animate-pulse" />
                    <circle cx="95" cy="65" r="2" className="animate-pulse" />
                    <circle cx="95" cy="75" r="2" className="animate-pulse" />
                    <circle cx="5" cy="25" r="2" className="animate-pulse" />
                    <circle cx="5" cy="40" r="2" className="animate-pulse" />
                    <circle cx="5" cy="55" r="2" className="animate-pulse" />
                    <circle cx="5" cy="65" r="2" className="animate-pulse" />
                    <circle cx="5" cy="75" r="2" className="animate-pulse" />
                  </g>
                </svg>
              </div>
              <div>
                <h1 className="font-orbitron font-bold text-xl lg:text-2xl tracking-wider">CRUS<span className="text-primary">AI</span>DERS</h1>
                <p className="text-xs text-primary font-light tracking-wider">ON A QUEST TO DEMOCRATIZE AI</p>
              </div>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#mission" className="nav-item font-orbitron text-sm uppercase tracking-wider transition-colors hover:text-primary">Mission</a>
            <a href="#team" className="nav-item font-orbitron text-sm uppercase tracking-wider transition-colors hover:text-primary">Team</a>
            <a href="#projects" className="nav-item font-orbitron text-sm uppercase tracking-wider transition-colors hover:text-primary">Projects</a>
            <a href="#contact" className="nav-item font-orbitron text-sm uppercase tracking-wider transition-colors hover:text-primary">Contact</a>
            <a href="#register" className="relative px-6 py-2 font-orbitron text-sm uppercase tracking-wider bg-primary text-background rounded-sm hover:bg-opacity-80 transition-all overflow-hidden animated-gradient">
              Register
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            aria-label="Toggle menu"
            className="lg:hidden text-white focus:outline-none" 
            onClick={toggleMenu}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`mobile-menu fixed top-0 left-0 h-full w-64 bg-dark z-50 shadow-lg pt-20 px-6 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button 
          aria-label="Close menu"
          className="absolute top-4 right-4 text-white focus:outline-none" 
          onClick={toggleMenu}
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        <div className="flex flex-col space-y-6">
          <a href="#mission" onClick={toggleMenu} className="font-orbitron text-sm uppercase tracking-wider transition-colors hover:text-primary">Mission</a>
          <a href="#team" onClick={toggleMenu} className="font-orbitron text-sm uppercase tracking-wider transition-colors hover:text-primary">Team</a>
          <a href="#projects" onClick={toggleMenu} className="font-orbitron text-sm uppercase tracking-wider transition-colors hover:text-primary">Projects</a>
          <a href="#contact" onClick={toggleMenu} className="font-orbitron text-sm uppercase tracking-wider transition-colors hover:text-primary">Contact</a>
          <a href="#register" onClick={toggleMenu} className="px-6 py-2 font-orbitron text-center text-sm uppercase tracking-wider bg-primary text-background rounded-sm hover:bg-opacity-80 transition-all">Register</a>
        </div>
      </div>
    </header>
  );
}
