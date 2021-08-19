import { Body, Controller, Patch, Post, Delete, Param } from "@nestjs/common";
import { CartService } from "../application/cart-service";
import { CartRequest, CartModifyRequest } from "../dto/cart-request";

@Controller("/carts")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  createCart(
    @Param("userId") userId: number,
    @Body() cart: CartRequest
  ): string {
    return this.cartService.createCart(1, cart);
  }

  @Patch("/:id")
  updateCart(
    @Param("id") id: number,
    @Body() modifiedCart: CartModifyRequest
  ): string {
    return this.cartService.updateCart(id, modifiedCart);
  }

  @Delete("/:id")
  deleteCart(@Param("id") id: number): string {
    return this.cartService.deleteCart(id);
  }
}
