/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerPatientValidationZodSchema } from "@/zod/auth.validation";
import { updateUserZodSchema } from "@/zod/user.validation";

export const createUser = async (
  _prevState: any,
  formData: FormData,
): Promise<any> => {
  try {
    /* ----------------------------
     * 1. Parse interests (optional)
     * ---------------------------- */
    const interestsString = formData.get("interests") as string | null;
    let interestsArray: number[] = [];

    if (interestsString) {
      try {
        const parsed = JSON.parse(interestsString);
        if (Array.isArray(parsed)) {
          interestsArray = parsed
            .map(Number)
            .filter((id) => !isNaN(id) && id > 0);
        }
      } catch (err) {
        console.error("Invalid interests format", err);
      }
    }

    /* ----------------------------
     * 2. Raw payload
     * ---------------------------- */
    const payload = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      location: formData.get("location"),
      role: formData.get("role"),
      interestIds: interestsArray,
    };

    /* ----------------------------
     * 3. Zod validation
     * ---------------------------- */
    const validation = zodValidator(
      payload,
      registerPatientValidationZodSchema,
    );

    console.log(validation);

    if (!validation.success) {
      return validation;
    }

    const validated = validation.data;

    /* ----------------------------
     * 4. Backend payload structure
     * ---------------------------- */
    const requestData = {
      email: validated?.email,
      password: validated?.password,
      role: validated?.role,
      interestIds: interestsArray,
      profile: {
        fullName: validated?.fullName,
        bio: validated?.bio,
        location: validated?.location,
      },
    };

    /* ----------------------------
     * 5. Multipart form-data
     * ---------------------------- */
    const multipartData = new FormData();
    multipartData.append("data", JSON.stringify(requestData));

    const imageFile = formData.get("file") as File;

    if (imageFile && imageFile.size > 0) {
      multipartData.append("file", imageFile);
    }

    /* ----------------------------
     * 6. API call (ADMIN create user)
     * ---------------------------- */
    const response = await serverFetch.post("/user/register", {
      body: multipartData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("createUser error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create user",
    };
  }
};

export async function getAllUsers(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await serverFetch.get(
      `/user${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "users-list",
            `users-page-${page}`,
            `users-search-${searchTerm}`,
          ],
          revalidate: 180, // faster user list updates
        },
      },
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
export async function getAllHosts(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await serverFetch.get(
      `/hosts${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "hosts-list",
            `hosts-page-${page}`,
            `hosts-search-${searchTerm}`,
          ],
          revalidate: 180, // faster hosts list updates
        },
      },
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

export async function singleUser(id: string) {
  try {
    const response = await serverFetch.get(`/user/${id}`);
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

export const updateUser = async (
  userId: string,
  _prevState: any,
  formData: FormData,
): Promise<any> => {
  try {
    /* ----------------------------
     * 1. Parse interests (optional)
     * ---------------------------- */
    const interestsString = formData.get("interests") as string | null;
    let interestsArray: number[] = [];

    if (interestsString) {
      try {
        const parsed = JSON.parse(interestsString);
        if (Array.isArray(parsed)) {
          interestsArray = parsed
            .map(Number)
            .filter((id) => !isNaN(id) && id > 0);
        }
      } catch (err) {
        console.error("Invalid interests format", err);
      }
    }

    /* ----------------------------
     * 2. Raw payload (password optional)
     * ---------------------------- */
    const payload = {
      fullName: formData.get("fullName") || undefined,
      email: formData.get("email") || undefined,
      password: formData.get("password") || undefined,
      confirmPassword: formData.get("confirmPassword") || undefined,
      location: formData.get("location") || undefined,
      role: formData.get("role") || undefined,
      interestIds: interestsArray.length ? interestsArray : undefined,
    };

    /* ----------------------------
     * 3. Zod validation
     * ---------------------------- */
    const validation = zodValidator(payload, updateUserZodSchema);

    if (!validation.success) {
      return validation;
    }

    const validated = validation.data;

    /* ----------------------------
     * 4. Backend payload structure
     * ---------------------------- */
    if (!validated) {
      throw new Error("Validation failed: validated data is undefined");
    }

    const requestData: any = {
      email: validated.email,
      role: validated.role,
      interestIds: validated.interestIds,
      profile: {
        fullName: validated.fullName,
        location: validated.location,
      },
    };

    // only include password if user wants to change it
    if (validated.password) {
      requestData.password = validated.password;
    }

    /* ----------------------------
     * 5. Multipart form-data
     * ---------------------------- */
    const multipartData = new FormData();
    multipartData.append("data", JSON.stringify(requestData));

    const imageFile = formData.get("file") as File;

    if (imageFile && imageFile.size > 0) {
      multipartData.append("file", imageFile);
    }

    /* ----------------------------
     * 6. API call (ADMIN update user)
     * ---------------------------- */
    const response = await serverFetch.patch(`/user/${userId}`, {
      body: multipartData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("updateUser error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update user",
    };
  }
};
export async function deleteUser(id: string) {
  try {
    const response = await serverFetch.delete(`/user/${id}`);
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
