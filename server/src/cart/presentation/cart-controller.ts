import { Body, Controller, Patch, Post, Delete, Param } from "@nestjs/common";
import { CartService } from "../application/cart-service";
import { CartRequest, CartModifyRequest } from "../dto/cart-request";

@Controller("/carts")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  createCart(@Body() body: { data: CartRequest; userId: number }): string {
    console.log(body);
    return this.cartService.createCart(body.userId, body.data);
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
