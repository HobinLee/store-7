import { Cart } from "../entity/cart";

export class CartResponse {
  id: number;
  userId: number;
  productId: number;
  productOptionId: number;
  amount: number;

  constructor(response: CartResponse) {
    this.id = response.id;
    this.userId = response.userId;
    this.productId = response.productId;
    this.productOptionId = response.productOptionId;
    this.amount = response.amount;
  }

  static of(cart: Cart): CartResponse {
    const id = cart.id,
      userId = cart.userId,
      productId = cart.productId,
      productOptionId = cart.productOptionId,
      amount = cart.amount;

    return new CartResponse({
      id,
      userId,
      productId,
      productOptionId,
      amount,
    });
  }
}
