"use client";

import { useEffect, useRef, useState } from "react";
import { CreditCard, Heart, MapPin, Shield } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified & Safe",
    description:
      "All members are verified to ensure a safe and trustworthy community experience for everyone.",
  },
  {
    icon: Heart,
    title: "Interest Matching",
    description:
      "Connect with people who share your passions for authentic, meaningful experiences.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Book events with confidence using our secure payment system with full refund protection.",
  },
  {
    icon: MapPin,
    title: "Real Connections",
    description:
      "Build genuine friendships through shared experiences and memorable real-world moments.",
  },
];

export function FeaturesSection() {
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side: headline + description */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-balance">
              Built for Real
              <span className="block text-primary">Human Connections</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We{"'"}re committed to creating the best platform for discovering
              events and building meaningful connections that last beyond a
              single event.
            </p>
          </div>

          {/* Right side: feature grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-700 delay-${
                  index * 100
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100 + 200}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
