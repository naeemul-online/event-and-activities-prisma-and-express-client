import UsersManagementPageHeader from "@/components/modules/admin/usersPageHeader";
import UsersTable from "@/components/modules/admin/usersTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import UserFilters from "@/components/shared/usersFilters";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/admin/usersManagements";

import { Suspense } from "react";

const ManageUsers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = await queryStringFormatter(searchParamsObj);
  const users = await getAllUsers(queryString);
  const totalPages = Math.ceil(
    (users?.data?.meta.total || 1) / (users?.data?.meta.limit || 1),
  );

  console.log(users?.data?.meta.total);

  return (
    <div>
      <UsersManagementPageHeader />
      <UserFilters />
      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <UsersTable user={users?.data?.data || []} />
        <TablePagination
          currentPage={users?.data?.meta.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default ManageUsers;
