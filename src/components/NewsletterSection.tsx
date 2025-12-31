import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

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
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: result.data });
      
      if (error) {
        if (error.code === "23505") {
          toast.info("You're already part of the shi-for family!");
        } else {
          throw error;
        }
      } else {
        toast.success("Welcome to shi-for! You're now part of the family.");
        setEmail("");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-background/60 uppercase">
            Stay Connected
          </p>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.08em]">
            Become Part of Our Brand
          </h2>
          
          <p className="font-body text-sm sm:text-base text-background/70 leading-relaxed font-light max-w-md mx-auto">
            Sign up for updates on new drops, exclusive offers, and the shi-for journey.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-background/10 border border-background/20 text-background placeholder:text-background/50 font-body text-sm tracking-wide focus:outline-none focus:border-background/50 transition-colors"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-background text-foreground font-body text-xs tracking-[0.15em] uppercase hover:bg-background/90 transition-colors disabled:opacity-50 touch-manipulation"
            >
              {isLoading ? "Joining..." : "Join"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
