import { GET, POST, DELETE } from "@/utils/axios";

// GET /carts 장바구니 목록
export const getCarts = () => GET("/carts");

// POST /carts 장바구니 담기
export const postCart = ({ data }) => POST("/carts", data);

// PATCH /carts/:id 장바구니 아이템 옵션/개수 변경
export const patchCart = ({ id }: { id: number }) => POST(`/carts/${id}`, {});

// DELETE /carts/:id 장바구니 아이템 삭제
export const deleteCart = ({ id }: { id: number }) => DELETE(`/carts/${id}`);
