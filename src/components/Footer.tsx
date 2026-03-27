import onigiriLogo from "@/assets/onigiri-logo.png";
import { Link } from "react-router-dom";
import { Reveal } from "@/hooks/useScrollReveal";

const Footer = () => {
  return (
    <footer className="py-10 sm:py-14 border-t-4 border-dashed border-primary bg-card safe-bottom"
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--accent) / 0.1) 10px, hsl(var(--accent) / 0.1) 20px)',
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 lg:px-16">
        <Reveal>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <Link 
              to="/"
              className="inline-flex flex-col items-center gap-3 hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src={onigiriLogo} 
                alt="shi-for" 
                className="h-14 sm:h-16 md:h-20 w-auto animate-rainbow" 
                style={{ animation: 'wobble 0.6s ease-in-out infinite alternate, rainbow 2s linear infinite' }}
              />
              <span className="text-2xl sm:text-3xl tracking-widest text-foreground font-bold"
                style={{ fontFamily: "'Bungee Shade', cursive", textShadow: '2px 2px 0px hsl(var(--primary))' }}
              >
                shi-for
              </span>
            </Link>

            <p className="text-lg text-primary font-bold animate-blink">
              💎 "Wear the calm." 💎
            </p>
            
            <div className="w-32 h-1 mx-auto"
              style={{ background: 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)' }}
            />
            
            <div className="flex justify-center gap-6">
              <Link to="/shop" className="nav-link text-label tracking-widest text-lg font-bold">
                🛒 Shop
              </Link>
              <a href="#about" className="nav-link text-label tracking-widest text-lg font-bold">
                📖 Philosophy
              </a>
            </div>
            
            <p className="text-sm text-foreground font-bold pt-4"
              style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem' }}
            >
              © {new Date().getFullYear()} shi-for ★ All rights reserved ★ Best T-shirts EVER!!!
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;
