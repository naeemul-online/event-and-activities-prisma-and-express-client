"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();

    // -----------------------------
    // Normalize form values
    // -----------------------------
    const profile: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("profile.") && value) {
        const field = key.replace("profile.", "");
        profile[field] = value;
      }
    }

    const payload = { profile };

    uploadFormData.append("data", JSON.stringify(payload));

    // -----------------------------
    // Attach file if exists
    // -----------------------------

    const fileData = formData.get("file") as File;

    if (fileData && fileData.size > 0) {
      uploadFormData.append("file", fileData);
    }

    console.log("---------:", uploadFormData);

    // const file = formData.get("file");

    // if (file instanceof File && file.size > 0) {
    //   uploadFormData.append("file", file);
    // }

    // -----------------------------
    // API Call
    // -----------------------------
    const response = await serverFetch.patch("/user/me/update-my-profile", {
      body: uploadFormData,
    });

    const result = await response.json();

    // -----------------------------
    // Revalidate cache
    // -----------------------------
    if (result?.success) {
      revalidateTag("user-info", { expire: 0 });
    }

    return result;
  } catch (error: any) {
    console.error("updateMyProfile error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update profile",
    };
  }
}
