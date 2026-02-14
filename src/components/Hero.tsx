import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Hero = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Staggered reveal stages
    const timers = [
      setTimeout(() => setStage(1), 200),   // logo
      setTimeout(() => setStage(2), 800),   // first line
      setTimeout(() => setStage(3), 1200),  // second line
      setTimeout(() => setStage(4), 1800),  // subtext
      setTimeout(() => setStage(5), 2200),  // line
      setTimeout(() => setStage(6), 2600),  // CTA
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center items-center pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden bg-background">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-10 sm:space-y-12 md:space-y-16">
          {/* Onigiri Logo — soft scale + rotate entrance */}
          <div
            className="transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: stage >= 1 ? 1 : 0,
              transform: stage >= 1 
                ? 'scale(1) translateY(0) rotate(0deg)' 
                : 'scale(1.1) translateY(15px) rotate(-2deg)',
              transitionDuration: '2000ms',
            }}
          >
            <img 
              src={onigiriLogo} 
              alt="shi-for" 
              className="h-24 sm:h-28 md:h-40 w-auto mx-auto drop-shadow-sm"
            />
          </div>
          
          {/* Statement headline — staggered line reveal */}
          <div className="overflow-hidden">
            <h1 className="font-display text-hero text-foreground font-light">
              <span
                className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: stage >= 2 ? 1 : 0,
                  transform: stage >= 2 ? 'translateY(0)' : 'translateY(100%)',
                  transitionDuration: '1400ms',
                }}
              >
                Purity. Precision.
              </span>
              <br />
              <em
                className="inline-block italic transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: stage >= 3 ? 1 : 0,
                  transform: stage >= 3 ? 'translateY(0)' : 'translateY(100%)',
                  transitionDuration: '1400ms',
                }}
              >
                Presence.
              </em>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className="text-label text-muted-foreground tracking-[0.3em] transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: stage >= 4 ? 1 : 0,
              transform: stage >= 4 ? 'translateY(0)' : 'translateY(20px)',
              transitionDuration: '1200ms',
            }}
          >
            White, perfected.
          </p>

          {/* Gold accent line */}
          <div className="flex justify-center">
            <div 
              className="h-px bg-accent transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: stage >= 5 ? '64px' : '0px',
                opacity: stage >= 5 ? 1 : 0,
                transitionDuration: '1200ms',
              }}
            />
          </div>

          {/* CTA */}
          <div
            className="pt-2 transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: stage >= 6 ? 1 : 0,
              transform: stage >= 6 ? 'translateY(0)' : 'translateY(20px)',
              transitionDuration: '1200ms',
            }}
          >
            <button 
              onClick={() => navigate('/shop')} 
              className="btn-primary active:scale-[0.97] transition-transform"
            >
              Shop
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all ease-out"
        style={{
          opacity: stage >= 6 ? 0.3 : 0,
          transitionDuration: '1500ms',
          transitionDelay: '500ms',
        }}
      >
        <div className="w-px h-10 bg-foreground/20 mx-auto mb-2 animate-pulse" />
        <p className="text-[8px] tracking-[0.4em] uppercase text-muted-foreground">Scroll</p>
      </div>
    </section>
  );
};

export default Hero;
