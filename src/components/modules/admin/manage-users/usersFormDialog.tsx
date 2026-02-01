"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser, updateUser } from "@/services/admin/usersManagements";
import { fetchInterests } from "@/services/auth/fetchInterests";
import { IUser } from "@/types/events.interface";
import Image from "next/image";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IUserManagementFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;

  user?: IUser;
}

const UsersFormDialog = ({
  open,
  onClose,
  onSuccess,
  user,
}: IUserManagementFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!user;

  const [interests, setInterests] = React.useState<
    { id: number; name: string }[]
  >([]);
  const [selectedInterests, setSelectedInterests] = React.useState<number[]>(
    [],
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

  // Change it to this:
  const [selectedFile, setSelectedFile] = useState<File | string | null>(
    user?.profile.image ? user.profile.image : null,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (selectedFile) {
      setSelectedFile(null);
    }
    formRef.current?.reset();
    onClose();
  };

  const action = isEdit
    ? (prevState: Record<string, unknown>, formData: FormData) =>
        updateUser(user!.id, prevState, formData)
    : createUser;

  const [state, formAction, pending] = useActionState(action, null);

  const prevStateRef = useRef(state);

  useEffect(() => {
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;

    if (state?.success) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state && !state.success && state.message) {
      toast.error(state.message);
      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        if (selectedFile instanceof File) {
          dataTransfer.items.add(selectedFile);
        }
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSuccess, onClose, selectedFile]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          {/* Title Field */}
          <Field>
            <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              defaultValue={
                state?.formData?.fullName ||
                (isEdit ? user?.profile.fullName : "")
              }
            />
            <InputFieldError field="title" state={state} />
          </Field>
          {/* Description Field */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              placeholder="john.doe@example.com"
              defaultValue={
                state?.formData?.email || (isEdit ? user?.email : "")
              }
            />
            <InputFieldError field="email" state={state} />
          </Field>
          {/* Password Field */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter a strong password"
            />
            <InputFieldError field="password" state={state} />
          </Field>

          {/* Confirm Password */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />

            <InputFieldError field="confirmPassword" state={state} />
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

          {/* Image/File Upload Field */}

          <Field>
            <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
            {selectedFile && (
              <div>
                <Image
                  src={
                    typeof selectedFile === "string"
                      ? selectedFile
                      : URL.createObjectURL(selectedFile)
                  }
                  alt="Event Photo Preview"
                  width={50}
                  height={50}
                  className="mb-2 rounded-full"
                />
              </div>
            )}
            <Input
              ref={fileInputRef}
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a profile photo for the user
            </p>
            <InputFieldError state={state} field="file" />
          </Field>

          {/* Interest Selection */}
          <Field className="md:col-span-2" hidden={isEdit}>
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

          <div className="flex justify-end gap-2 pt-4">
            <input
              type="hidden"
              name="interests"
              value={JSON.stringify(selectedInterests)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isEdit ? false : pending || selectedInterests.length === 0
              }
            >
              {pending
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                  ? "Update User"
                  : "Create User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsersFormDialog;
