import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Delete,
  Res,
  All,
  HttpStatus,
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
import { Response } from "express";

@Controller("/my")
export class MyController {
  constructor(private readonly myService: MyService) {}

  @All()
  async isUser(@Body("userId") userId: number, @Res() res: Response) {
    if (!userId) {
      res.status(HttpStatus.UNAUTHORIZED);
      return {
        message: "로그인이 필요한 서비스입니다.",
      };
    }
  }

  // info
  @Get("/info")
  async getMyInfo(@Body("userId") userId: number): Promise<MyInfoResponse> {
    return await this.myService.getMyInfo(userId);
  }

  @Patch("/info")
  async patchInfo(@Body() body: { userId: number; data: MyInfoEditRequest }) {
    return await this.myService.editMyInfo(body.userId, body.data);
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
    return await this.myService.findMyQuestions(userId);
  }

  // orders
  @Get("/orders")
  async getMyOrders(@Body("userId") userId: number): Promise<OrderResponse[]> {
    return await this.myService.findMyOrders(userId);
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
      await this.myService.deleteWishProduct({
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
