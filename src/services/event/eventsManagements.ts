/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  createEventValidationZodSchema,
  updateEventValidationZodSchema,
} from "@/zod/events.validation";

export async function createEvent(_prevState: any, formData: FormData) {
  try {
    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      date: formData.get("date") as string,
      categoryId: formData.get("categoryId") as string,
      minParticipants: Number(formData.get("minParticipants")),
      maxParticipants: Number(formData.get("maxParticipants")),
      fee: Number(formData.get("fee")),
    };

    // Zod Validation
    const validation = zodValidator(payload, createEventValidationZodSchema);

    if (!validation.success) {
      return validation;
    }

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(validation.data));

    const fileData = formData.get("file") as File;

    if (fileData && fileData.size > 0) {
      newFormData.append("file", fileData);
    }

    const response = await serverFetch.post("/event/create-event", {
      body: newFormData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getAlEvent(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await serverFetch.get(
      `/event/all-events${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "events-list",
            `events-page-${page}`,
            `events-search-${searchTerm}`,
          ],
          revalidate: 180, // faster doctor list updates
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function singleEvent(id: string) {
  try {
    const response = await serverFetch.get(`/event/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getMyEvents(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await serverFetch.get(
      `/event/my-events${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "events-list",
            `events-page-${page}`,
            `events-search-${searchTerm}`,
          ],
          revalidate: 180, // faster doctor list updates
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getEventCategories() {
  try {
    const response = await serverFetch.get("/event/all-events-categories");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function joinEvent(id: string) {
  try {
    const response = await serverFetch.post(`/event/${id}/join`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
export async function leaveEvent(id: string) {
  try {
    const response = await serverFetch.post(`/event/${id}/leave`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function deleteEvent(id: string) {
  try {
    const response = await serverFetch.delete(`/event/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function updateEvents(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    const rawDate = formData.get("date") as string;

    const formattedDate = rawDate ? new Date(rawDate).toISOString() : "";

    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      date: formattedDate,
      categoryId: formData.get("categoryId") as string,
      minParticipants: Number(formData.get("minParticipants")),
      maxParticipants: Number(formData.get("maxParticipants")),
      fee: Number(formData.get("fee")),
    };

    // Zod Validation
    const validation = zodValidator(payload, updateEventValidationZodSchema);

    if (!validation.success) {
      return validation;
    }
    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(validation.data));

    const fileData = formData.get("file") as File;

    if (fileData && fileData.size > 0) {
      newFormData.append("file", fileData);
    }

    const response = await serverFetch.patch(`/event/${id}`, {
      body: newFormData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
