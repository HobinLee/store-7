import { DELETE, GET, PATCH, POST } from "@/utils/axios";
import { useQuery } from "react-query";

// GET /reviews?num
// const getReviews = (params?: { num: number }) => GET("/reviews", params);
// export const useReviews = (params?: { num: number }) =>
//   useQuery(["reviews"], () => getReviews(params));

// POST /reviews
export const postReview = (data: FormData) => POST("/reviews", data);

// PATCH /reviews/:id
export const patchReview = (id: number) => PATCH(`/reviews/${id}`);

// DELETE /reviews/:id
export const deleteReview = (id: number) => DELETE(`/reviews/${id}`);
