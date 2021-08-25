import { OrderStatus } from "../entity/order";
import { Order } from "../entity/order";

export class OrderResponse {
  id: number;
  productId: number;
  userId: number;
  addressee: string;
  productOptionId: number;
  amount: number;
  destination: string;
  status: OrderStatus;
  request: string;
  price: number;
  productName: string;
  createdAt: Date;
  reviewId?: number;
  image: string;

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
      createdAt = order.createdAt,
      productName = order.product.name,
      reviewId = order.review ? order.review.id : 0,
      image = order.product.images[0] ? order.product.images[0].id : "bed";

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
      productName,
      reviewId,
      image,
    };
  }
}
