export interface CartRequest {
  userId: number;
  productId: number;
  productOptionId: number;
  amount: number;
}

export interface CartModifyRequest {
  productOptionId?: number;
  amount?: number;
}

export interface CartResponse {
  id: number;
  userId: number;
  productId: number;
  productOptionId: number;
  amount: number;
}
