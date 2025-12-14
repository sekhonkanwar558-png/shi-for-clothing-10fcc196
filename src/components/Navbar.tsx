import { Menu, X } from "lucide-react";
import { useState } from "react";
import ShopifyCart from "./ShopifyCart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "SHOP", href: "#shop" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-xl tracking-[0.15em] text-foreground hover:opacity-70 transition-opacity"
        >
          shi-for
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ShopifyCart />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <ShopifyCart />
          <button
            className="text-foreground hover:text-muted-foreground transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
