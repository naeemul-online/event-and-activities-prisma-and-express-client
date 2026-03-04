"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/user.interface";
import { ArrowRight, Calendar, MapPin, Play, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  userInfo: UserInfo | null;
}

const stats = [
  { value: "10K+", label: "Events Hosted" },
  { value: "50K+", label: "Happy Members" },
  { value: "200+", label: "Cities Worldwide" },
];

export function HeroSection(userInfo: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-event.jpg"
          alt="People enjoying events together"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="bg-accent/20 text-accent-foreground border-accent/30 backdrop-blur-sm text-sm px-4 py-1.5">
              Discover &middot; Connect &middot; Experience
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-background leading-tight font-serif text-balance">
              Never Go
              <span className="block text-accent">Alone Again</span>
            </h1>

            <p className="text-lg lg:text-xl text-background/80 leading-relaxed text-pretty max-w-xl">
              Join thousands of people turning their interests into real
              experiences. Find local events and meet like-minded companions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/events">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
                >
                  Explore Events
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              {!userInfo && (
                <Link href="/host/dashboard/my-events">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 py-6 bg-background/10 text-background border-background/20 hover:bg-background/20 backdrop-blur-sm"
                  >
                    <Play className="mr-2 w-4 h-4" />
                    Host an Event
                  </Button>
                </Link>
              )}
            </div>

            {/* Floating stats bar */}
            <div
              className={`flex flex-wrap gap-8 pt-8 border-t border-background/10 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl lg:text-3xl font-bold text-background">
                    {stat.value}
                  </p>
                  <p className="text-sm text-background/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating card previews */}
      <div className="hidden md:block absolute right-12 bottom-20 z-10">
        <div
          className={`space-y-4 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          <div className="bg-background/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  Jazz Night Downtown
                </p>
                <p className="text-xs text-muted-foreground">
                  Tomorrow, 8:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Blue Note Jazz Club</span>
            </div>
          </div>

          <div className="bg-background/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl max-w-xs ml-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  12 people joined
                </p>
                <p className="text-xs text-muted-foreground">
                  3 spots remaining
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
