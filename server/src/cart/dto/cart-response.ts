import { ProductOption } from "@/product/entity/option";
import { Cart } from "../entity/cart";

export class CartResponse {
  id: number;
  name: string;
  price: number;
  deliveryCost: number;
  images: string[];
  productOptionId: number;
  options: ProductOption[];
  amount: number;
  productId: number;

  static of(cart: Cart): CartResponse {
    const id = cart.id,
      name = cart.product.name,
      price = cart.product.getDiscountedPrice() * cart.amount,
      deliveryCost = cart.product.deliveryCost,
      images = cart.product.getImagesAsString(),
      productOptionId = cart.productOptionId,
      amount = cart.amount,
      productId = cart.product.id,
      options = cart.product.options.map((option) => {
        return {
          id: option.id,
          value: option.value,
          stock: option.stock,
        };
      });

    return {
      id,
      name,
      price,
      deliveryCost,
      images,
      productOptionId,
      options,
      amount,
      productId,
    } as CartResponse;
  }
}
