"use client";

import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface";

interface MyProfileProps {
  userInfo: UserInfo;
}

export default function MyProfile({ userInfo }: MyProfileProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const profile = userInfo?.profile;

  // ---------------------------
  // Image Preview
  // ---------------------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ---------------------------
  // Submit Handler
  // ---------------------------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateMyProfile(formData);

      if (res?.success) {
        setSuccess(res.message || "Profile updated successfully");
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(res?.message || "Failed to update profile");
      }
    });
  };

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Image */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={previewImage || profile?.image || undefined}
                  />
                  <AvatarFallback className="text-3xl">
                    {getInitials(profile?.fullName || userInfo?.email)}
                  </AvatarFallback>
                </Avatar>

                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground cursor-pointer hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isPending}
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <div className="text-center">
                <p className="font-semibold text-lg">{profile?.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {userInfo.email}
                </p>
                <p className="text-xs mt-1 capitalize text-muted-foreground">
                  {userInfo.role}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-500/10 px-4 py-2 text-sm text-green-600">
                  {success}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="profile.fullName"
                    defaultValue={profile?.fullName}
                    disabled={isPending}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="profile.location"
                    defaultValue={profile?.location || ""}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="profile.bio"
                    defaultValue={profile?.bio || ""}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={userInfo.email} disabled />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
