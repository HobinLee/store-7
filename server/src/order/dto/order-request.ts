export interface OrderRequest {
  productId: number;
  addressee: string;
  productOptionId?: number;
  amount: number;
  destination: string;
  status: string;
}

export interface CreateOrderRequest extends OrderRequest {
  userId: number;
}
