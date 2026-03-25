const InstagramButton = () => {
  const handleClick = () => {
    window.open("https://www.instagram.com/shi.for_", "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-6 sm:bottom-[5.5rem] sm:right-8 z-50 bg-foreground text-background p-3.5 sm:p-4 shadow-md hover:shadow-lg transition-all duration-700 hover:scale-105 active:scale-95 touch-manipulation"
      aria-label="Follow on Instagram"
      style={{ borderRadius: '50%' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sm:w-[22px] sm:h-[22px]"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    </button>
  );
};

export default InstagramButton;
