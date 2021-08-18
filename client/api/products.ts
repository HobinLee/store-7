import { DELETE, GET, POST } from "@/utils/axios";

// GET /products?order?category?subcategory?keyword? 상품 목록
export const getProducts = ({ params }) => GET("/products", params);

// GET /products/:id 상품 상세 정보
export const getProduct = ({ id }) => GET(`/products/${id}`);

// GET /products/:id/reviews 리뷰 리스트
export const getProductReviews = ({ id }) => GET(`/products/${id}/reviews`);

// GET /products/:id/questions 문의 리스트
export const getProductQuestions = ({ id }) => GET(`/products/${id}/questions`);

// POST /products 상품 등록
export const postProduct = ({ data }) => POST("/products", data);

// DELETE /products/:id 상품 삭제
export const deleteProduct = ({ id }) => DELETE(`/products/${id}`);
