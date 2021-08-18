export interface OrderRequest {
  productId: number;
  userId: number;
  orderNum: string;
  addressee: string;
  productOptionId: number;
  amount: number;
  destination: string;
  status: string;
}

export interface OrderResponse {
  id: number;
  productId: number;
  userId: number;
  orderNum: string;
  addressee: string;
  productOptionId: number;
  amount: number;
  destination: string;
  status: string;
}
