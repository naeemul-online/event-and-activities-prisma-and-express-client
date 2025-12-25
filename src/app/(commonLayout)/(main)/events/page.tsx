import EventFilters from "@/components/modules/event/EventFilters";
import EventManagementPageHeader from "@/components/modules/event/eventsPageHeader";
import { queryStringFormatter } from "@/lib/formatters";
import {
  getAlEvent,
  getEventCategories,
} from "@/services/event/eventsManagements";

export const metadata = {
  title: "Browse Events | Events & Activities",
  description:
    "Discover and search for events near you. Filter by category, date, and location.",
};

const EventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  const queryString = await queryStringFormatter(searchParamsObj);

  const eventResult = await getAlEvent(queryString);

  const categoryResult = await getEventCategories();

  const totalPages = Math.ceil(
    (eventResult?.meta?.total || 1) / (eventResult?.meta?.limit || 1)
  );

  return (
    <div className="min-h-screen">
      <main className="py-12">
        <EventManagementPageHeader
          eventCategories={categoryResult.data || []}
        />
        <EventFilters categories={categoryResult?.data || []} />

        {/* <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
          <EventsTable
            events={eventResult.data || []}
            eventCategories={categoryResult.data || []}
          />
          <TablePagination
            currentPage={eventResult?.meta?.page || 1}
            totalPages={totalPages || 1}
          />
        </Suspense> */}
      </main>
    </div>
  );
};

export default EventsPage;
