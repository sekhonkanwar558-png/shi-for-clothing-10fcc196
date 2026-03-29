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
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled 
          ? 'bg-background/98 backdrop-blur-sm border-b border-foreground/5' 
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
        transitionDuration: '1200ms',
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 lg:px-16 py-4 sm:py-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 hover:opacity-60 transition-opacity duration-700 touch-manipulation active:scale-[0.97]"
        >
          <img src={onigiriLogo} alt="shi-for" className="h-8 sm:h-9 md:h-10 w-auto" />
          <span className="font-display text-lg sm:text-xl md:text-2xl text-foreground font-light tracking-[0.05em]">
            shi-for
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12 lg:gap-14">
          <Link to="/shop" className="nav-link text-label tracking-[0.2em]">
            Shop
          </Link>
          <a href="/#philosophy" className="nav-link text-label tracking-[0.2em]">
            Philosophy
          </a>
          <ShopifyCart />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <ShopifyCart />
          <button
            className="p-2 text-foreground hover:opacity-60 transition-opacity duration-500 touch-manipulation active:scale-[0.94]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-background rounded-none shadow-[0_8px_40px_-8px_hsl(var(--foreground)/0.15)] w-[85vw] max-w-sm px-8 py-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-light tracking-[0.15em] text-foreground/70 uppercase">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-foreground/50 hover:text-foreground transition-colors duration-300 touch-manipulation"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.2} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-0 border-t border-foreground/8">
              <Link
                to="/shop"
                className="py-4 text-[15px] font-normal text-foreground tracking-[0.08em] border-b border-foreground/8 hover:text-accent transition-colors duration-500 touch-manipulation"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <a
                href="/#philosophy"
                className="py-4 text-[15px] font-normal text-foreground tracking-[0.08em] border-b border-foreground/8 hover:text-accent transition-colors duration-500 touch-manipulation"
                onClick={() => setIsOpen(false)}
              >
                Philosophy
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
