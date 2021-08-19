export interface CartRequest {
  productId: number;
  productOptionId?: number;
  amount: number;
}

export interface CreateCartRequest extends CartRequest {
  userId: number;
}

export interface CartModifyRequest {
  productOptionId?: number;
  amount?: number;
}
