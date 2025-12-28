/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await serverFetch.get("/auth/me", {
      next: {
        tags: ["user-info"],
        revalidate: 180,
      },
    });

    const result = await response.json();

    if (!result?.success) {
      return null;
    }

    return result.data as UserInfo;
  } catch (error) {
    console.error("getUserInfo error:", error);
    return null;
  }
};
