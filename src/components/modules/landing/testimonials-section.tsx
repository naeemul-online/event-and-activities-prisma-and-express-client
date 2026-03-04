"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "I've made so many genuine friends through this platform. Never going to concerts alone again!",
    name: "Jessica Martinez",
    role: "Music Enthusiast",
    initials: "JM",
  },
  {
    quote:
      "As someone new to the city, this helped me find my community and explore local events I never knew existed.",
    name: "Alex Thompson",
    role: "Adventure Seeker",
    initials: "AT",
  },
  {
    quote:
      "The hiking group I joined became my regular weekend crew. Best decision I made this year!",
    name: "Priya Patel",
    role: "Outdoor Lover",
    initials: "PP",
  },
];

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-balance">
            Loved by Our Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real stories from people who found their tribe through Events &
            Activities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-8 border border-border hover:border-accent/30 hover:shadow-xl transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Quote className="w-10 h-10 text-accent/20 mb-6" />

              <p className="text-foreground leading-relaxed mb-8 text-base">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="" alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
