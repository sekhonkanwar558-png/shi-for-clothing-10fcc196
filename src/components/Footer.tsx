import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="py-20 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <p className="font-display text-2xl tracking-[0.15em] text-foreground">
              shi-for
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs font-light">
              Pure white t-shirts. Premium quality fabrics. Minimal design.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h4 className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Navigate
            </h4>
            <div className="flex flex-col gap-4">
              <a href="#shop" className="font-body text-sm text-foreground hover:text-muted-foreground transition-colors font-light">
                Shop
              </a>
              <a href="#about" className="font-body text-sm text-foreground hover:text-muted-foreground transition-colors font-light">
                About
              </a>
              <a href="#" className="font-body text-sm text-foreground hover:text-muted-foreground transition-colors font-light">
                Size Guide
              </a>
              <a href="#" className="font-body text-sm text-foreground hover:text-muted-foreground transition-colors font-light">
                Shipping & Returns
              </a>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-6">
            <h4 className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                aria-label="Twitter / X"
              >
                <Twitter size={18} />
              </a>
            </div>
            <div className="pt-4">
              <p className="font-body text-xs tracking-[0.2em] text-muted-foreground uppercase mb-2">
                Email
              </p>
              <a href="mailto:hello@shi-for.com" className="font-body text-sm text-foreground hover:text-muted-foreground transition-colors font-light">
                hello@shi-for.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground tracking-[0.15em] font-light">
            © 2024 shi-for. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors font-light">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors font-light">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
