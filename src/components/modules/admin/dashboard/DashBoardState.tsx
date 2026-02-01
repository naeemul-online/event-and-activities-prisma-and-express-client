import { Card, CardContent } from "@/components/ui/card";
import { getDashboardOverview } from "@/services/admin/dashboardManagements";

export default async function DashboardStats() {
  const result = await getDashboardOverview();

  const stats = [
    { label: "Total Users", value: result?.data?.totalUsers },
    { label: "Total Hosts", value: result?.data?.totalHosts },
    { label: "Total Events", value: result?.data?.totalEvents },
    { label: "Upcoming Events", value: result?.data?.upcomingEvents },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
