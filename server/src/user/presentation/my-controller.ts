import { Body, Controller, Get, Patch, Query } from "@nestjs/common";
import {
  MyInfoResponse,
  MyCartsResponse,
  MyCurrentOredersResponse,
  MyOredersResponse,
  MyWishResponse,
} from "../dto/my-response";
import { QuestionResponse } from "@/product/dto/question-response";
import { MyReviewResponse } from "@/product/dto/review-my-response";
import { MyInfoEditRequest } from "../dto/my-reqeust";
import { DestinationResponse } from "@/destination/dto/destination-response";
import { MyService } from "../application/my-service";

@Controller("/my")
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Get("/carts")
  async checkEmailExist(
    @Body("userId") userId: number
  ): Promise<MyCartsResponse> {
    return await this.myService.findMyCarts(userId);
  }

  @Get("/info")
  async getMyInfo(@Body("userId") userId: number): Promise<MyInfoResponse> {
    return await this.myService.getMyInfo(userId);
  }

  @Get("/destinations")
  async getMyDestionation(
    @Body("userId") userId: number
  ): Promise<DestinationResponse[]> {
    return await this.myService.findMyDestionation(userId);
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
  async getWishes(@Body("userId") userId: number): Promise<MyWishResponse[]> {
    return await this.myService.getMyWishes(userId);
  }
}
