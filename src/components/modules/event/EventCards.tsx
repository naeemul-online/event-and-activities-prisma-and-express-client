"use client";
import EventCard from "@/components/shared/EventCard";
import { IEvents } from "@/types/events.interface";

interface EventCardProps {
  events: IEvents[];
}

const EventCards = ({ events }: EventCardProps) => {
  return (
    <>
      <div className="rounded-lg border relative text-center">
        <div className="mb-4 p-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Discover Events
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the perfect event and connect with like-minded people
          </p>
        </div>

        <div className="p-8">
          {events.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <h3>No events found</h3>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EventCards;
