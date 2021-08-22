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
  price: number;
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
      request = order.request,
      price = order.price,
      createdAt = order.createdAt;

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
      price,
      createdAt,
    };
  }
}
