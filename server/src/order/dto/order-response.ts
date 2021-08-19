import { Order } from "../entity/order";

export class OrderResponse {
  id: number;
  productId: number;
  userId: number;
  addressee: string;
  productOptionId: number;
  amount: number;
  destination: string;
  status: string;
  createdAt: Date;

  static of(order: Order): OrderResponse {
    const id = order.id,
      productId = order.productId,
      userId = order.userId,
      addressee = order.addressee,
      productOptionId = order.productOptionId,
      amount = order.amount,
      destination = order.destination,
      status = order.status;

    return {
      id,
      productId,
      userId,
      addressee,
      productOptionId,
      amount,
      destination,
      status,
    } as OrderResponse;
  }
}
