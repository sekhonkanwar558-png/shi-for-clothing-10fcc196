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
    <section className="section-padding bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Left-aligned content */}
          <p className="text-label text-background/50 mb-8">
            Stay Connected
          </p>
          
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <h2 className="font-display text-section text-background">
                Become Part of Our Brand
              </h2>
              
              <p className="text-body text-background/70 font-light">
                Sign up for updates on new drops, exclusive offers, and the shi-for journey.
              </p>
            </div>
            
            {/* Right Column - Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-5 py-4 bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-body rounded-lg focus:outline-none focus:border-background/50 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-8 py-4 bg-background text-foreground font-medium text-sm tracking-wide rounded-lg hover:bg-background/90 transition-all duration-300 disabled:opacity-50 touch-manipulation shadow-button hover:shadow-button-hover"
              >
                {isLoading ? "Joining..." : "Join the Family"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;