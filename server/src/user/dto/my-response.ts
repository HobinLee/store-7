import { CartResponse } from "@/cart/dto/cart-response";
import { Review } from "@/product/entity/review";
import { User } from "../entity/user";
import { Order } from "@/order/entity/order";
import { Destination } from "@/destination/entity/destination";
import { Wish } from "../entity/wish";

export interface MyCartsResponse {
  totalPrice: number;
  totalDelivery: number;
  totalPayment: number;
  items: CartResponse[];
}

export class MyInfoResponse {
  name: string;
  grage: string;
  phoneNumber: string;
  profile: string;
  destinations: Destination[];

  static of(user: User): MyInfoResponse {
    const name = user.name,
      grage = user.grade,
      phoneNumber = user.phoneNumber,
      profile = user.profile,
      destinations = user.destinations;

    return {
      name,
      grage,
      phoneNumber,
      profile,
      destinations,
    };
  }
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
      authorName = review.order.user.name;

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
      userId = order.user.id,
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
      userId = order.user.id,
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

export class MyWishResponse {
  id: number;
  name: string;
  price: number;
  originPrice: number;
  discountRate: number;
  isWish: boolean;
  amount: number;
  image: string;

  static of(wishes: Wish[]): MyWishResponse[] {
    return wishes.map((wish) => {
      const {
        id,
        name,
        price,
        discountRate,
        getDiscountedPrice,
        stock,
        getThumbnailImage,
      } = wish.product;

      return {
        id,
        name,
        price: getDiscountedPrice(),
        originPrice: price,
        discountRate,
        amount: stock,
        image: getThumbnailImage(),
        isWish: true,
      };
    });
  }
}
