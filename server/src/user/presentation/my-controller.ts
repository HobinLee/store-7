import { Controller, Get, Param } from "@nestjs/common";
import { CartResponse } from "@/cart/dto/cart-response";
import { CartService } from "@/cart/application/cart-service";
import { MyService } from "../application/my-service";
import { MyCartsResponse } from "../dto/my-response";

@Controller("/my")
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Get("/carts")
  async checkEmailExist(
    @Param("userId") userId: number
  ): Promise<MyCartsResponse> {
    return this.myService.findMyCarts(1);
  }
}
