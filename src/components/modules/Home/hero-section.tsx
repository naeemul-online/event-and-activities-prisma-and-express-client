"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { UserInfo } from "@/types/user.interface";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  userInfo: UserInfo | null;
}

export function HeroSection({ userInfo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="w-fit">
              Discover • Connect • Experience
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Never Miss an Event Because You&apos;re Going Alone
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Join thousands of people who are turning their interests into real
              experiences. Find local events and meet like-minded companions to
              share amazing moments with.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/events">
                <Button size="lg" className="text-base">
                  Find Events Near You
                </Button>
              </Link>

              {!userInfo && (
                <Link href="/host/dashboard/my-events">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base bg-transparent"
                  >
                    Create an Event
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-3xl" />
            <Image
              src="/diverse-group-of-people-at-a-concert-enjoying-musi.jpg"
              fill
              alt="People enjoying events together"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
