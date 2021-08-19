import { Injectable } from "@nestjs/common";
import { Carts } from "../domain/carts";
import {
  CartRequest,
  CartResponse,
  CartModifyRequest,
} from "../dto/cart-request";

@Injectable()
export class CartService {
  constructor(private readonly carts: Carts) {}

  async findCartsByUserId(userId: number): Promise<CartResponse[]> {
    try {
      const data = await this.carts.findCartsByUserId(userId);
      return data;
    } catch (e) {
      return e;
    }
  }

  createCart(cart: CartRequest): string {
    try {
      this.carts.createCart(cart);
    } catch (e) {
      return e;
    }
    return "Created!";
  }

  updateCart(userId: number, modifiedCart: CartModifyRequest): string {
    try {
      this.carts.updateCart(userId, modifiedCart);
    } catch (e) {
      return e;
    }
    return "Updated!";
  }

  deleteCart(id: number): string {
    try {
      this.carts.deleteCart(id);
    } catch (e) {
      return e;
    }
    return "Deleted!";
  }
}
