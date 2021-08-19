import { Controller, Get, Param } from "@nestjs/common";
import { CartResponse } from "@/cart/dto/cart-response";
import { CartService } from "@/cart/application/cart-service";

@Controller("/my")
export class MyController {
  constructor(private readonly cartService: CartService) {}

  @Get("/carts")
  async checkEmailExist(
    @Param("userId") userId: number
  ): Promise<CartResponse[]> {
    return this.cartService.findCartsByUserId(1);
  }
}
