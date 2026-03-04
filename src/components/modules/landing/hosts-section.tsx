"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const hosts = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: null,
    rating: 4.9,
    events: 48,
    initials: "SC",
    specialty: "Music & Arts",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: null,
    rating: 4.8,
    events: 36,
    initials: "MJ",
    specialty: "Sports & Fitness",
  },
  {
    id: "3",
    name: "Emily Torres",
    avatar: null,
    rating: 4.9,
    events: 52,
    initials: "ET",
    specialty: "Outdoor Adventures",
  },
  {
    id: "4",
    name: "David Park",
    avatar: null,
    rating: 4.7,
    events: 29,
    initials: "DP",
    specialty: "Tech & Gaming",
  },
];

export function HostsSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hosts.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) =>
                  prev.includes(index) ? prev : [...prev, index],
                );
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Community Leaders
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-balance">
            Top-Rated Hosts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Meet the passionate organizers who create unforgettable experiences.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hosts.map((host, index) => (
            <div
              key={host.id}
              className={`group bg-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-700 border border-border hover:border-primary/30 ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative mx-auto mb-6 w-20 h-20">
                <Avatar className="w-20 h-20 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                  <AvatarImage src={host.avatar || ""} alt={host.name} />
                  <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                    {host.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 fill-accent-foreground text-accent-foreground" />
                </div>
              </div>

              <h3 className="font-bold text-lg mb-1 text-card-foreground">
                {host.name}
              </h3>
              <p className="text-sm text-accent font-medium mb-2">
                {host.specialty}
              </p>

              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(host.rating)
                        ? "fill-accent text-accent"
                        : "text-border"
                    }`}
                  />
                ))}
                <span className="text-sm font-semibold text-foreground ml-1">
                  {host.rating}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                {host.events} events hosted
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
