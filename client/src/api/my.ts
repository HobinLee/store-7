import {
  CartType,
  DestinationType,
  MyInfoType,
  ReviewType,
} from "@/shared/type";
import { GET, PATCH } from "@/utils/axios";
import { useQuery } from "react-query";

const getMyInfo = (): Promise<MyInfoType> => GET("/my/info");
export const useUserInfo = () => useQuery(["userInfo"], () => getMyInfo());

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
const getMyReviews = () => GET("/my/reviews");
export const useMyReviews = () => useQuery(["reviews"], () => getMyReviews());

// GET /my/questions 내 문의
const getMyQuestions = () => GET("/my/questions");
export const useMyQuestions = () =>
  useQuery(["questions"], () => getMyQuestions());

// GET /my/orders?target 내 현재 주문목록
// const getMyOrders = ({ params }) => GET("/my/orders", params);
// export const useMyOrders = () => useQuery([], () => getMyOrders());

// GET /my/wishes 내 찜목록
const getMyWishes = () => GET("/my/wishes");
export const useMyWishes = () => useQuery(["wishes"], () => getMyWishes());
