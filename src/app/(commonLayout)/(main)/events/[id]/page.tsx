import { EventDetailsClient } from "@/components/shared/EventDetailsClient";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { singleEvent } from "@/services/event/eventsManagements";

export const metadata = {
  title: "Event Details | Events & Activities",
  description: "View complete event information and join activities",
};

interface EventDetailsPageProps {
  params: { id: string };
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const res = await singleEvent(id);

  const currentUser = await getUserInfo();

  return (
    <div className="min-h-screen">
      <main className="py-12">
        <EventDetailsClient event={res.data} userId={currentUser?.id || ""} />
      </main>
    </div>
  );
}
