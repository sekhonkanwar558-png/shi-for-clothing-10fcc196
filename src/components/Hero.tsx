import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Hero = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => setStage(2), 200),
      setTimeout(() => setStage(3), 300),
      setTimeout(() => setStage(4), 400),
      setTimeout(() => setStage(5), 500),
      setTimeout(() => setStage(6), 600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center items-center pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden bg-background"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, hsl(0 100% 50% / 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, hsl(120 100% 50% / 0.3) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, hsl(240 100% 50% / 0.2) 0%, transparent 60%)
        `
      }}
    >
      {/* Spinning stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl sm:text-4xl animate-rainbow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 3}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {['⭐', '✨', '💫', '🌟', '🔥', '💀', '🤡'][i % 7]}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Logo — spinning entrance */}
          <div
            className="animate-rainbow"
            style={{
              opacity: stage >= 1 ? 1 : 0,
              transform: stage >= 1 ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(720deg)',
              transition: 'all 0.3s ease-out',
            }}
          >
            <img 
              src={onigiriLogo} 
              alt="shi-for" 
              className="h-32 sm:h-40 md:h-52 w-auto mx-auto drop-shadow-lg"
              style={{
                filter: 'drop-shadow(5px 5px 0px hsl(0 100% 50%)) drop-shadow(-5px -5px 0px hsl(120 100% 50%))',
                animation: 'wobble 0.5s ease-in-out infinite alternate',
              }}
            />
          </div>
          
          {/* Headline */}
          <div>
            <h1 className="text-hero text-foreground animate-rainbow"
              style={{ opacity: stage >= 2 ? 1 : 0 }}
            >
              <span className="inline-block" style={{ transform: 'rotate(-3deg)' }}>
                Purity.
              </span>{' '}
              <span className="inline-block" style={{ transform: 'rotate(2deg)', color: 'hsl(var(--primary))' }}>
                Precision.
              </span>
              <br />
              <span className="inline-block animate-blink" style={{ transform: 'rotate(-1deg)', color: 'hsl(var(--accent))' }}>
                Presence.
              </span>
            </h1>
          </div>

          {/* Subtext */}
          <p
            className="text-lg font-bold text-primary tracking-widest"
            style={{
              opacity: stage >= 4 ? 1 : 0,
              textShadow: '2px 2px 0px hsl(var(--accent))',
              animation: 'wobble 0.3s ease-in-out infinite alternate',
            }}
          >
            ★★★ White, perfected. ★★★
          </p>

          {/* Rainbow line */}
          <div className="flex justify-center">
            <div 
              className="h-2 animate-rainbow"
              style={{
                width: stage >= 5 ? '200px' : '0px',
                background: 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)',
                transition: 'width 0.3s',
              }}
            />
          </div>

          {/* CTA */}
          <div style={{ opacity: stage >= 6 ? 1 : 0 }}>
            <button 
              onClick={() => navigate('/shop')} 
              className="btn-primary text-lg px-12 py-5"
              style={{ fontSize: '1.2rem' }}
            >
              🛒 SHOP NOW!!! 🛒
            </button>
          </div>

          {/* Scrolling text */}
          <div className="overflow-hidden mt-4">
            <p className="text-xs text-primary font-bold whitespace-nowrap"
              style={{ animation: 'marquee 5s linear infinite' }}
            >
              🔥 HOT DEALS 🔥 BUY NOW 🔥 LIMITED STOCK 🔥 BEST PRICE 🔥 HOT DEALS 🔥 BUY NOW 🔥 LIMITED STOCK 🔥
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-blink">
        <p className="text-sm font-bold text-primary tracking-widest">👇 SCROLL DOWN 👇</p>
      </div>
    </section>
  );
};

export default Hero;
