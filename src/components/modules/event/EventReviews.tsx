/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const EventReviews = ({ reviews }: { reviews: any[] }) => {
  if (!reviews.length) {
    return <p className="text-muted-foreground text-sm">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={review.user.profile?.image ?? undefined} />
                <AvatarFallback>
                  {review.user.profile?.fullName
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <p className="font-medium">{review.user.profile?.fullName}</p>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {review.comment && (
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};
