"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/events.interface";
import Image from "next/image";

export const getUserColumns = (): Column<IUser>[] => {
  return [
    {
      header: "Icon",
      accessor: (user) => {
        const image = user.profile?.image || "/placeholder-user.jpg";
        const name = user.profile?.fullName || "Unknown User";

        return (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="rounded-full"
          />
        );
      },
    },
    {
      header: "Name",
      accessor: (user) => user.profile?.fullName ?? "—",
    },
    {
      header: "Email",
      accessor: (user) => user.email,
    },
    {
      header: "Location",
      accessor: (user) => user.profile?.location ?? "—",
    },
    {
      header: "Role",
      accessor: (user) => <Badge variant="outline">{user.role}</Badge>,
    },
  ];
};
