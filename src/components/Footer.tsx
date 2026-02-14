import onigiriLogo from "@/assets/onigiri-logo.png";
import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  return (
    <footer className="py-16 sm:py-20 md:py-28 border-t border-border bg-background safe-bottom">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
            {/* Logo */}
            <Link 
              to="/"
              className="inline-flex flex-col items-center gap-4 sm:gap-5 hover:opacity-60 transition-opacity duration-700 touch-manipulation"
            >
              <img 
                src={onigiriLogo} 
                alt="shi-for" 
                className="h-12 sm:h-14 md:h-16 w-auto" 
              />
              <span className="font-display text-xl sm:text-2xl tracking-[0.05em] text-foreground font-light">
                shi-for
              </span>
            </Link>

            {/* Philosophy line */}
            <p className="font-display text-base sm:text-lg md:text-xl text-muted-foreground font-light italic max-w-md mx-auto tracking-[0.02em]">
              "Wear the calm."
            </p>
            
            <div className="w-12 h-px bg-accent mx-auto" />
            
            {/* Links */}
            <div className="flex justify-center gap-10 sm:gap-12">
              <Link to="/shop" className="nav-link text-label tracking-[0.3em]">
                Shop
              </Link>
              <a href="#about" className="nav-link text-label tracking-[0.3em]">
                Philosophy
              </a>
            </div>
            
            {/* Copyright */}
            <p className="text-micro text-muted-foreground pt-6 sm:pt-8 tracking-[0.05em]">
              © {new Date().getFullYear()} shi-for. All rights reserved.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
