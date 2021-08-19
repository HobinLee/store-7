import { GET, PATCH, POST } from "@/utils/axios";

// POST /orders 주문하기
export const postOrder = ({ data }) => POST("/orders", data);

// GET /orders/:orderNum 주문번호로 주문 가져오기
export const getOrdersByOrderNum = ({ orderNum }) => GET(`/orders/${orderNum}`);

// GET /orders 백오피스 주문리스트 보기
export const getOrders = () => GET("/orders");

// PATCH /orders/:id 백오피스 주문 상태 변경
export const patchOrders = ({ id, data }) => PATCH(`/orders/${id}`, data);

// GET /orders/:id 백오피스 주문 상세정보 보기
export const getOrder = ({ id }) => GET(`/orders/${id}`);
