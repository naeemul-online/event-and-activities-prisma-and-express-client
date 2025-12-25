import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Sparkles, Users } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Events",
    description:
      "Browse concerts, sports, hiking trips, gaming sessions, and tech meetups in your area.",
  },
  {
    icon: Users,
    title: "Join or Create Activities",
    description:
      "Find the perfect event or create your own and invite others to join you.",
  },
  {
    icon: Sparkles,
    title: "Meet Like-Minded People",
    description:
      "Connect with people who share your interests and build lasting friendships.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started is simple. Follow these three easy steps to start
            experiencing events together.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
