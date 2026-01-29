import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I've made so many genuine friends through this platform. Never going to concerts alone again!",
    name: "Jessica Martinez",
    avatar: "/woman-smiling-happy.jpg",
    initials: "JM",
  },
  {
    quote:
      "As someone new to the city, this helped me find my community and explore local events I never knew existed.",
    name: "Alex Thompson",
    avatar: "/man-smiling-outdoor.jpg",
    initials: "AT",
  },
  {
    quote:
      "The hiking group I joined became my regular weekend crew. Best decision I made this year!",
    name: "Priya Patel",
    avatar: "/indian-woman-smiling-nature.jpg",
    initials: "PP",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            What Our Members Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from people who found their community through Events &
            Activities.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-muted/50 hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-8 pb-6 space-y-6">
                <Quote className="w-10 h-10 text-primary/30" />
                <p className="text-base leading-relaxed italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Active Member
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
