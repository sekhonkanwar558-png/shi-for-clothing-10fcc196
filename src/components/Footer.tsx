import onigiriLogo from "@/assets/onigiri-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 sm:py-24 border-t border-border bg-background safe-bottom">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Logo */}
          <Link 
            to="/"
            className="inline-flex flex-col items-center gap-4 hover:opacity-60 transition-opacity duration-500 touch-manipulation"
          >
            <img 
              src={onigiriLogo} 
              alt="shi-for" 
              className="h-12 sm:h-14 w-auto" 
            />
            <span className="font-display text-xl tracking-wide text-foreground font-light">
              shi-for
            </span>
          </Link>

          {/* Philosophy line */}
          <p className="font-display text-base sm:text-lg text-muted-foreground font-light italic max-w-md mx-auto">
            "Wear the calm."
          </p>
          
          <div className="accent-line mx-auto" />
          
          {/* Links */}
          <div className="flex justify-center gap-10">
            <Link 
              to="/shop"
              className="nav-link text-label"
            >
              Shop
            </Link>
            <a 
              href="#about"
              className="nav-link text-label"
            >
              Philosophy
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-micro text-muted-foreground pt-6">
            © {new Date().getFullYear()} shi-for. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
