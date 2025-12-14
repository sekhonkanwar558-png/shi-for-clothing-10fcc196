const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-display text-lg tracking-[0.15em] text-foreground">
            shi-for
          </p>
          <p className="font-body text-xs text-muted-foreground tracking-[0.1em] font-light">
            © 2024 shi-for. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
