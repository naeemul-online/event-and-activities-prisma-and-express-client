"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serverFetch } from "@/lib/server-fetch";
import { format } from "date-fns";
import { Calendar, CheckCircle, DollarSign, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PaymentSuccessClient({ eventId }: { eventId: string }) {
  const router = useRouter();
  interface Event {
    title: string;
    date: string;
    location: string;
    fee: string;
    currency: string;
  }

  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!eventId) return;

    (async () => {
      const res = await serverFetch.get(`/event/${eventId}`);
      const data = await res.json();
      if (data?.success) setEvent(data.data);
    })();
  }, [eventId]);

  if (!event) return null;

  return (
    <div className="container mx-auto max-w-3xl py-16 space-y-8">
      {/* Success Header */}
      <Card className="border-primary/30">
        <CardContent className="pt-8 text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-primary mx-auto" />
          <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
          <p className="text-muted-foreground">
            You have successfully joined this event
          </p>
          <Badge className="mt-2">Status: JOINED</Badge>
        </CardContent>
      </Card>

      {/* Event Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Event Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">{event.title}</h2>

          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            {format(new Date(event.date), "EEEE, MMMM dd • h:mm a")}
          </div>

          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            {event.location}
          </div>

          <div className="flex items-center gap-3 text-sm">
            <DollarSign className="w-4 h-4 text-primary" />
            {event.fee === "0" ? "Free" : `${event.currency} ${event.fee}`}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          className="flex-1"
          onClick={() => router.push(`/events/${eventId}`)}
        >
          View Event
        </Button>

        <Button
          variant="outline"
          className="flex-1"
          onClick={() => router.push("/user/dashboard/my-events")}
        >
          My Events
        </Button>
      </div>
    </div>
  );
}
