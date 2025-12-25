"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateTime } from "@/lib/utils";
import { createEvent, updateEvents } from "@/services/event/eventsManagements";
import { ICategory, IEvents } from "@/types/events.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IEventManagementFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories?: ICategory[];
  event?: IEvents;
}

const EventsFormDialog = ({
  open,
  onClose,
  onSuccess,
  event,
  categories,
}: IEventManagementFormDialogProps) => {
  console.log(event);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!event;
  const [selectedFile, setSelectedFile] = useState<File | string | null>(null);

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
    ? (prevState: any, formData: FormData) =>
        updateEvents(event!.id, prevState, formData)
    : createEvent;

  const [state, formAction, pending] = useActionState(action, null);

  const prevStateRef = useRef(state);

  useEffect(() => {
    if (open) {
      if (isEdit && event?.image) {
        // এডিট মোডে থাকলে ডাটাবেজ থেকে আসা ইমেজ দেখাবে
        setSelectedFile(event.image);
      } else {
        // নতুন ইভেন্ট তৈরির সময় প্রিভিউ খালি করে দেবে
        setSelectedFile(null);
      }
    }
  }, [event, open, isEdit]);

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
          <DialogTitle>{isEdit ? "Edit Event" : "Add New Event"}</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          {/* Title Field */}
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Umrah Hazz - 4"
              defaultValue={
                state?.formData?.title || (isEdit ? event?.title : "")
              }
            />
            <InputFieldError field="title" state={state} />
          </Field>
          {/* Description Field */}
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Input
              id="description"
              name="description"
              placeholder="Event description"
              defaultValue={
                state?.formData?.description ||
                (isEdit ? event?.description : "")
              }
            />
            <InputFieldError field="description" state={state} />
          </Field>
          {/* Location Field */}
          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              id="location"
              name="location"
              placeholder="Full address or trail name"
              defaultValue={
                state?.formData?.location || (isEdit ? event?.location : "")
              }
            />
            <InputFieldError field="location" state={state} />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Field */}
            <Field>
              <FieldLabel htmlFor="date">Event Date & Time</FieldLabel>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                defaultValue={formatDateTime(
                  state?.formData?.date || (isEdit ? event?.date : "")
                )}
              />
              <InputFieldError field="date" state={state} />
            </Field>

            {/* Category Field */}
            <Field>
              <FieldLabel htmlFor="categoryId">
                Select a category (Required)
              </FieldLabel>

              <Select
                name="categoryId"
                defaultValue={
                  state?.formData?.categoryId ||
                  (isEdit ? event?.categoryId : "")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <InputFieldError field="categoryId" state={state} />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Min Participants */}
            <Field>
              <FieldLabel htmlFor="minParticipants">
                Min Participants
              </FieldLabel>
              <Input
                id="minParticipants"
                name="minParticipants"
                type="number"
                defaultValue={
                  state?.formData?.minParticipants ||
                  (isEdit ? event?.minParticipants : "")
                }
              />
              <InputFieldError field="minParticipants" state={state} />
            </Field>

            {/* Max Participants */}
            <Field>
              <FieldLabel htmlFor="maxParticipants">
                Max Participants
              </FieldLabel>
              <Input
                id="maxParticipants"
                name="maxParticipants"
                type="number"
                defaultValue={
                  state?.formData?.maxParticipants ||
                  (isEdit ? event?.maxParticipants : "")
                }
              />
              <InputFieldError field="maxParticipants" state={state} />
            </Field>

            {/* Fee Field */}
            <Field>
              <FieldLabel htmlFor="fee">Fee (Price)</FieldLabel>
              <Input
                id="fee"
                name="fee"
                type="number"
                defaultValue={
                  state?.formData?.fee || (isEdit ? event?.fee : "")
                }
              />
              <InputFieldError field="fee" state={state} />
            </Field>
          </div>
          {/* Image/File Upload Field */}

          <Field>
            <FieldLabel htmlFor="file">Event Photo</FieldLabel>
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
              Upload a event photo for the event
            </p>
            <InputFieldError state={state} field="file" />
          </Field>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Event"
                : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventsFormDialog;
