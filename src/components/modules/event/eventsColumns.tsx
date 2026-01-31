"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IEvents } from "@/types/events.interface";
import Image from "next/image";

export const getEventsColumns = (
  mode: "HOST" | "USER" | "ADMIN",
): Column<IEvents>[] => {
  const columns: Column<IEvents>[] = [
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
      header: "Location",
      accessor: (event) => event.location,
    },
    {
      header: "Date",
      accessor: (event) => new Date(event.date).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: (event) => <Badge variant="outline">{event.status}</Badge>,
    },
  ];

  // 🔐 HOST-only column
  if (mode === "HOST") {
    columns.splice(2, 0, {
      header: "Description",
      accessor: (event) =>
        event.description.length > 40
          ? event.description.slice(0, 40) + "..."
          : event.description,
    });
  }

  // 👤 USER-only column (optional)
  if (mode === "USER") {
    columns.push({
      header: "Payment Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      accessor: (event: any) => {
        const status = event.paymentStatus || "PENDING";

        return (
          <Badge variant={status === "JOINED" ? "default" : "secondary"}>
            {status}
          </Badge>
        );
      },
    });
  }

  return columns;
};
