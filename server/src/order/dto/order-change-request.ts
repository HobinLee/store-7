import { OrderStatus } from "../entity/order";

export interface OrderChangeRequest {
  status: OrderStatus;
}
