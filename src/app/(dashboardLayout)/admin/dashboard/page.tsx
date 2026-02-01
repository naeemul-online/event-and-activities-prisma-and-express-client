import DashboardStats from "@/components/modules/admin/dashboard/DashBoardState";
import { Suspense } from "react";

import DashboardSkeleton from "@/components/modules/admin/dashboard/DashBoardSkeleton";
import RecentEventsTable from "@/components/modules/admin/dashboard/RecentEventsTable";
import RecentUsersTable from "@/components/modules/admin/dashboard/RecentUsersTable";

export default async function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentUsersTable />
          <RecentEventsTable />
        </div>
      </Suspense>
    </div>
  );
}
