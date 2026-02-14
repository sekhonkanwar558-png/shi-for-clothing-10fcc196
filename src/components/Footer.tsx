import onigiriLogo from "@/assets/onigiri-logo.png";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer className="py-20 sm:py-28 border-t border-border bg-background safe-bottom">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16">
        <div
          ref={ref}
          className="max-w-5xl mx-auto text-center space-y-12 transition-all duration-[1400ms] ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          {/* Logo */}
          <Link 
            to="/"
            className="inline-flex flex-col items-center gap-5 hover:opacity-60 transition-opacity duration-700 touch-manipulation"
          >
            <img 
              src={onigiriLogo} 
              alt="shi-for" 
              className="h-14 sm:h-16 w-auto" 
            />
            <span className="font-display text-2xl tracking-[0.05em] text-foreground font-light">
              shi-for
            </span>
          </Link>

          {/* Philosophy line */}
          <p className="font-display text-lg sm:text-xl text-muted-foreground font-light italic max-w-md mx-auto tracking-[0.02em]">
            "Wear the calm."
          </p>
          
          <div className="w-12 h-px bg-accent mx-auto" />
          
          {/* Links */}
          <div className="flex justify-center gap-12">
            <Link to="/shop" className="nav-link text-label tracking-[0.3em]">
              Shop
            </Link>
            <a href="#about" className="nav-link text-label tracking-[0.3em]">
              Philosophy
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-micro text-muted-foreground pt-8 tracking-[0.05em]">
            © {new Date().getFullYear()} shi-for. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
