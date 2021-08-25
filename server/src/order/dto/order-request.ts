import { OrderStatus } from "../entity/order";

export interface OrderRequest {
  productId: number;
  addressee: string;
  productOptionId?: number;
  amount: number;
  destination: string;
  status: OrderStatus;
  request?: string;
  price: number;
}

export interface CreateOrderRequest extends OrderRequest {
  user: {
    id: number;
  };
  product: {
    id: number;
  };
}
