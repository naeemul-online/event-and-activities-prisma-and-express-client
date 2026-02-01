"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IParticipant } from "../User/UserDashboard";

interface HostDashboardProps {
  summary: {
    totalEvents: number;
    upcomingEvents: number;
    totalParticipants: number;
    totalRevenue: number;
  };
  upcomingEvents: IParticipant[];
  recentParticipants: IParticipant[];
}

const HostDashboard = ({
  summary,
  upcomingEvents,
  recentParticipants,
}: HostDashboardProps) => {
  const isLoading = !summary;

  return (
    <div className="space-y-6">
      {/* ---------------- Stats Cards ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Events</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {summary?.totalEvents || 0}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {summary?.upcomingEvents || 0}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Participants</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {summary?.totalParticipants || 0}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                ৳{summary?.totalRevenue || 0}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* ---------------- Upcoming Events ---------------- */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
        {isLoading ? (
          <Skeleton className="h-40 w-full rounded-lg" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Participants</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event?.event.title || "No Title"}</TableCell>
                  <TableCell>
                    {new Date(event?.event.date || "").toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {event?.event.location || "No Location"}
                  </TableCell>
                  <TableCell>{event?.event.maxParticipants || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* ---------------- Recent Participants ---------------- */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Participants</h2>
        {isLoading ? (
          <Skeleton className="h-40 w-full rounded-lg" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Joined At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentParticipants.map((item) => (
                <TableRow key={item.eventId + item.userId}>
                  <TableCell>
                    {item?.user?.profile?.fullName || "Unknown User"}
                  </TableCell>
                  <TableCell>{item?.event?.title || "No Title"}</TableCell>
                  <TableCell>
                    {new Date(item.joinedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;
