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
  grade: string;
  phoneNumber: string;
  profile: string;
  destinations: Destination[];

  static of(user: User): MyInfoResponse {
    const name = user.name,
      grade = user.grade,
      phoneNumber = user.phoneNumber,
      profile = user.profile,
      destinations = user.destinations;

    return {
      name,
      grade,
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
      productId = order.product.id,
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
      productId = order.product.id,
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

  constructor(response: MyWishResponse) {
    this.id = response.id;
    this.name = response.name;
    this.price = response.price;
    this.originPrice = response.originPrice;
    this.discountRate = response.discountRate;
    this.isWish = response.isWish;
    this.amount = response.amount;
    this.image = response.image;
  }

  static of(wishes: Wish[]): MyWishResponse[] {
    return wishes.map((wish) => {
      console.log(2, wish);
      const {
        id,
        name,
        price,
        stock,
        discountRate,
        getDiscountedPrice,
        getThumbnailImage,
      } = wish.product;
      // get 함수들 사용 불가. of가 static이라서 this.discountRate에 접근 불가능해서 그런듯
      return new MyWishResponse({
        id,
        name,
        originPrice: price,
        discountRate,
        amount: stock,
        price: price,
        image: "a",
        isWish: true,
      });
    });
  }
}
