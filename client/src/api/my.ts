import {
  CartType,
  DestinationType,
  MyInfoType,
  MyOrderType,
  ReviewType,
} from "@/shared/type";
import { DELETE, GET, PATCH, POST } from "@/utils/axios";
import { useQuery } from "react-query";

const getMyInfo = (): Promise<MyInfoType> => GET("/my/info");
export const useMyInfo = () => useQuery(["userInfo"], () => getMyInfo());

// PATCH /my/info 내 정보 수정
export const patchMyInfo = (data: { name: string; phoneNumber: string }) =>
  PATCH("/my/info", { data });

// GET /my/carts 내 장바구니
const getMyCarts = (): Promise<CartType> => GET("/my/carts");
export const useMyCarts = () => useQuery(["carts"], () => getMyCarts());

// GET /my/destinations
const getMyDestinations = (): Promise<DestinationType[]> =>
  GET("/my/destinations");
export const useMyDestinations = () =>
  useQuery(["destinations"], () => getMyDestinations());

// GET /my/reviews 내 리뷰
const getMyReviews = (): Promise<ReviewType[]> => GET("/my/reviews");
export const useMyReviews = () => useQuery(["reviews"], () => getMyReviews());

// GET /my/questions 내 문의
const getMyQuestions = () => GET("/my/questions");
export const useMyQuestions = () =>
  useQuery(["questions"], () => getMyQuestions());

// GET /my/orders 내 주문목록
const getMyOrders = (): Promise<MyOrderType[]> => GET(`/my/orders`);
export const useMyOrders = () =>
  useQuery(["filteredOrders"], () => getMyOrders());

// GET /my/wishes 내 찜목록
const getMyWishes = () => GET("/my/wishes");
export const useMyWishes = () => useQuery(["wishes"], () => getMyWishes());

export const postWishProduct = (productId: number) =>
  POST("/my/wishes", { productId });

export const deleteWishProduct = (productId: number) =>
  DELETE(`/my/wishes/${productId}`);
