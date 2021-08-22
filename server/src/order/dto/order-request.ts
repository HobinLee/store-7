export interface OrderRequest {
  productId: number;
  addressee: string;
  productOptionId?: number;
  amount: number;
  destination: string;
  status: string;
  request?: string;
}

export interface CreateOrderRequest extends OrderRequest {
  user: {
    id: number;
  };
  product: {
    id: number;
  };
}
