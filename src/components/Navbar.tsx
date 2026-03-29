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
    // Handle scroll-to-philosophy after navigating from another page
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
          className="md:hidden fixed inset-0 z-[60] bg-foreground/10 backdrop-blur-md flex items-start justify-center pt-[28vh]"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-background border border-foreground/6 shadow-[0_12px_48px_-12px_hsl(var(--foreground)/0.12)] w-[78vw] max-w-xs px-7 pt-6 pb-5 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end mb-5">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-foreground/40 hover:text-foreground transition-colors duration-300 touch-manipulation"
                aria-label="Close menu"
              >
                <X size={18} strokeWidth={1.3} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col">
              <Link
                to="/shop"
                className="py-4 text-[13px] font-light text-foreground tracking-[0.2em] uppercase border-b border-foreground/6 hover:text-accent hover:tracking-[0.25em] transition-all duration-500 touch-manipulation"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <button
                className="py-4 text-[13px] font-light text-foreground tracking-[0.2em] uppercase text-left hover:text-accent hover:tracking-[0.25em] transition-all duration-500 touch-manipulation"
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
      )}
    </nav>
  );
};

export default Navbar;
