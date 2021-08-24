import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Delete,
  Query,
} from "@nestjs/common";
import {
  MyInfoResponse,
  MyCartsResponse,
  MyWishResponse,
} from "../dto/my-response";
import { QuestionResponse } from "@/product/dto/question-response";
import { MyReviewResponse } from "@/product/dto/review-my-response";
import { MyInfoEditRequest } from "../dto/my-reqeust";
import { DestinationResponse } from "@/destination/dto/destination-response";
import { MyService } from "../application/my-service";
import { WishRequest } from "../dto/wish-request";
import { OrderResponse } from "@/order/dto/order-response";

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
    return await this.myService.findMyReviews(userId);
  }

  // questions
  @Get("/questions")
  async getMyQuestions(
    @Body("userId") userId: number
  ): Promise<QuestionResponse[]> {
    return await this.myService.findMyQeustions(userId);
  }

  // orders
  @Get("/orders/:filter")
  async getMyOrders(
    @Body("userId") userId: number,
    @Param("filter") filter: string
  ): Promise<OrderResponse[]> {
    switch (filter) {
      case "current":
        return await this.myService.findCurrentOrdersByUserId(userId);
      case "deliver":
        return await this.myService.findDeliverdOrdersByUserId(userId);
      case "review":
        return await this.myService.findReviewedOrdersByUserId(userId);
      case "all":
        return await this.myService.findMyOrders(userId);
      default:
        throw new Error("파라미터 오류");
    }
  }

  @Get("/orders")
  async getMyOrdersByDateRange(
    @Body("userId") userId: number,
    @Query("from") from: Date,
    @Query("to") to: Date
  ): Promise<OrderResponse[]> {
    return await this.myService.findMyOrdersByDateRange(userId, { from, to });
  }

  // wishes
  @Get("/wishes")
  async getMyWishes(@Body("userId") userId: number): Promise<MyWishResponse[]> {
    return await this.myService.findMyWishes(userId);
  }

  @Post("/wishes")
  async postWishProduct(@Body() body: WishRequest) {
    return await this.myService.createWishProduct(body);
  }

  @Delete("/wishes/:productId")
  async deleteWishProduct(
    @Param("productId") productId: number,
    @Body("userId")
    userId: number
  ) {
    try {
      const result = await this.myService.deleteWishProduct({
        userId,
        productId,
      });
    } catch (e) {
      console.error(e);
    } finally {
      return;
    }
  }
}
