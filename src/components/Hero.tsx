import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Hero = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-20 overflow-hidden bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-12 md:space-y-16">
          {/* Onigiri Logo — soft scale entrance */}
          <div
            className="transition-all duration-[1800ms] ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scale(1) translateY(0)' : 'scale(1.08) translateY(10px)',
            }}
          >
            <img 
              src={onigiriLogo} 
              alt="shi-for" 
              className="h-28 md:h-40 w-auto mx-auto"
            />
          </div>
          
          {/* Statement headline — staggered word reveal */}
          <div className="space-y-0">
            <h1 className="font-display text-hero text-foreground font-light">
              <span
                className="inline-block transition-all duration-[1400ms] ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: '400ms',
                }}
              >
                Purity. Precision.
              </span>
              <br />
              <em
                className="inline-block italic transition-all duration-[1400ms] ease-out"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: '700ms',
                }}
              >
                Presence.
              </em>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className="text-label text-muted-foreground tracking-[0.3em] transition-all duration-[1200ms] ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '1000ms',
            }}
          >
            White, perfected.
          </p>

          {/* Gold accent line */}
          <div
            className="flex justify-center transition-all duration-[1200ms] ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '1200ms',
            }}
          >
            <div className="w-16 h-px bg-accent" />
          </div>

          {/* CTA */}
          <div
            className="pt-2 transition-all duration-[1200ms] ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '1400ms',
            }}
          >
            <button 
              onClick={() => navigate('/shop')} 
              className="btn-primary"
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
