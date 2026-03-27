import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ShopifyCart from "./ShopifyCart";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-card border-b-4 border-dashed border-primary' 
          : 'bg-background border-b-4 border-dotted border-accent'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 lg:px-16 py-3 sm:py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
        >
          <img src={onigiriLogo} alt="shi-for" className="h-10 sm:h-12 md:h-14 w-auto"
            style={{ animation: 'wobble 0.5s ease-in-out infinite alternate' }}
          />
          <span className="text-xl sm:text-2xl md:text-3xl text-foreground font-bold tracking-widest"
            style={{ fontFamily: "'Bungee Shade', cursive", textShadow: '2px 2px 0px hsl(var(--primary))' }}
          >
            shi-for
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/shop" className="nav-link text-label tracking-widest font-bold text-lg">
            🛒 Shop
          </Link>
          <a href="/#about" className="nav-link text-label tracking-widest font-bold text-lg">
            📖 Philosophy
          </a>
          <ShopifyCart />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ShopifyCart />
          <button
            className="p-2 text-foreground hover:text-primary transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
          </button>
        </div>
      </div>

      <div 
        className={`md:hidden fixed inset-0 top-[72px] bg-card z-40 transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, hsl(var(--primary) / 0.05) 20px, hsl(var(--primary) / 0.05) 40px)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
          <Link
            to="/shop"
            className="text-3xl text-foreground font-bold tracking-widest"
            onClick={() => setIsOpen(false)}
            style={{ fontFamily: "'Bungee Shade', cursive", textShadow: '2px 2px 0px hsl(var(--primary))' }}
          >
            🛒 SHOP
          </Link>
          <a
            href="/#about"
            className="text-3xl text-foreground font-bold tracking-widest"
            onClick={() => setIsOpen(false)}
            style={{ fontFamily: "'Bungee Shade', cursive", textShadow: '2px 2px 0px hsl(var(--accent))' }}
          >
            📖 PHILOSOPHY
          </a>
          <div className="w-24 h-1"
            style={{ background: 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)' }}
          />
          <p className="text-sm font-bold text-primary animate-blink">
            💎 Wear the calm. 💎
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
