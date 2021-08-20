import { CartResponse } from "@/cart/dto/cart-response";
import { Review } from "@/product/entity/review";
import { User } from "../entity/user";
import { Order } from "@/order/entity/order";

export interface MyCartsResponse {
  totalPrice: number;
  totalDelivery: number;
  totalPayment: number;
  items: CartResponse[];
}

export interface Destination {
  name: string;
  postCode: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
}

export class MyBasicInfoResponse {
  name: string;
  grage: string;

  static of(user: User): MyBasicInfoResponse {
    const name = user.name,
      grage = user.grade;

    return {
      name,
      grage,
    };
  }
}

export interface MyInfoResponse extends MyBasicInfoResponse {
  phoneNumber: string;
  profile: string;
  destinations: Destination[];
}

export class MyReviewResponse {
  id: number;
  rate: number;
  content: string;
  image?: string;
  authorName: string;

  static of(review: Review): MyReviewResponse {
    const id = review.id,
      rate = review.rate,
      content = review.content,
      image = review.image,
      authorName = review.author.name;

    return {
      id,
      rate,
      content,
      image,
      authorName,
    };
  }
}

export class MyOredersResponse {
  id: number;
  productId: number;
  userId: number;
  addressee: string;
  productOptionId: number;
  amount: number;
  destination: string;
  status: string;
  createdAt: Date;

  static of(order: Order): MyOredersResponse {
    const id = order.id,
      productId = order.productId,
      userId = order.userId,
      addressee = order.addressee,
      productOptionId = order.productOptionId,
      amount = order.amount,
      destination = order.destination,
      status = order.status,
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
      createdAt,
    };
  }
}

export class MyCurrentOredersResponse {
  id: number;
  productId: number;
  userId: number;
  addressee: string;
  productOptionId: number;
  amount: number;
  destination: string;
  status: string;
  createdAt: Date;
  reviewId: number;

  static of(order: Order): MyCurrentOredersResponse {
    const id = order.id,
      productId = order.productId,
      userId = order.userId,
      addressee = order.addressee,
      productOptionId = order.productOptionId,
      amount = order.amount,
      destination = order.destination,
      status = order.status,
      createdAt = order.createdAt,
      reviewId = order.reviewId;

    return {
      id,
      productId,
      userId,
      addressee,
      productOptionId,
      amount,
      destination,
      status,
      createdAt,
      reviewId,
    };
  }
}
