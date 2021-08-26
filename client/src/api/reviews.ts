import { DELETE, GET, PATCH, POST } from "@/utils/axios";

// POST /reviews
export const postReview = (data: FormData) => POST("/reviews", data);

// PATCH /reviews/:id
export const patchReview = ({ id, data }: { id: number; data: FormData }) =>
  PATCH(`/reviews/${id}`, data);

// DELETE /reviews/:id
export const deleteReview = ({ id }: { id: number }) =>
  DELETE(`/reviews/${id}`);
