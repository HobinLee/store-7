import { Controller, Get, Param, Patch } from "@nestjs/common";
import { CartResponse } from "@/cart/dto/cart-response";
import { CartService } from "@/cart/application/cart-service";
import { MyCartsResponse } from "../dto/my-response";
import { ProductService } from "@/product/application/product-service";
import { QuestionResponse } from "@/product/dto/question-response";
import { MyReviewResponse } from "@/product/dto/review-my-response";
import { MyService } from "@/user/application/my-service";

@Controller("/my")
export class MyController {
  constructor(
    private readonly myService: MyService,
    private readonly productService: ProductService
  ) {}

  @Get("/carts")
  async checkEmailExist(
    @Param("userId") userId: number
  ): Promise<MyCartsResponse> {
    return this.myService.findMyCarts(1);
  }

  @Get()
  async getMyInfo(
    @Param("userId") userId: number
  ): Promise<MyReviewResponse[]> {
    return await this.myService.getMyReviews(userId); // TODO
  }

  @Patch()
  async patchInfo() {
    return "";
  }

  @Get("/reviews")
  async getMyReviews(
    @Param("userId") userId: number
  ): Promise<MyReviewResponse[]> {
    return await this.myService.getMyReviews(userId);
  }

  @Get("/questions")
  async getMyQuestions(
    @Param("userId") userId: number
  ): Promise<QuestionResponse[]> {
    return await this.myService.getMyQeustions(userId);
  }

  @Get("/orders")
  async getCurrentOrders() {
    return "";
  }

  @Get("/orders")
  async getOrders() {
    return "";
  }

  @Get("/wishes")
  async getWishes() {
    return "";
  }
}
