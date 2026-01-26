import EventFilters from "@/components/modules/event/EventFilters";
import EventManagementPageHeader from "@/components/modules/event/eventsPageHeader";
import EventsTable from "@/components/modules/event/eventsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getUserInfo } from "@/services/auth/getUserInfo";
import {
  getEventCategories,
  getUserMyEvent,
} from "@/services/event/eventsManagements";
import { Suspense } from "react";

const MyEventsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  const queryString = await queryStringFormatter(searchParamsObj);

  const eventResult = await getUserMyEvent(queryString);

  const categoryResult = await getEventCategories();

  const currentUser = await getUserInfo();

  const totalPages = Math.ceil(
    (eventResult?.meta?.total || 1) / (eventResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <EventManagementPageHeader
        eventCategories={categoryResult.data || []}
        mode={currentUser?.role}
      />
      <EventFilters categories={categoryResult?.data || []} />

      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <EventsTable
          events={eventResult.data || []}
          eventCategories={categoryResult.data || []}
          mode={currentUser?.role}
        />
        <TablePagination
          currentPage={eventResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default MyEventsManagementPage;
