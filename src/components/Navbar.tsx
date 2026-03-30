import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShopifyCart from "./ShopifyCart";

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
    if (location.pathname === '/' && location.state?.scrollTo) {
      const target = location.state.scrollTo;
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      window.history.replaceState({}, '');
    }
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

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'Shop', action: () => { setIsOpen(false); navigate('/shop'); } },
    { label: 'Philosophy', action: () => scrollToSection('philosophy') },
    { label: 'About', action: () => scrollToSection('about') },
  ];

  return (
    <>
      {/* Desktop Navigation — slim, centered wordmark, evenly spaced links */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-background/98 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          transitionDuration: '1200ms',
        }}
      >
        <div className="container mx-auto px-8 lg:px-16 py-5 flex items-center justify-center relative">
          {/* Left links */}
          <div className="absolute left-8 lg:left-16 flex items-center gap-10 lg:gap-14">
            <Link to="/shop" className="text-[10px] font-light tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-500">
              Shop
            </Link>
            <button
              onClick={() => scrollToSection('philosophy')}
              className="text-[10px] font-light tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
              Philosophy
            </button>
          </div>

          {/* Centered wordmark */}
          <Link
            to="/"
            className="font-display text-xl lg:text-2xl text-foreground font-light tracking-[0.08em] hover:opacity-60 transition-opacity duration-700"
          >
            shi-for
          </Link>

          {/* Right links */}
          <div className="absolute right-8 lg:right-16 flex items-center gap-10 lg:gap-14">
            <button
              onClick={() => scrollToSection('about')}
              className="text-[10px] font-light tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
            >
              About
            </button>
            <ShopifyCart />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Bar */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-background/98 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          transitionDuration: '1200ms',
        }}
      >
        <div className="px-5 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-lg text-foreground font-light tracking-[0.05em] hover:opacity-60 transition-opacity duration-700"
          >
            shi-for
          </Link>

          <div className="flex items-center gap-4">
            <ShopifyCart />
            <button
              className="relative w-10 h-10 flex items-center justify-center text-foreground touch-manipulation active:scale-[0.92]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="relative w-[18px] h-[12px]">
                <span
                  className={`absolute left-0 w-full h-[1px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-foreground transition-all duration-300 ${
                    isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-[1px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: '#F5F2EE' }}
      >
        {/* Close button — thin × top right */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors duration-500 touch-manipulation z-10"
          aria-label="Close menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="0.8">
            <line x1="1" y1="1" x2="17" y2="17" />
            <line x1="17" y1="1" x2="1" y2="17" />
          </svg>
        </button>

        {/* Centered menu items */}
        <div className="h-full flex flex-col items-center justify-center gap-0">
          {menuItems.map((item, i) => (
            <div key={item.label} className="flex flex-col items-center">
              {i > 0 && (
                <div
                  className="w-8 h-px mb-1"
                  style={{
                    backgroundColor: 'hsl(var(--accent))',
                    opacity: isOpen ? 0.5 : 0,
                    transition: `opacity 0.8s ease ${0.3 + i * 0.15}s`,
                  }}
                />
              )}
              <button
                onClick={item.action}
                className="font-display text-2xl font-light text-foreground/80 hover:text-foreground tracking-[0.04em] py-5 transition-colors duration-500 touch-manipulation"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.8s ease ${0.2 + i * 0.15}s, transform 0.8s ease ${0.2 + i * 0.15}s, color 0.5s`,
                }}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
