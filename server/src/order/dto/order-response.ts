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
  request: string;
  createdAt: Date;

  static of(order: Order): OrderResponse {
    const id = order.id,
      productId = order.product.id,
      userId = order.user.id,
      addressee = order.addressee,
      productOptionId = order.productOptionId,
      amount = order.amount,
      destination = order.destination,
      status = order.status,
      request = order.request;

    return {
      id,
      productId,
      userId,
      addressee,
      productOptionId,
      amount,
      destination,
      status,
      request,
    } as OrderResponse;
  }
}
