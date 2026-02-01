// app/dashboard/user/page.tsx

import UserDashboard from "@/components/modules/User/UserDashboard";
import {
  getUserDashboardSummary,
  getUserRecentEvents,
  getUserUpcomingEvents,
} from "@/services/user/dashboard";

const UserDashboardPage = async () => {
  const [summaryRes, upcomingRes, recentRes] = await Promise.all([
    getUserDashboardSummary(),
    getUserUpcomingEvents(),
    getUserRecentEvents(),
  ]);

  return (
    <UserDashboard
      summary={summaryRes?.data || []}
      upcomingEvents={upcomingRes?.data || []}
      recentEvents={recentRes?.data || []}
    />
  );
};

export default UserDashboardPage;
