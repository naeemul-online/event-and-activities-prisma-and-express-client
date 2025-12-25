/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerPatientValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  const interestsString = formData.get("interests") as string | null;

  let interestsArray: number[] = [];

  if (interestsString) {
    try {
      const parsedArray = JSON.parse(interestsString);

      if (Array.isArray(parsedArray)) {
        interestsArray = parsedArray
          .map((id) => Number(id))
          .filter((id) => !isNaN(id) && id > 0);
      }
    } catch (error) {
      console.error("Error parsing interests array:", error);
    }
  }

  try {
    const payload = {
      fullName: formData.get("fullName"),
      location: formData.get("location"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role"),
      bio: formData.get("bio"),
      interestIds: interestsArray,
    };

    if (
      zodValidator(payload, registerPatientValidationZodSchema).success ===
      false
    ) {
      return zodValidator(payload, registerPatientValidationZodSchema);
    }

    const validatedPayload: any = zodValidator(
      payload,
      registerPatientValidationZodSchema
    ).data;

    const registerData = {
      email: validatedPayload.email,
      password: validatedPayload.password,
      role: validatedPayload.role,
      interestIds: interestsArray,
      profile: {
        fullName: validatedPayload.fullName,
        bio: validatedPayload.bio,
        location: validatedPayload.location,
      },
    };

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(registerData));

    const fileData = formData.get("file") as Blob;

    if (fileData instanceof File && fileData.size > 0) {
      newFormData.append("file", fileData);
    } else {
      console.log("File is optional or empty, skipping append.");
    }

    const res = await serverFetch.post("/user/register", {
      body: newFormData,
    });

    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again."
      }`,
    };
  }
};
