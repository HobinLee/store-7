import { Injectable } from "@nestjs/common";
import { Carts } from "../domain/carts";
import { CartRequest, CartModifyRequest } from "../dto/cart-request";
import { CartResponse } from "../dto/cart-response";

@Injectable()
export class CartService {
  constructor(private readonly carts: Carts) {}

  async findCartsByUserId(userId: number): Promise<CartResponse[]> {
    const carts = await this.carts.findCartsByUserId(userId);
    return carts.map(CartResponse.of);
  }

  createCart(userId: number, cart: CartRequest): string {
    try {
      this.carts.createCart({ ...cart, user: { id: userId } });
    } catch (e) {
      throw Error(e.message);
    }
    return "Created!";
  }

  updateCart(id: number, modifiedCart: CartModifyRequest): string {
    try {
      this.carts.updateCart(id, modifiedCart);
    } catch (e) {
      throw Error(e.message);
    }
    return "Updated!";
  }

  deleteCart(id: number): string {
    try {
      this.carts.deleteCart(id);
    } catch (e) {
      throw Error(e.message);
    }
    return "Deleted!";
  }
}
