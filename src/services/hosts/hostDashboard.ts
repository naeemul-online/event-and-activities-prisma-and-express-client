/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";

/**
 * Host summary stats
 * cards: total events, upcoming events, total participants, total revenue
 */
export async function getHostDashboardSummary() {
  try {
    const res = await serverFetch.get("/hosts/summary", {
      next: {
        tags: ["host-dashboard-summary"],
        revalidate: 120,
      },
    });
    return await res.json();
  } catch (error: any) {
    console.log(error);
    return { success: false };
  }
}

/**
 * Upcoming hosted events
 */
export async function getHostUpcomingEvents() {
  try {
    const res = await serverFetch.get("/hosts/upcoming-events", {
      next: {
        tags: ["host-upcoming-events"],
        revalidate: 120,
      },
    });
    return await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return { success: false };
  }
}

/**
 * Recent participants (latest joined users)
 */
export async function getHostRecentParticipants() {
  try {
    const res = await serverFetch.get("/hosts/recent-participants", {
      next: {
        tags: ["host-recent-participants"],
        revalidate: 120,
      },
    });
    return await res.json();
  } catch (error: any) {
    console.log(error);
    return { success: false };
  }
}
