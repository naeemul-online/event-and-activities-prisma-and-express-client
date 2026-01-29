"use client";
import { fetchInterests } from "@/services/auth/fetchInterests";
import { registerUser } from "@/services/auth/registerUser";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";

import { Checkbox } from "./ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [interests, setInterests] = React.useState<
    { id: number; name: string }[]
  >([]);
  const [selectedInterests, setSelectedInterests] = React.useState<number[]>(
    []
  );

  const [role, setRole] = React.useState<"USER" | "HOST">("USER");

  useEffect(() => {
    const loadInterests = async () => {
      try {
        const data = await fetchInterests();

        setInterests(data.data);
      } catch (error) {
        toast.error("Failed to load interests.");
      }
    };

    loadInterests();
  }, []);

  const handleInterestChange = (id: number) => {
    setSelectedInterests((prev) => {
      if (prev.includes(id)) {
        return prev.filter((interestId) => interestId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else {
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="fulName"
                name="fullName"
                type="text"
                placeholder="John Doe"
              />
              <InputFieldError field="fullName" state={state} />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />
              <InputFieldError field="email" state={state} />
            </Field>

            {/* Password */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" />

              <InputFieldError field="password" state={state} />
            </Field>

            {/* Confirm Password */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />

              <InputFieldError field="confirmPassword" state={state} />
            </Field>

            {/* Bio */}
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Input id="bio" name="bio" type="text" placeholder="Bio" />
              <InputFieldError field="location" state={state} />
            </Field>

            {/* location */}
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="123 Main St"
              />
              <InputFieldError field="location" state={state} />
            </Field>

            {/* 📸 NEW: File Upload Field */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="file">Profile Picture (Optional)</FieldLabel>
              <Input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />

              <InputFieldError field="file" state={state} />
            </Field>

            {/* Interest Selection */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="interests">
                Select Interests (Required)
              </FieldLabel>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <div key={interest.id} className="flex items-center">
                    <Checkbox
                      id={`interest-${interest.id}`}
                      checked={selectedInterests.includes(interest.id)}
                      onCheckedChange={() => handleInterestChange(interest.id)}
                      className="cursor-pointer"
                    />
                    <Label htmlFor={`interest-${interest.id}`}>
                      {interest.name}
                    </Label>
                  </div>
                ))}
              </div>
              <InputFieldError field="interests" state={state} />
            </Field>

            {/* Role Selection */}
            <Field>
              <FieldLabel htmlFor="role">Register as a: </FieldLabel>

              <Label>
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={role === "USER"}
                  onChange={() => setRole("USER")}
                />
                USER
              </Label>
              <Label>
                <input
                  type="radio"
                  name="role"
                  value="HOST"
                  checked={role === "HOST"}
                  onChange={() => setRole("HOST")}
                />
                HOST
              </Label>
              <InputFieldError field="role" state={state} />
            </Field>
          </div>

          <FieldGroup className="mt-4">
            <input
              type="hidden"
              name="interests"
              value={JSON.stringify(selectedInterests)}
            />

            <Field>
              <Button
                type="submit"
                disabled={isPending || selectedInterests.length === 0}
              >
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </>
  );
};

export default RegisterForm;
