"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/events.interface";
import Image from "next/image";

export const getUserColumns = (): Column<IUser>[] => {
  const columns: Column<IUser>[] = [
    {
      header: "Icon",
      accessor: (user) => (
        <Image
          src={user.profile.image || "/placeholder-user.jpg"}
          alt={user.profile.fullName}
          width={40}
          height={40}
          className="rounded-full"
        />
      ),
    },
    {
      header: "Name",
      accessor: (user) => user.profile.fullName,
    },
    {
      header: "email",
      accessor: (user) => user.email,
    },
    {
      header: "Location",
      accessor: (user) => user.profile.location,
    },
    {
      header: "Role",
      accessor: (user) => <Badge variant="outline">{user.role}</Badge>,
    },
  ];

  return columns;
};
