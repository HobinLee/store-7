import { Cart } from "../entity/cart";

export class CartResponse {
  id: number;
  name: string;
  price: number;
  deliveryCost: number;
  images: string[];
  productOptionId: number;
  amount: number;

  static of(cart: Cart): CartResponse {
    const id = cart.id,
      name = cart.product.name,
      price = cart.product.getDiscountedPrice() * cart.amount,
      deliveryCost = cart.product.deliveryCost,
      images = cart.product.getImagesAsString(),
      productOptionId = cart.productOptionId,
      amount = cart.amount;

    return {
      id,
      name,
      price,
      deliveryCost,
      images,
      productOptionId,
      amount,
    } as CartResponse;
  }
}
