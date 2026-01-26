import EventCards from "@/components/modules/event/EventCards";
import EventFilters from "@/components/modules/event/EventFilters";
import { EventsLoading } from "@/components/shared/EventLoading";
import TablePagination from "@/components/shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import {
  getAllEvents,
  getEventCategories,
} from "@/services/event/eventsManagements";
import { Suspense } from "react";

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  const queryString = await queryStringFormatter(searchParamsObj);

  const eventResult = await getAllEvents(queryString);

  const categoryResult = await getEventCategories();

  const totalPages = Math.ceil(
    (eventResult?.meta?.total || 1) / (eventResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <EventFilters categories={categoryResult?.data || []} />

      <Suspense fallback={<EventsLoading />}>
        <EventCards events={eventResult.data || []} />
        <TablePagination
          currentPage={eventResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default EventsPage;
