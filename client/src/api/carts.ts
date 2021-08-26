import { POST, DELETE, PATCH } from "@/utils/axios";

// POST /carts 장바구니 담기
export const postCart = (data: {
  data: {
    product: {
      id: number;
    };
    productOptionId?: number;
    amount: number;
  };
}) => POST("/carts", data);

// PATCH /carts/:id 장바구니 아이템 옵션/개수 변경
export const patchCart = (
  id: number,
  data: {
    productOptionId?: number;
    amount?: number;
  }
) => PATCH(`/carts/${id}`, data);

// DELETE /carts/:id 장바구니 아이템 삭제
export const deleteCart = (id: number) => DELETE(`/carts/${id}`);
