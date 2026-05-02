import { useMutation } from "@tanstack/react-query";
import { apiUrl } from "@/lib/api";

export type SubmitReviewPayload = {
  projectId: number;
  firstName: string;
  lastName: string;
  rating: number;
  comment: string;
  profilePicture?: File;
};

export function useSubmitReview() {
  return useMutation({
    mutationFn: async (data: SubmitReviewPayload) => {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("rating", String(data.rating));
      formData.append("comment", data.comment);
      if (data.profilePicture) {
        formData.append("profilePicture", data.profilePicture);
      }

      const res = await fetch(apiUrl(`/api/projects/${data.projectId}/reviews`), {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let message = "Failed to submit review";
        try {
          const body = (await res.json()) as { message?: string };
          if (body.message) message = body.message;
        } catch {
          /* ignore */
        }
        throw new Error(message);
      }

      return (await res.json()) as { id: number };
    },
  });
}
