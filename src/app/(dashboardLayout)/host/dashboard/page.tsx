import HostDashboard from "@/components/modules/Host/hostDashboard";
import {
  getHostDashboardSummary,
  getHostRecentParticipants,
  getHostUpcomingEvents,
} from "@/services/hosts/hostDashboard";

const HostDashboardPage = async () => {
  const [summaryRes, upcomingEventsRes, recentParticipantsRes] =
    await Promise.all([
      getHostDashboardSummary(),
      getHostUpcomingEvents(),
      getHostRecentParticipants(),
    ]);

  return (
    <HostDashboard
      summary={summaryRes?.data || []}
      upcomingEvents={upcomingEventsRes?.data || []}
      recentParticipants={recentParticipantsRes?.data || []}
    />
  );
};

export default HostDashboardPage;
