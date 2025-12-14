const Footer = () => {
  return (
    <footer className="py-10 sm:py-12 border-t border-border bg-background safe-bottom">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <a 
            href="#"
            className="font-display text-base sm:text-lg tracking-[0.15em] text-foreground hover:opacity-70 transition-opacity touch-manipulation"
          >
            shi-for
          </a>
          <p className="font-body text-[10px] sm:text-xs text-muted-foreground tracking-[0.1em] font-light text-center">
            © {new Date().getFullYear()} shi-for. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;