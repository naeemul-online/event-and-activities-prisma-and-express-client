"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteEvent } from "@/services/event/eventsManagements";
import { ICategory, IEvents } from "@/types/events.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { UserRole } from "@/lib/auth-utils";
import { getEventsColumns } from "./eventsColumns";
import EventsFormDialog from "./eventsFormDialog";

interface EventsTableProps {
  events: IEvents[];
  eventCategories?: ICategory[];
  mode?: UserRole;
}

const EventsTable = ({ events, eventCategories, mode }: EventsTableProps) => {
  const isHost = mode === "HOST";
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingEvent, setDeletingEvent] = useState<IEvents | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<IEvents | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleEdit = (event: IEvents) => {
    setEditingEvent(event);
  };

  const handleDelete = (event: IEvents) => {
    setDeletingEvent(event);
  };

  const confirmDelete = async () => {
    if (!deletingEvent) return;

    setIsDeletingDialog(true);

    const result = await deleteEvent(deletingEvent.id);

    setIsDeletingDialog(false);

    if (result.success) {
      toast.success(result.message || "Event deleted successfully");
      setDeletingEvent(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete event");
    }
  };

  return (
    <>
      <ManagementTable
        data={events}
        columns={getEventsColumns(mode!)}
        onView={(event) => router.push(`/events/${event.id}`)}
        onEdit={isHost ? handleEdit : undefined}
        onDelete={isHost ? handleDelete : undefined}
        getRowKey={(events) => events.id}
        emptyMessage="No events found"
      />

      <EventsFormDialog
        open={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        event={editingEvent!}
        categories={eventCategories}
        onSuccess={() => {
          setEditingEvent(null);
          handleRefresh();
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
        onConfirm={confirmDelete}
        title="Delete Event"
        description={`Are you sure you want to delete ${deletingEvent?.title}? This action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default EventsTable;
