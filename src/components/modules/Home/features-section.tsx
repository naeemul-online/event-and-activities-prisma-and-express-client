import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Heart, MapPin, Shield } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified & Safe Users",
    description:
      "All members are verified to ensure a safe and trustworthy community environment.",
  },
  {
    icon: Heart,
    title: "Interest-Based Matching",
    description:
      "Connect with people who share your passions and hobbies for authentic experiences.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Book events with confidence using our secure payment system and refund protection.",
  },
  {
    icon: MapPin,
    title: "Real-World Connections",
    description:
      "Build genuine friendships through shared experiences and memorable moments.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re committed to creating the best platform for discovering
            events and building connections.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
