const Footer = () => {
  return (
    <footer className="border-t border-border bg-background safe-bottom">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16 py-4 sm:py-5 flex items-center justify-between">
        <span className="text-[10px] sm:text-[11px] font-light tracking-[0.3em] uppercase text-muted-foreground">
          shi-for
        </span>
        <a
          href="https://www.instagram.com/shiforyo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Instagram"
          className="text-muted-foreground hover:text-foreground transition-colors duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
