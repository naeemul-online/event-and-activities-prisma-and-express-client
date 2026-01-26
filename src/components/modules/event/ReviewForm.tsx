/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitEventReview } from "@/services/event/eventsManagements";
import { Star } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";

export const ReviewForm = ({ eventId, onSuccess }: any) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setLoading(true);
      await submitEventReview({
        eventId,
        rating,
        comment,
      });

      toast.success("Review submitted");
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <h3 className="font-semibold">Write a Review</h3>

      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-6 w-6 cursor-pointer ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
            }`}
            onClick={() => setRating(i + 1)}
          />
        ))}
      </div>

      <Textarea
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
};
