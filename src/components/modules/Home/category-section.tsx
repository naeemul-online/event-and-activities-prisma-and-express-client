import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Dumbbell, Gamepad2, Mountain, Music } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    icon: Music,
    title: "Music & Concerts",
    badge: "Popular",
  },
  {
    icon: Dumbbell,
    title: "Sports & Fitness",
    badge: "Active",
  },
  {
    icon: Mountain,
    title: "Hiking & Outdoor",
    badge: "Adventure",
  },
  {
    icon: Gamepad2,
    title: "Gaming & Board Games",
    badge: "Fun",
  },
  {
    icon: Code,
    title: "Tech & Meetups",
    badge: "Network",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Event Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore diverse activities tailored to your interests and passions.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Link href="/event" key={index}>
              <Card className="group cursor-pointer transition-all hover:shadow-lg hover:scale-105 hover:border-primary/50">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {category.badge}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
