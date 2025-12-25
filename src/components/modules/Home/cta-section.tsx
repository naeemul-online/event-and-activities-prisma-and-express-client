import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 bg-linear-to-br from-primary/90 to-accent/90 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Turn Your Interests Into Real Experiences
          </h2>
          <p className="text-lg text-primary-foreground/90 leading-relaxed">
            Join thousands of people who are already discovering events and
            building meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" variant="secondary" className="text-base">
                Join Now
              </Button>
            </Link>
            <Link href="/host/dashboard/my-events">
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-transparent hover:bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30"
              >
                Become a Host
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
