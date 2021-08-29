import { DELETE, GET, PATCH, POST } from "@/utils/axios";
import { useQuery } from "react-query";

// GET /reviews

const getRecentReviews = (size: number) => GET("/reviews/recent", { size });
export const useRecentReviews = (size: number) =>
  useQuery(["recentReviews", size], () => getRecentReviews(size));

// POST /reviews
export const postReview = (data: FormData) => POST("/reviews", data);

// PATCH /reviews/:id
export const patchReview = ({ id, data }: { id: number; data: FormData }) =>
  PATCH(`/reviews/${id}`, data);

// DELETE /reviews/:id
export const deleteReview = ({ id }: { id: number }) =>
  DELETE(`/reviews/${id}`);
