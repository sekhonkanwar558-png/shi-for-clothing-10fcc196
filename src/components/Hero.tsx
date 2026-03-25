import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Hero = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 1500),
      setTimeout(() => setStage(4), 2200),
      setTimeout(() => setStage(5), 2800),
      setTimeout(() => setStage(6), 3300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center items-center pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden bg-background grain-overlay">
      {/* Ambient decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-1/4 left-8 sm:left-16 w-px h-32 sm:h-48 transition-all duration-[3000ms] ease-out"
          style={{
            background: 'linear-gradient(180deg, transparent, hsl(var(--accent) / 0.15), transparent)',
            opacity: stage >= 4 ? 1 : 0,
            transform: stage >= 4 ? 'scaleY(1)' : 'scaleY(0)',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-8 sm:right-16 w-px h-24 sm:h-40 transition-all duration-[3000ms] ease-out"
          style={{
            background: 'linear-gradient(180deg, transparent, hsl(var(--accent) / 0.1), transparent)',
            opacity: stage >= 5 ? 1 : 0,
            transform: stage >= 5 ? 'scaleY(1)' : 'scaleY(0)',
            transitionDelay: '400ms',
          }}
        />
        {/* Floating dot accents */}
        <div 
          className="absolute top-[20%] right-[15%] w-1 h-1 rounded-full bg-accent/20 animate-float"
          style={{ animationDelay: '0s', opacity: stage >= 3 ? 1 : 0, transition: 'opacity 2s' }}
        />
        <div 
          className="absolute bottom-[25%] left-[12%] w-1.5 h-1.5 rounded-full bg-accent/15 animate-float"
          style={{ animationDelay: '2s', opacity: stage >= 4 ? 1 : 0, transition: 'opacity 2s' }}
        />
        <div 
          className="absolute top-[60%] right-[25%] w-0.5 h-0.5 rounded-full bg-accent/25 animate-float"
          style={{ animationDelay: '4s', opacity: stage >= 5 ? 1 : 0, transition: 'opacity 2s' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-10 sm:space-y-12 md:space-y-16">
          {/* Onigiri Logo — soft scale + float entrance */}
          <div
            className="transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: stage >= 1 ? 1 : 0,
              transform: stage >= 1 
                ? 'scale(1) translateY(0) rotate(0deg)' 
                : 'scale(1.15) translateY(25px) rotate(-3deg)',
              transitionDuration: '2400ms',
              filter: stage >= 1 ? 'blur(0px)' : 'blur(4px)',
            }}
          >
            <img 
              src={onigiriLogo} 
              alt="shi-for" 
              className="h-24 sm:h-28 md:h-40 w-auto mx-auto drop-shadow-sm"
            />
          </div>
          
          {/* Statement headline — clip reveal */}
          <div className="overflow-hidden">
            <h1 className="font-display text-hero text-foreground font-light">
              <span
                className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: stage >= 2 ? 1 : 0,
                  transform: stage >= 2 ? 'translateY(0)' : 'translateY(110%)',
                  transitionDuration: '1600ms',
                  filter: stage >= 2 ? 'blur(0px)' : 'blur(2px)',
                }}
              >
                Purity. Precision.
              </span>
              <br />
              <em
                className="inline-block italic transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: stage >= 3 ? 1 : 0,
                  transform: stage >= 3 ? 'translateY(0)' : 'translateY(110%)',
                  transitionDuration: '1600ms',
                  filter: stage >= 3 ? 'blur(0px)' : 'blur(2px)',
                }}
              >
                Presence.
              </em>
            </h1>
          </div>

          {/* Subtext with shimmer */}
          <p
            className="text-label text-muted-foreground tracking-[0.35em] transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: stage >= 4 ? 1 : 0,
              transform: stage >= 4 ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.98)',
              transitionDuration: '1400ms',
            }}
          >
            White, perfected.
          </p>

          {/* Gold accent line — animated expand */}
          <div className="flex justify-center">
            <div 
              className="h-px transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: stage >= 5 ? '80px' : '0px',
                opacity: stage >= 5 ? 1 : 0,
                transitionDuration: '1400ms',
                background: 'linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)',
              }}
            />
          </div>

          {/* CTA */}
          <div
            className="pt-2 transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: stage >= 6 ? 1 : 0,
              transform: stage >= 6 ? 'translateY(0)' : 'translateY(25px)',
              transitionDuration: '1400ms',
            }}
          >
            <button 
              onClick={() => navigate('/shop')} 
              className="btn-primary active:scale-[0.97] transition-transform"
            >
              <span>Shop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all ease-out"
        style={{
          opacity: stage >= 6 ? 0.4 : 0,
          transitionDuration: '2000ms',
          transitionDelay: '600ms',
        }}
      >
        <div className="w-px h-12 animate-pulse-soft" style={{ background: 'linear-gradient(180deg, hsl(var(--foreground) / 0.3), transparent)' }} />
        <p className="text-[7px] tracking-[0.5em] uppercase text-muted-foreground font-light">Scroll</p>
      </div>
    </section>
  );
};

export default Hero;
