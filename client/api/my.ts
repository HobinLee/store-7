import { GET, PATCH } from "@/utils/axios";

// GET /my 내 정보
export const getMe = () => GET("/my");

// PATCH /my 내 정보 수정
export const patchMe = ({ data }) => PATCH("/my", data);

// GET /my/reviews 내 리뷰
export const getMyReviews = () => GET("/my/reviews");

// GET /my/questions 내 문의
export const getMyQuestions = () => GET("/my/questions");

// GET /my/orders?target 내 현재 주문목록
export const getMyOrders = ({ params }) => GET("/my/orders", params);

// GET /my/wishes 내 찜목록
export const getMyWishes = () => GET("/my/wishes");