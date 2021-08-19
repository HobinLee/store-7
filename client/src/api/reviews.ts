import { DELETE, GET, PATCH, POST } from "@/utils/axios";

// GET /reviews?num
export const getReviews = ({ params }) => GET("/reviews", params);

// POST /reviews
export const postReview = ({ data }) => POST("/reviews", data);

// PATCH /reviews/:id
export const patchReview = ({ id }) => PATCH(`/reviews/${id}`);

// DELETE /reviews/:id
export const deleteReview = ({ id }) => DELETE(`/reviews/${id}`);
