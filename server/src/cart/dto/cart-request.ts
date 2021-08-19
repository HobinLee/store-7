export interface CartRequest {
  productOptionId?: number;
  amount: number;
  product: {
    id: number;
  };
}

export interface CreateCartRequest extends CartRequest {
  user: {
    id: number;
  };
}

export interface CartModifyRequest {
  productOptionId?: number;
  amount?: number;
}
