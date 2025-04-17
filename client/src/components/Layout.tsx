import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const handleScroll = () => {
      // Add circuit overlay animation
      const circuitOverlay = document.querySelector(".circuit-overlay");
      if (circuitOverlay) {
        const scrollPosition = window.scrollY;
        circuitOverlay.setAttribute(
          "style",
          `background-position: ${scrollPosition * 0.1}px ${scrollPosition * 0.1}px`
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-rajdhani text-white overflow-x-hidden">
      <div className="circuit-overlay fixed inset-0 pointer-events-none z-0"></div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
