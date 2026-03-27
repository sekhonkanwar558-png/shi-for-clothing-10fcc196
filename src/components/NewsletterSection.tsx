import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Reveal } from "@/hooks/useScrollReveal";

const emailSchema = z.string().email("Please enter a valid email address").max(255);

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email.trim());
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.from("subscribers").insert({ email: result.data });
      if (error) {
        if (error.code === "23505") {
          toast.info("You're already part of the shi-for family.");
        } else {
          throw error;
        }
      } else {
        toast.success("Welcome to shi-for.");
        setEmail("");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-padding-sm bg-primary text-primary-foreground"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 5px, hsl(var(--accent) / 0.3) 5px, hsl(var(--accent) / 0.3) 10px),
          repeating-linear-gradient(90deg, transparent, transparent 5px, hsl(var(--secondary) / 0.3) 5px, hsl(var(--secondary) / 0.3) 10px)
        `,
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 lg:px-16">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-label tracking-widest animate-blink text-primary-foreground">
              📧 STAY CONNECTED 📧
            </p>
            
            <h2 className="text-section text-primary-foreground"
              style={{ textDecoration: 'underline wavy hsl(var(--accent))', textShadow: '3px 3px 0px hsl(var(--accent))' }}
            >
              🎉 Join the Journey!! 🎉
            </h2>
            
            <p className="text-body text-primary-foreground/80 font-bold">
              Be the first to know about new drops, exclusive offers, and the shi-for journey. DON'T MISS OUT!!!
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="✉️ Your email here..."
                className="flex-1 px-4 py-3 bg-primary-foreground text-primary font-bold text-sm border-4 border-dashed border-accent focus:outline-none focus:border-secondary"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-accent text-accent-foreground font-bold text-sm tracking-widest uppercase border-4 border-dashed border-primary-foreground hover:bg-secondary hover:text-secondary-foreground disabled:opacity-50"
                style={{ animation: 'wobble 0.5s ease-in-out infinite alternate' }}
              >
                {isLoading ? "⏳..." : "🚀 SUBSCRIBE!!!"}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NewsletterSection;
