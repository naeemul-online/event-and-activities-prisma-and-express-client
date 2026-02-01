import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getRecentUsers } from "@/services/admin/dashboardManagements";
import { IUser } from "@/types/events.interface";

export default async function RecentUsersTable() {
  const { data } = await getRecentUsers("limit=5");

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Recent Users</h3>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {data.map((user: IUser) => (
            <li key={user.id} className="flex justify-between text-sm">
              <span>{user.profile?.fullName || "N/A"}</span>
              <span className="text-muted-foreground">{user.role}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
