import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { singleUser } from "@/services/admin/usersManagements";

export const metadata = {
  title: "User Details | Users & Activities",
  description: "View complete user information",
};

interface UserDetailsPageProps {
  params: { id: string };
}

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const { id } = await params;
  const res = await singleUser(id);
  console.log(res);

  const user = res.data;

  const profile = user?.profile;

  if (!user) {
    return (
      <div className=" mx-auto  ">
        <p className="text-muted-foreground">User not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4  max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">
          {profile?.fullName ?? "Unnamed User"}
        </h1>
        <Badge variant="secondary">{user.role}</Badge>
      </div>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground">Created At</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Info */}
      {profile && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Full Name</p>
              <p className="font-medium">{profile.fullName}</p>
            </div>

            <Separator />

            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{profile.location || "N/A"}</p>
            </div>

            <Separator />

            <div>
              <p className="text-muted-foreground">Bio</p>
              <p className="font-medium">{profile.bio || "No bio provided"}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
