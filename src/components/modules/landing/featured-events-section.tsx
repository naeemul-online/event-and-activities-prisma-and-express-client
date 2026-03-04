"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IEvents } from "@/types/events.interface";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const mockEvents = [
  {
    id: "1",
    title: "Summer Jazz Festival",
    image: "/images/category-music.jpg",
    date: "2026-03-15",
    location: "Central Park, NYC",
    fee: 25,
    maxParticipants: 8,
  },
  {
    id: "2",
    title: "Mountain Trail Adventure",
    image: "/images/category-hiking.jpg",
    date: "2026-03-20",
    location: "Blue Ridge Mountains",
    fee: 15,
    maxParticipants: 5,
  },
  {
    id: "3",
    title: "Board Game Championship",
    image: "/images/category-gaming.jpg",
    date: "2026-03-22",
    location: "The Game Lounge, SF",
    fee: 10,
    maxParticipants: 12,
  },
  {
    id: "4",
    title: "Tech Startup Meetup",
    image: "/images/category-tech.jpg",
    date: "2026-03-25",
    location: "Innovation Hub, Austin",
    fee: 0,
    maxParticipants: 30,
  },
];

interface FeaturedEventsSectionPropsType {
  events: IEvents[];
}

export function FeaturedEventsSection({
  events,
}: FeaturedEventsSectionPropsType) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            events.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) =>
                  prev.includes(index) ? prev : [...prev, index],
                );
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Trending Now
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-balance">
              Featured Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Discover the most popular events happening near you this week.
            </p>
          </div>
          <Link href="/events">
            <Button variant="outline" className="gap-2 shrink-0">
              View All Events
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className={`group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 right-3 bg-background/90 text-foreground backdrop-blur-sm font-semibold">
                  {event.fee === 0 ? "Free" : `$${event.fee}`}
                </Badge>
              </div>

              <div className="p-5 space-y-4">
                <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    {event.maxParticipants} spots left
                  </p>
                  <Link href={`/events/${event.id}`}>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Join
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
