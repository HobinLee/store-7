import { DELETE, GET, PATCH, POST } from "@/utils/axios";

// POST /reviews
export const postReview = (data: FormData) => POST("/reviews", data);

// PATCH /reviews/:id
export const patchReview = (id: number) => PATCH(`/reviews/${id}`);

// DELETE /reviews/:id
export const deleteReview = (id: number) => DELETE(`/reviews/${id}`);
