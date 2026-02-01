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
import React from "react";

interface Summary {
  joined: number;
  upcoming: number;
  completed: number;
}
export interface IEventDetails {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  fee: string;
  currency: string;
  image: string;
  status: string;
  minParticipants: number;
  maxParticipants: number;
}

export interface IUserProfile {
  id: string;
  fullName: string;
  image: string;
  location: string;
}

export interface IParticipant {
  id: number;
  eventId: string;
  userId: string;
  status: string;
  joinedAt: string;
  event: IEventDetails;
  user: {
    id: string;
    email: string;
    profile: IUserProfile;
  };
}

interface UserDashboardProps {
  summary?: Summary;
  upcomingEvents?: IParticipant[];
  recentEvents?: IParticipant[];
  isLoading?: boolean;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  summary,
  upcomingEvents,
  recentEvents,
  isLoading = false,
}) => {
  return (
    <div className="space-y-6">
      {/* --------------------- */}
      {/* 1️⃣ Stats Cards */}
      {/* --------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Joined Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary?.joined || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary?.upcoming || 0}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary?.completed || 0}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* --------------------- */}
      {/* 2️⃣ Upcoming Events Table */}
      {/* --------------------- */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
        {isLoading ? (
          <Skeleton className="h-48 w-full rounded-lg" />
        ) : upcomingEvents && upcomingEvents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    {event?.event?.title || "Untitled Event"}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      event?.event?.date || new Date(),
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {event?.event?.location || "Location not set"}
                  </TableCell>
                  <TableCell>
                    {event?.event?.fee ? `$${event?.event?.fee}` : "Free"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>No upcoming events.</div>
        )}
      </div>

      {/* --------------------- */}
      {/* 3️⃣ Recently Joined Events Table */}
      {/* --------------------- */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recently Joined Events</h2>
        {isLoading ? (
          <Skeleton className="h-48 w-full rounded-lg" />
        ) : recentEvents && recentEvents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    {event?.event?.title || "Untitled Event"}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      event?.event?.date || new Date(),
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {event?.event?.location || "Location not set"}
                  </TableCell>
                  <TableCell>
                    {event?.status ? `$${event?.status}` : "Pending"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>No recently joined events.</div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
