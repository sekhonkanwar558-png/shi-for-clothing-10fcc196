import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const emailSchema = z.string().email("Please enter a valid email address").max(255);

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email.trim());
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: result.data });
      
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
    <section className="section-padding-sm bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16">
        <div
          ref={ref}
          className="max-w-3xl mx-auto text-center space-y-10 transition-all duration-[1400ms] ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <p className="text-label text-background/40 tracking-[0.3em]">
            Stay Connected
          </p>
          
          <h2 className="font-display text-section text-background font-light italic">
            Join the Journey
          </h2>
          
          <p className="text-body text-background/60 max-w-md mx-auto">
            Be the first to know about new drops, exclusive offers, and the shi-for journey.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-5 py-4 bg-transparent border border-background/15 text-background placeholder:text-background/30 text-xs tracking-wider focus:outline-none focus:border-background/40 transition-colors duration-500"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-accent text-foreground text-xs tracking-[0.25em] uppercase font-normal hover:bg-accent/90 transition-all duration-500 disabled:opacity-50 touch-manipulation"
            >
              {isLoading ? "..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
