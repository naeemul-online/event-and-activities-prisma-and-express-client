/* eslint-disable @typescript-eslint/no-explicit-any */
// services/dashboard/user.ts
import { serverFetch } from "@/lib/server-fetch";

interface ServiceResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// ---------------------------
// 1️⃣ User Dashboard Summary
// ---------------------------
export async function getUserDashboardSummary(): Promise<ServiceResponse> {
  try {
    const res = await serverFetch.get("/user/summary", {
      next: { revalidate: 180 }, // cache for 3 minutes
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("getUserDashboardSummary error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch dashboard summary",
    };
  }
}

// ---------------------------
// 2️⃣ User Upcoming Events
// ---------------------------
export async function getUserUpcomingEvents(
  queryString?: string,
): Promise<ServiceResponse> {
  try {
    const res = await serverFetch.get(
      `/user/upcoming-events${queryString ? `?${queryString}` : ""}`,
      {
        next: { revalidate: 180 },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("getUserUpcomingEvents error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch upcoming events",
    };
  }
}

// ---------------------------
// 3️⃣ User Recently Joined Events
// ---------------------------
export async function getUserRecentEvents(
  queryString?: string,
): Promise<ServiceResponse> {
  try {
    const res = await serverFetch.get(
      `/user/recent-participants${queryString ? `?${queryString}` : ""}`,
      {
        next: { revalidate: 180 },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("getUserRecentEvents error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch recent events",
    };
  }
}
