import { CartType, DestinationType } from "@/shared/type";
import { GET, PATCH } from "@/utils/axios";
import { useQuery } from "react-query";

// GET /my/info 내 정보
export const getMe = () => GET("/my/info");

// PATCH /my/info 내 정보 수정
export const patchMe = ({ data }) => PATCH("/my/info", data);

// GET /my/carts 내 장바구니
const getMyCarts = (): Promise<CartType> => GET("/my/carts");
export const useMyCarts = () => useQuery(["carts"], () => getMyCarts());

// GET /my/destinations
const getMyDestinations = (): Promise<DestinationType[]> =>
  GET("/my/destinations");
export const useMyDestinations = () =>
  useQuery(["destinations"], () => getMyDestinations());

// GET /my/reviews 내 리뷰
export const getMyReviews = () => GET("/my/reviews");

// GET /my/questions 내 문의
export const getMyQuestions = () => GET("/my/questions");

// GET /my/orders?target 내 현재 주문목록
export const getMyOrders = ({ params }) => GET("/my/orders", params);

// GET /my/wishes 내 찜목록
export const getMyWishes = () => GET("/my/wishes");
