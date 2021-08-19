import { Cart } from "../entity/cart";

export class CartResponse {
  name: string;
  price: number;
  deliveryCost: number;
  images: string[];
  productOptionId: number;
  amount: number;

  static of(cart: Cart): CartResponse {
    const name = cart.product.name,
      price = cart.product.getDiscountedPrice(),
      deliveryCost = cart.product.deliveryCost,
      images = cart.product.getImagesAsString(),
      productOptionId = cart.productOptionId,
      amount = cart.amount;

    return {
      name,
      price,
      deliveryCost,
      images,
      productOptionId,
      amount,
    } as CartResponse;
  }
}
