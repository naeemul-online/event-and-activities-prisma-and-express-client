import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TopHost {
  id: string;
  name: string;
  avatar: string | null;
  rating: number;
  events: number;
  initials: string;
}

export function HostsSection({ hosts }: { hosts: TopHost[] }) {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Top-Rated Hosts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our community leaders who create amazing experiences.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hosts &&
            hosts.map((host) => (
              <Card
                key={host.id}
                className="text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <CardContent className="pt-8 pb-6 space-y-4">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarImage
                      src={host.avatar || "/placeholder.svg"}
                      alt={host.name}
                    />
                    <AvatarFallback>{host.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{host.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{host.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {host.events} events hosted
                  </p>
                  <Badge variant="secondary">Top Host</Badge>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
