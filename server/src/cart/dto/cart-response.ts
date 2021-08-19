import { Cart } from "../entity/cart";
import { ProductDTO } from "./product-DTO";

export class CartResponse {
  id: number;
  userId: number;
  product: ProductDTO;
  productOptionId: number;
  amount: number;

  static of(cart: Cart): CartResponse {
    const id = cart.id,
      userId = cart.user.id,
      product = {
        name: cart.product.name,
        price: cart.product.getDiscountedPrice(),
        deliveryCost: cart.product.deliveryCost,
        images: cart.product.getImagesAsString(),
      },
      productOptionId = cart.productOptionId,
      amount = cart.amount;

    return {
      id,
      userId,
      product,
      productOptionId,
      amount,
    } as CartResponse;
  }
}
