import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IEvents } from "@/types/events.interface";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedEventsSectionPropsType {
  events: IEvents[];
}

export function FeaturedEventsSection({
  events,
}: FeaturedEventsSectionPropsType) {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Featured Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover trending events happening near you this week.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events &&
            events.slice(0, 4).map((event, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                    $ {event.fee}
                  </Badge>
                </div>
                <CardContent className="p-5 space-y-4">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date(event.date), "EEEE, MMMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-3">
                      {event.maxParticipants} spots left
                    </p>
                    <Link href={`/events/${event.id}`}>
                      <Button className="w-full">Join Event</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
