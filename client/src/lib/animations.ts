import { Variants } from "framer-motion";

// Fade in and slide up animation
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
    }
  }
};

// Fade in and slide in from left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
    }
  }
};

// Fade in and slide in from right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
    }
  }
};

// Staggered animations for cards with custom delay based on index
export const staggerCards: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    }
  }),
};

// Floating animation for the hero image
export const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

// Glow pulse animation
export const glowPulse: Variants = {
  initial: { 
    filter: "drop-shadow(0 0 2px #00F5FF) drop-shadow(0 0 5px #00F5FF)" 
  },
  animate: {
    filter: [
      "drop-shadow(0 0 2px #00F5FF) drop-shadow(0 0 5px #00F5FF)",
      "drop-shadow(0 0 5px #00F5FF) drop-shadow(0 0 10px #00F5FF) drop-shadow(0 0 15px #00F5FF)",
      "drop-shadow(0 0 2px #00F5FF) drop-shadow(0 0 5px #00F5FF)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    }
  }
};

// Scroll indicator animation
export const scrollIndicator: Variants = {
  initial: { y: 0, opacity: 0.5 },
  animate: {
    y: [0, 10, 0],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop",
    }
  }
};
