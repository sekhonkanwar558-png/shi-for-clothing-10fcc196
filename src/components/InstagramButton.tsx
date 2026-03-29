const InstagramButton = () => {
  const handleClick = () => {
    window.open("https://www.instagram.com/shiforyo", "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group"
      aria-label="Follow on Instagram"
    >
      <div className="relative p-3 sm:p-3.5 rounded-full bg-background/80 backdrop-blur-md border border-border/40 shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.1)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_8px_30px_-4px_hsl(var(--foreground)/0.15)] group-hover:border-accent/40 group-hover:scale-105 group-active:scale-95">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:w-5 sm:h-5 text-foreground/70 transition-colors duration-700 group-hover:text-accent"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </div>
    </button>
  );
};

export default InstagramButton;
