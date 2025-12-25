"use client";
import { Column } from "@/components/shared/ManagementTable";
import { IEvents } from "@/types/events.interface";
import Image from "next/image";

export const EventsColumns: Column<IEvents>[] = [
  {
    header: "Icon",
    accessor: (event) => (
      <Image
        src={event.image}
        alt={event.title}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
  },
  {
    header: "Title",
    accessor: (event) => event.title,
  },
  {
    header: "Description",
    accessor: (event) => event.description,
  },
  {
    header: "Location",
    accessor: (event) => event.location,
  },
  {
    header: "Date",
    accessor: (event) => event.date,
  },
  {
    header: "status",
    accessor: (event) => event.status,
  },
];
