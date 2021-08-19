import { Carts } from "@/cart/domain/carts";
import { CartResponse } from "@/cart/dto/cart-response";
import { Injectable } from "@nestjs/common";
import { MyCartsResponse } from "../dto/my-response";

@Injectable()
export class MyService {
  constructor(private readonly carts: Carts) {}

  async findMyCarts(userId: number): Promise<MyCartsResponse> {
    const data = await this.carts.findCartsByUserId(userId);

    const totalPrice = data.reduce((sum, cart) => sum + cart.product.price, 0);
    const totalDelivery = data.reduce(
      (sum, cart) => sum + cart.product.deliveryCost,
      0
    );
    const totalPayment = totalPrice + totalDelivery;

    return {
      totalPrice,
      totalDelivery,
      totalPayment,
      items: data.map(CartResponse.of),
    };
  }
}
