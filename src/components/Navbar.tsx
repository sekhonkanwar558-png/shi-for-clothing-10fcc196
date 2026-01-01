import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShopifyCart from "./ShopifyCart";
import shiforLogo from "@/assets/shifor-logo.png";

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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when menu is open
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
      className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 safe-top ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm' 
          : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-70 transition-opacity touch-manipulation"
        >
          <img src={shiforLogo} alt="shi-for logo" className="h-6 sm:h-7 w-auto invert dark:invert-0" />
          <span className="font-display text-lg sm:text-xl tracking-tight text-foreground">
            shi-for
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/shop"
            className="nav-link text-micro font-medium"
          >
            Shop
          </Link>
          <ShopifyCart />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <ShopifyCart />
          <button
            className="p-2 text-foreground hover:text-muted-foreground transition-colors touch-manipulation"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`md:hidden fixed inset-0 top-[89px] bg-background z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 py-12 flex flex-col items-start gap-8">
          <Link
            to="/shop"
            className="font-display text-2xl text-foreground hover:text-muted-foreground transition-colors touch-manipulation"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;