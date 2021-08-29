import messages from "@/config/messages";
import { Injectable } from "@nestjs/common";
import { Carts } from "../domain/carts";
import { CartRequest, CartModifyRequest } from "../dto/cart-request";
import { CartResponse } from "../dto/cart-response";

@Injectable()
export class CartService {
  constructor(private readonly carts: Carts) {}

  async findCartsByUserId(userId: number): Promise<CartResponse[]> {
    try {
      const carts = await this.carts.findCartsByUserId(userId);
      return carts.map(CartResponse.of);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_FIND_CARTS_BY_USER_ID);
    }
  }

  createCart(userId: number, cart: CartRequest): string {
    try {
      this.carts.createCart({ ...cart, user: { id: userId } });
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_CREATE_CART);
    }
    return messages.success.SUCCESS_TO_CREATE_CART;
  }

  updateCart(id: number, modifiedCart: CartModifyRequest): string {
    try {
      this.carts.updateCart(id, modifiedCart);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_UPDATE_CART);
    }
    return messages.success.SUCCESS_TO_UPDATE_CART;
  }

  deleteCart(id: number): string {
    try {
      this.carts.deleteCart(id);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_DELETE_CART);
    }
    return messages.success.SUCCESS_TO_DELETE_CART;
  }
}
