import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShopifyCart from "./ShopifyCart";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    if (location.pathname === '/' && location.state?.scrollTo === 'philosophy') {
      setTimeout(() => {
        document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      window.history.replaceState({}, '');
    }
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
          <button
            className="nav-link text-label tracking-[0.2em]"
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/', { state: { scrollTo: 'philosophy' } });
              } else {
                document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Philosophy
          </button>
          <ShopifyCart />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <ShopifyCart />
          <button
            className="relative w-11 h-11 flex items-center justify-center text-foreground hover:opacity-60 transition-all duration-500 touch-manipulation active:scale-[0.92]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="relative w-[20px] h-[14px]">
              <span 
                className={`absolute left-0 w-full h-[1.2px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`} 
              />
              <span 
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.2px] bg-foreground transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`} 
              />
              <span 
                className={`absolute left-0 w-full h-[1.2px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-[60] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-foreground/10 backdrop-blur-md transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Card */}
        <div className="absolute inset-0 flex items-start justify-center pt-[28vh]">
          <div 
            className={`bg-background border border-foreground/6 shadow-[0_12px_48px_-12px_hsl(var(--foreground)/0.12)] w-[78vw] max-w-xs transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-4 scale-[0.97]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-6 pb-4">
              <span className="text-[10px] font-light tracking-[0.25em] uppercase text-muted-foreground">
                Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300 touch-manipulation"
                aria-label="Close menu"
              >
                <X size={16} strokeWidth={1.3} />
              </button>
            </div>

            {/* Links */}
            <nav className="px-7 pb-6">
              <Link
                to="/shop"
                className="block py-4 text-[13px] font-light text-foreground tracking-[0.2em] uppercase border-t border-foreground/6 hover:text-accent hover:tracking-[0.25em] transition-all duration-500 touch-manipulation"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s, color 0.5s, letter-spacing 0.5s',
                }}
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <button
                className="block w-full py-4 text-[13px] font-light text-foreground tracking-[0.2em] uppercase text-left border-t border-foreground/6 hover:text-accent hover:tracking-[0.25em] transition-all duration-500 touch-manipulation"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s, color 0.5s, letter-spacing 0.5s',
                }}
                onClick={() => {
                  setIsOpen(false);
                  if (location.pathname !== '/') {
                    navigate('/', { state: { scrollTo: 'philosophy' } });
                  } else {
                    document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Philosophy
              </button>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
