import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-display text-4xl">DESTRUCTION</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium relaxed streetwear for those who break the ordinary. 
              Urban. Raw. Unapologetic.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h4 className="font-body text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#shop" className="font-body text-sm text-foreground hover:text-primary transition-colors">
                Shop
              </a>
              <a href="#lookbook" className="font-body text-sm text-foreground hover:text-primary transition-colors">
                Lookbook
              </a>
              <a href="#about" className="font-body text-sm text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="font-body text-sm text-foreground hover:text-primary transition-colors">
                Size Guide
              </a>
              <a href="#" className="font-body text-sm text-foreground hover:text-primary transition-colors">
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
                className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                aria-label="Twitter / X"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all font-display text-sm"
                aria-label="TikTok"
              >
                TT
              </a>
            </div>
            <div className="pt-4">
              <p className="font-body text-xs tracking-widest text-muted-foreground uppercase mb-2">
                Email
              </p>
              <a href="mailto:info@destruction.com" className="font-body text-sm text-foreground hover:text-primary transition-colors">
                info@destruction.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted-foreground tracking-widest">
            © 2024 DESTRUCTION. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
