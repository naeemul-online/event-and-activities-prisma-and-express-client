import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getRecentEvents } from "@/services/admin/dashboardManagements";
import { IEvent } from "@/types/events.interface";

export default async function RecentEventsTable() {
  const { data } = await getRecentEvents("limit=5");

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Recent Events</h3>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {data.map((event: IEvent) => (
            <li key={event.id} className="flex justify-between text-sm">
              <span>{event.title}</span>
              <span className="text-muted-foreground">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
