const lookbookImages = [
  { id: 1, size: "large" },
  { id: 2, size: "small" },
  { id: 3, size: "small" },
  { id: 4, size: "medium" },
  { id: 5, size: "medium" },
  { id: 6, size: "large" },
];

const Lookbook = () => {
  return (
    <section id="lookbook" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-body text-sm tracking-[0.3em] text-primary uppercase mb-4">
              Visual Story
            </p>
            <h2 className="heading-display text-5xl md:text-6xl">
              LOOKBOOK
            </h2>
          </div>
          <p className="font-body text-muted-foreground max-w-md">
            Raw visuals capturing the essence of urban destruction. Replace these placeholders with your brand shoot photos.
          </p>
        </div>

        {/* Lookbook Grid - Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {/* Large image 1 */}
          <div className="col-span-2 row-span-2 placeholder-box relative group overflow-hidden animate-fade-in">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 border-2 border-dashed border-muted-foreground/30 mb-4" />
              <span className="font-body text-xs tracking-[0.15em]">
                LOOKBOOK IMAGE SPACE
                <br />
                <span className="text-primary/70">Replace with Photos</span>
              </span>
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Small images */}
          <div className="placeholder-box relative group overflow-hidden animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-body text-[10px] tracking-widest text-center px-2">
                LOOKBOOK
                <br />
                IMAGE
              </span>
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="placeholder-box relative group overflow-hidden animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-body text-[10px] tracking-widest text-center px-2">
                LOOKBOOK
                <br />
                IMAGE
              </span>
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Medium images */}
          <div className="row-span-2 placeholder-box relative group overflow-hidden animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-10 h-10 border border-dashed border-muted-foreground/30 mb-3" />
              <span className="font-body text-[10px] tracking-widest">
                LOOKBOOK
                <br />
                IMAGE SPACE
              </span>
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="row-span-2 placeholder-box relative group overflow-hidden animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-10 h-10 border border-dashed border-muted-foreground/30 mb-3" />
              <span className="font-body text-[10px] tracking-widest">
                LOOKBOOK
                <br />
                IMAGE SPACE
              </span>
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Bottom large image */}
          <div className="col-span-2 row-span-2 placeholder-box relative group overflow-hidden animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 border-2 border-dashed border-muted-foreground/30 mb-4" />
              <span className="font-body text-xs tracking-[0.15em]">
                LOOKBOOK IMAGE SPACE
                <br />
                <span className="text-primary/70">Replace with Photos</span>
              </span>
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
