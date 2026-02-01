/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function getDashboardOverview() {
  try {
    const response = await serverFetch.get("/dashboard", {
      next: {
        tags: ["admin-dashboard-overview"],
        revalidate: 120,
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to load dashboard overview",
    };
  }
}

export async function getRecentUsers(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const limit = searchParams.get("limit") || "5";

    const response = await serverFetch.get(
      `/dashboard/recent-users${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: ["admin-recent-users", `admin-recent-users-${limit}`],
          revalidate: 120,
        },
      },
    );

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to load recent users",
    };
  }
}

export async function getRecentEvents(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const limit = searchParams.get("limit") || "5";

    const response = await serverFetch.get(
      `/dashboard/recent-events${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: ["admin-recent-events", `admin-recent-events-${limit}`],
          revalidate: 120,
        },
      },
    );

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to load recent events",
    };
  }
}
