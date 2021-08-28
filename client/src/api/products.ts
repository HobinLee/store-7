import {
  ProductElementType,
  ProductType,
  QuestionType,
  ReviewListType,
} from "@/shared/type";
import { DELETE, GET, POST } from "@/utils/axios";
import { useQuery } from "react-query";

export interface ProductParams {
  category?: number;
  subCategory?: number;
  order?: string;
  keyword?: string;
  page?: number;
  size?: number;
}
export interface ReviewParams {
  sortBy?: "popularity" | "latest";
  isPhotoOnly?: boolean;
  rating?: string;
}

export const getAllProductsByKeyword = async (keyword: string) =>
  await GET("/admin/products", { keyword });

// GET /products?order?category?subcategory?keyword? 상품 목록
export const getProducts = async (
  params: ProductParams
): Promise<ProductElementType[]> => {
  return await GET("/products", params);
};
export const useProducts = (params: ProductParams) =>
  useQuery(["products", params], () => getProducts(params));

// GET /products/:id 상품 상세 정보
const getProduct = (id: number): Promise<ProductType> => GET(`/products/${id}`);
export const useProduct = (id: number) =>
  useQuery(["product", id], () => getProduct(id));

// GET /products/:id/reviews?sortBy?isPhotoOnly?rating? 리뷰 리스트
const getProductReviews = (
  id: number,
  params: ReviewParams
): Promise<ReviewListType> => GET(`/products/${id}/reviews`, params);
export const useProductReviews = (id: number, params: ReviewParams) =>
  useQuery(["reviews", id, params], () => getProductReviews(id, params));

// GET /products/:id/questions 문의 리스트
const getProductQuestions = (id: number): Promise<QuestionType[]> =>
  GET(`/products/${id}/questions`);
export const useProductQuestions = (id: number) =>
  useQuery(["questions", id], () => getProductQuestions(id));

// POST /products 상품 등록
export const postProduct = ({ data }) => POST("/products", data);

// DELETE /products/:id 상품 삭제
export const deleteProduct = ({ id }) => DELETE(`/products/${id}`);
