import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Delete,
} from "@nestjs/common";
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
import { WishRequest } from "../dto/wish-request";

@Controller("/my")
export class MyController {
  constructor(private readonly myService: MyService) {}

  // info
  @Get("/info")
  async getMyInfo(@Body("userId") userId: number): Promise<MyInfoResponse> {
    return await this.myService.getMyInfo(userId);
  }

  @Patch("/info")
  async patchInfo(@Body() request: MyInfoEditRequest) {
    return await this.myService.editMyInfo(request);
  }

  // carts
  @Get("/carts")
  async checkEmailExist(
    @Body("userId") userId: number
  ): Promise<MyCartsResponse> {
    return await this.myService.findMyCarts(userId);
  }

  // destinations
  @Get("/destinations")
  async getMyDestionation(
    @Body("userId") userId: number
  ): Promise<DestinationResponse[]> {
    return await this.myService.findMyDestionation(userId);
  }

  // reviews
  @Get("/reviews")
  async getMyReviews(
    @Body("userId") userId: number
  ): Promise<MyReviewResponse[]> {
    return await this.myService.getMyReviews(userId);
  }

  // questions
  @Get("/questions")
  async getMyQuestions(
    @Body("userId") userId: number
  ): Promise<QuestionResponse[]> {
    return await this.myService.getMyQeustions(userId);
  }

  // orders
  @Get("/orders/:target")
  async getMyOrdersByTarget(
    @Param("target") target: string,
    @Body("userId") userId: number
  ): Promise<MyOredersResponse[] | MyCurrentOredersResponse[] | string> {
    return target === "current"
      ? await this.myService.getMyCurrentOrders(userId)
      : target === "all"
      ? await this.myService.getMyOrders(userId)
      : "";
  }

  // wishes
  @Get("/wishes")
  async getWishes(@Body("userId") userId: number): Promise<MyWishResponse[]> {
    return await this.myService.getMyWishes(userId);
  }

  @Post("/wishes")
  async postWishProduct(@Body() body: WishRequest) {
    body.userId = 1;
    return await this.myService.postWishProduct(body);
  }

  @Delete("/wishes/:productId")
  async deleteWishProduct(
    @Param("productId") productId: number,
    @Body("userId")
    userId: number
  ) {
    userId = 1;
    return await this.myService.deleteWishProduct({ userId, productId });
  }
}
