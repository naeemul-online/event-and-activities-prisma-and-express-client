import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

const events = [
  {
    image: "/live-indie-rock-concert-with-crowd.jpg",
    title: "Indie Rock Night",
    date: "Jan 25, 2025",
    location: "Downtown Music Hall",
    price: "$25",
    spots: "3 spots left",
  },
  {
    image: "/group-hiking-mountain-trail-sunrise.jpg",
    title: "Sunrise Mountain Hike",
    date: "Jan 27, 2025",
    location: "Blue Ridge Trail",
    price: "Free",
    spots: "5 spots left",
  },
  {
    image: "/board-game-night-cafe-friends.jpg",
    title: "Board Game Night",
    date: "Jan 28, 2025",
    location: "Game Café Central",
    price: "$10",
    spots: "8 spots left",
  },
  {
    image: "/tech-meetup-presentation-startup.jpg",
    title: "Tech Startup Networking",
    date: "Jan 30, 2025",
    location: "Innovation Hub",
    price: "Free",
    spots: "12 spots left",
  },
]

export function FeaturedEventsSection() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Featured Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover trending events happening near you this week.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">{event.price}</Badge>
              </div>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-3">{event.spots}</p>
                  <Button className="w-full">Join Event</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
