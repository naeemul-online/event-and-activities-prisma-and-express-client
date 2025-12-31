"use client";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { IEvents } from "@/types/events.interface";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface EventCardProps {
  event: IEvents;
}

function EventCard({ event }: EventCardProps) {
  const statusColors = {
    OPEN: "bg-primary/10 text-primary border-primary/20",
    FULL: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const formattedDate = format(new Date(event.date), "MMM dd, yyyy");
  const formattedTime = format(new Date(event.date), "h:mm a");

  return (
    <>
      <Card className="overflow-hidden group hover:shadow-xl transition-all">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={event.image || "/placeholder.svg?height=300&width=400"}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3 bg-background/90 text-foreground hover:bg-background/90">
            {event.fee === "0" ? "Free" : `${event.currency} ${event.fee}`}
          </Badge>
          <Badge
            className={cn(
              "absolute top-3 left-3 backdrop-blur-sm",
              statusColors[event.status]
            )}
          >
            {event.status}
          </Badge>
        </div>

        <CardContent className="p-5 space-y-4">
          {/* Title and Category */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1">
              {event.title}
            </h3>

            <Badge> {event?.category?.name ?? "Unknown Category"}</Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {event.description}
          </p>

          {/* Details */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 shrink-0" />
              <span>{event.host?.profile?.fullName ?? "Unknown Host"}</span>
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              {event.maxParticipants - event.minParticipants > 0
                ? `${event.maxParticipants - event.minParticipants} spots left`
                : "Limited spots"}
            </p>
            <Link href={`/events/${event.id}`}>
              <Button
                className="w-full cursor-pointer"
                disabled={event.status !== "OPEN"}
              >
                {event.status === "OPEN" ? "Join Event" : event.status}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default EventCard;
