import shiforLogo from "@/assets/shifor-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 sm:py-16 border-t border-border bg-background safe-bottom">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Left-aligned layout */}
          <div className="flex flex-col gap-8">
            {/* Logo */}
            <Link 
              to="/"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity touch-manipulation w-fit"
            >
              <img 
                src={shiforLogo} 
                alt="shi-for logo" 
                className="h-10 sm:h-12 w-auto invert dark:invert-0" 
              />
              <span className="font-display text-xl sm:text-2xl tracking-tight text-foreground">
                shi-for
              </span>
            </Link>
            
            {/* Links */}
            <div className="flex flex-wrap gap-6 sm:gap-8">
              <Link 
                to="/shop"
                className="nav-link text-micro"
              >
                Shop
              </Link>
              <a 
                href="#about"
                className="nav-link text-micro"
              >
                About
              </a>
            </div>
            
            {/* Copyright */}
            <p className="text-micro text-muted-foreground font-light pt-4">
              © {new Date().getFullYear()} shi-for. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;