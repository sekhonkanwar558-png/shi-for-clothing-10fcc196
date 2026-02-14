import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShopifyCart from "./ShopifyCart";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-background/98 backdrop-blur-sm border-b border-foreground/5' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-60 transition-opacity duration-500 touch-manipulation"
        >
          <img src={onigiriLogo} alt="shi-for" className="h-9 sm:h-10 w-auto" />
          <span className="font-display text-xl sm:text-2xl text-foreground font-light tracking-[0.05em]">
            shi-for
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-14">
          <Link to="/shop" className="nav-link text-label">
            Shop
          </Link>
          <a href="#about" className="nav-link text-label">
            Philosophy
          </a>
          <ShopifyCart />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <ShopifyCart />
          <button
            className="p-2 text-foreground hover:opacity-60 transition-opacity duration-500 touch-manipulation"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`md:hidden fixed inset-0 top-[72px] bg-background z-40 transition-all duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 py-20 flex flex-col items-center gap-12">
          <Link
            to="/shop"
            className="font-display text-3xl text-foreground hover:text-accent transition-colors duration-500 touch-manipulation font-light tracking-[0.05em]"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <a
            href="#about"
            className="font-display text-3xl text-foreground hover:text-accent transition-colors duration-500 touch-manipulation font-light tracking-[0.05em]"
            onClick={() => setIsOpen(false)}
          >
            Philosophy
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
