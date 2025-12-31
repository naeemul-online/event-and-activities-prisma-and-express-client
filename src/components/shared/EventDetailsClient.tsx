"use client";

import { cn } from "@/lib/utils";
import { joinEvent, leaveEvent } from "@/services/event/eventsManagements";
import type { IEvents, ParticipantStatus } from "@/types/events.interface";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  DollarSign,
  Heart,
  Mail,
  MapPin,
  MapPinned,
  Share2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

import { usePathname, useRouter } from "next/navigation";

interface IParticipant {
  id: string;
  userId: string;
  eventId: string;
  status: ParticipantStatus;
  joinedAt: string;
  user: {
    email: string;
    profile: {
      id: string;
      fullName: string;
      bio: string | null;
      image: string | null;
      location: string | null;
      userId: string;
    };
  };
}

interface EventDetailsClientProps {
  event: IEvents & { participants?: IParticipant[] };
  userId: string;
}

export function EventDetailsClient({ event, userId }: EventDetailsClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [actionLoading, setActionLoading] = useState(false);

  const participant = event.eventParticipants?.find((p) => p.userId === userId);

  const participantStatus = participant?.status as string;

  const paymentStatus = event.paymentStatus;

  const statusColors = {
    OPEN: "bg-primary/10 text-primary border-primary/20",
    FULL: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const formattedDate = format(new Date(event.date), "EEEE, MMMM dd, yyyy");
  const formattedTime = format(new Date(event.date), "h:mm a");
  const participantCount = event.eventParticipants?.length || 0;
  const spotsLeft = event.maxParticipants - participantCount;

  const handleJoinEvent = async () => {
    // 🔐 Not logged in
    if (!userId) {
      toast.info("Please login to join this event");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      setActionLoading(true);

      const res = await joinEvent(event.id);
      console.log(res.data);

      if (!res?.success) {
        toast.error(res?.message || "Failed to join event");
        return;
      }

      // 🟡 Payment pending → redirect silently
      if (res.data?.paymentStatus === "PENDING") {
        window.location.href = res.data.paymentUrl;
        return;
      }

      // 🆕 New join
      if (res.data?.paymentStatus === "NEW") {
        toast.success("Redirecting to payment...");
        setTimeout(() => {
          window.location.href = res.data.paymentUrl;
        }, 500);
        return;
      }

      // 🟢 Paid already
      toast.success("You have already joined this event");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeaveEvent = async () => {
    try {
      setActionLoading(true);

      const res = await leaveEvent(event.id);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("You left the event");
      router.refresh();
    } catch {
      toast.error("Failed to leave event");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <img
              src={
                event.image ||
                "/placeholder.svg?height=500&width=1200&query=event"
              }
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={cn("backdrop-blur-sm", statusColors[event.status])}
                >
                  {event.status}
                </Badge>
                <Badge className="backdrop-blur-sm bg-background/80 text-foreground hover:bg-background/80">
                  {event?.category?.name ?? "Unknown Category"}
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-2">About This Event</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Key Information */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Date</p>
                        <p className="text-sm text-muted-foreground">
                          {formattedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Time</p>
                        <p className="text-sm text-muted-foreground">
                          {formattedTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Cost</p>
                        <p className="text-sm text-muted-foreground">
                          {event.fee === "0"
                            ? "Free"
                            : `${event.currency} ${event.fee}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Capacity</p>
                        <p className="text-sm text-muted-foreground">
                          {participantCount} / {event.maxParticipants}{" "}
                          participants
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Spots Available</p>
                        <p className="text-sm text-muted-foreground">
                          {spotsLeft > 0
                            ? `${spotsLeft} spots left`
                            : "Limited spots"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participants List */}
              <Card>
                <CardHeader>
                  <CardTitle>Participants ({participantCount})</CardTitle>
                </CardHeader>
                <CardContent>
                  {event.eventParticipants &&
                  event.eventParticipants.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-center text-muted-foreground py-8">
                        {event.eventParticipants.length} participants joined
                        yet..
                      </p>
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No participants yet. Be the first to join!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Card */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {event.fee === "0"
                          ? "Free"
                          : `${event.currency} ${event.fee}`}
                      </span>
                      {spotsLeft > 0 && spotsLeft <= 10 && (
                        <Badge
                          variant="outline"
                          className="bg-orange-500/10 text-orange-500 border-orange-500/20"
                        >
                          {spotsLeft} left
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    variant={
                      participantStatus === "JOINED" ? "destructive" : "default"
                    }
                    onClick={
                      participantStatus === "JOINED"
                        ? handleLeaveEvent
                        : handleJoinEvent
                    }
                    disabled={actionLoading}
                  >
                    {participantStatus === "JOINED"
                      ? "Leave Event"
                      : participantStatus === "PENDING"
                      ? "Complete Payment"
                      : "Join Event"}
                  </Button>

                  {event.status === "FULL" && (
                    <p className="text-sm text-center text-muted-foreground">
                      Event is full
                    </p>
                  )}
                  {event.status === "CANCELLED" && (
                    <p className="text-sm text-center text-destructive">
                      Event has been cancelled
                    </p>
                  )}

                  <Separator />

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1 bg-transparent"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1 bg-transparent"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Host Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Hosted By</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={event.host?.profile?.image || undefined}
                      />
                      <AvatarFallback className="text-lg">
                        {(event.host?.profile?.fullName || "Unknown Host")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">
                        {event.host?.profile?.fullName ?? "Unknown Host"}
                      </h3>
                      {event.host?.profile?.location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPinned className="w-4 h-4 shrink-0" />
                          <span className="truncate">
                            {event.host.profile.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {event.host?.profile?.bio && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.host.profile.bio}
                    </p>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span className="truncate">
                        {/* {event.host?.email || "No email available"} */}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    View Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event ID</span>
                    <span className="font-mono text-xs">
                      {event.id.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span>
                      {format(new Date(event.createdAt), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Min Participants
                    </span>
                    <span>{event.minParticipants}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
