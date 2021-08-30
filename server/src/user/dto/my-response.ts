import { CartResponse } from "@/cart/dto/cart-response";
import { User } from "../entity/user";
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
  email: string;
  destinations: Destination[];

  static of(user: User): MyInfoResponse {
    const name = user.name,
      grade = user.grade,
      phoneNumber = user.phoneNumber,
      profile = user.profile,
      email = user.email,
      destinations = user.destinations;

    return {
      name,
      grade,
      phoneNumber,
      profile,
      email,
      destinations,
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
  stock: number;
  image: string;
  createdAt: Date;
  wishCount: number;

  static of(wishes: Wish[]): MyWishResponse[] {
    return wishes.map((wish) => {
      const {
        id,
        name,
        price,
        stock,
        discountRate,
        images,
        createdAt,
        wishCount,
      } = wish.product;
      return {
        id,
        name,
        originPrice: price,
        discountRate,
        stock,
        price: getDiscountedPrice(discountRate, price),
        image: getThumbnailImage(images),
        isWish: true,
        createdAt,
        wishCount,
      };
    });
  }
}

const getDiscountedPrice = (discountRate, price) => {
  return discountRate === 0 ? price : price * ((100 - discountRate) / 100);
};

const getThumbnailImage = (images) => {
  if (!images || images.length == 0) return "";
  return images[0].id;
};
