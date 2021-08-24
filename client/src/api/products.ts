import { ProductType, QuestionType, ReviewListType } from "@/shared/type";
import { DELETE, GET, POST } from "@/utils/axios";
import { useQuery } from "react-query";

export interface productParams {
  category?: number;
  subCategory?: number;
  order?: string;
  keyword?: number;
  page?: number;
  size?: number;
}
// GET /products?order?category?subcategory?keyword? 상품 목록
export const getProducts = async (params: productParams) =>
  await GET("/products", params);
export const useProducts = (params: productParams) =>
  useQuery(["product", params], () => getProducts(params));

// GET /products/:id 상품 상세 정보
const getProduct = (id: number): Promise<ProductType> => GET(`/products/${id}`);
export const useProduct = (id: number) =>
  useQuery(["product", id], () => getProduct(id));

// GET /products/:id/reviews 리뷰 리스트
const getProductReviews = (id: number): Promise<ReviewListType> =>
  GET(`/products/${id}/reviews`);
export const useProductReviews = (id: number) =>
  useQuery(["reviews", id], () => getProductReviews(id));

// GET /products/:id/questions 문의 리스트
const getProductQuestions = (id: number): Promise<QuestionType[]> =>
  GET(`/products/${id}/questions`);
export const useProductQuestions = (id: number) =>
  useQuery(["questions", id], () => getProductQuestions(id));

// POST /products 상품 등록
export const postProduct = ({ data }) => POST("/products", data);

// DELETE /products/:id 상품 삭제
export const deleteProduct = ({ id }) => DELETE(`/products/${id}`);
