import { Cart } from "../entity/cart";

export class CartResponse {
  id: number;
  userId: number;
  productId: number;
  productOptionId: number;
  amount: number;

  static of(cart: Cart): CartResponse {
    const id = cart.id,
      userId = cart.userId,
      productId = cart.productId,
      productOptionId = cart.productOptionId,
      amount = cart.amount;

    return {
      id,
      userId,
      productId,
      productOptionId,
      amount,
    } as CartResponse;
  }
}
