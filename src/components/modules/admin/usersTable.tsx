"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { UserRole } from "@/lib/auth-utils";
import { deleteUser } from "@/services/admin/usersManagements";
import { IUser } from "@/types/events.interface";
import { getUserColumns } from "./usersColumns";
import UsersFormDialog from "./usersFormDialog";

interface EventsTableProps {
  user: IUser[];
  mode?: UserRole;
}

const UsersTable = ({ user }: EventsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
  };

  const handleDelete = (user: IUser) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;

    setIsDeletingDialog(true);

    const result = await deleteUser(deletingUser.id);

    setIsDeletingDialog(false);

    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete user");
    }
  };

  return (
    <>
      <ManagementTable
        data={user}
        columns={getUserColumns()}
        onView={(user) => router.push(`/admin/dashboard/user/${user.id}`)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(user) => user.id}
        emptyMessage="No user found"
      />

      <UsersFormDialog
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        user={editingUser!}
        onSuccess={() => {
          setEditingUser(null);
          handleRefresh();
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingUser?.id}? This action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default UsersTable;
