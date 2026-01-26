"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { UserRole } from "@/lib/auth-utils";
import { ICategory } from "@/types/events.interface";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import EventsFormDialog from "./eventsFormDialog";

interface EventsManagementPageHeaderProps {
  eventCategories?: ICategory[];
  mode?: UserRole;
}

const EventManagementPageHeader = ({
  eventCategories,
  mode,
}: EventsManagementPageHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <EventsFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        categories={eventCategories}
      />

      <ManagementPageHeader
        title="Event Management"
        description="Manage Event information and details"
        action={{
          label: "Add New Event",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
        mode={mode}
      />
    </>
  );
};

export default EventManagementPageHeader;
