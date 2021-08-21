import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import {
  MyBasicInfoResponse,
  MyCartsResponse,
  MyCurrentOredersResponse,
  MyOredersResponse,
} from "../dto/my-response";
import { QuestionResponse } from "@/product/dto/question-response";
import { MyReviewResponse } from "@/product/dto/review-my-response";
import { MyInfoEditRequest } from "../dto/my-reqeust";
import { ProductService } from "@/product/application/product-service";
import { DestinationResponse } from "@/destination/dto/destination-response";
import { MyService } from "../application/my-service";

@Controller("/my")
export class MyController {
  constructor(
    private readonly myService: MyService,
    private readonly productService: ProductService
  ) {}

  @Get("/carts")
  async checkEmailExist(): Promise<MyCartsResponse> {
    return await this.myService.findMyCarts(1);
  }

  @Get("/info")
  async getMyInfo(
    @Body("userId") userId: number
  ): Promise<MyBasicInfoResponse> {
    return await this.myService.getMyInfo(userId);
  }

  @Get("/destinations")
  async getMyDestionation(
    @Body("userId") userId: number
  ): Promise<DestinationResponse[]> {
    return await this.myService.findMyDestionation(1);
  }

  @Patch("/info")
  async patchInfo(@Body() request: MyInfoEditRequest) {
    return await this.myService.editMyInfo(request);
  }

  @Get("/reviews")
  async getMyReviews(
    @Body("userId") userId: number
  ): Promise<MyReviewResponse[]> {
    return await this.myService.getMyReviews(userId);
  }

  @Get("/questions")
  async getMyQuestions(
    @Body("userId") userId: number
  ): Promise<QuestionResponse[]> {
    return await this.myService.getMyQeustions(userId);
  }

  @Get("/orders")
  async getMyOrdersByTarget(
    @Query("target") target: string,
    @Body("userId") userId: number
  ): Promise<MyOredersResponse[] | MyCurrentOredersResponse[] | string> {
    console.log("target :", target);
    return target === "current"
      ? await this.myService.getMyCurrentOrders(userId)
      : target === "all"
      ? await this.myService.getMyOrders(userId)
      : "";
  }

  @Get("/wishes")
  async getWishes() {
    return "";
  }
}
