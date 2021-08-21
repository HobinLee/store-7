import { Carts } from "@/cart/domain/carts";
import { CartResponse } from "@/cart/dto/cart-response";
import { Injectable } from "@nestjs/common";
import {
  MyCartsResponse,
  MyBasicInfoResponse,
  MyCurrentOredersResponse,
  MyOredersResponse,
} from "../dto/my-response";
import { Questions } from "@/product/domain/questions";
import { Reviews } from "@/product/domain/reviews";
import { QuestionResponse } from "@/product/dto/question-response";
import { MyReviewResponse } from "@/product/dto/review-my-response";
import { Users } from "../domain/users";
import { MyInfoEditRequest } from "../dto/my-reqeust";
import { Orders } from "@/order/domain/orders";
import { Destinations } from "@/destination/domain/destinations";
import { DestinationResponse } from "@/destination/dto/destination-response";

@Injectable()
export class MyService {
  constructor(
    private readonly carts: Carts,
    private readonly reviews: Reviews,
    private readonly destinations: Destinations,
    private readonly questions: Questions,
    private readonly users: Users,
    private readonly orders: Orders
  ) {}

  async findMyCarts(userId: number): Promise<MyCartsResponse> {
    const data = await this.carts.findCartsByUserId(userId);

    const totalPrice = data.reduce((sum, cart) => sum + cart.product.price, 0);
    const totalDelivery = data.reduce(
      (sum, cart) => sum + cart.product.deliveryCost,
      0
    );
    const totalPayment = totalPrice + totalDelivery;

    return {
      totalPrice,
      totalDelivery,
      totalPayment,
      items: data.map(CartResponse.of),
    };
  }

  async getMyInfo(userId) {
    userId = 1;
    const user = await this.users.findUserById(userId);
    return MyBasicInfoResponse.of(user);
  }

  async editMyInfo(request: MyInfoEditRequest) {
    await this.users.updateUserInfo(request);
  }

  async getMyReviews(userId) {
    userId = 1;
    const reviews = await this.reviews.findReviewByUserId(userId);
    return reviews.map(MyReviewResponse.of);
  }

  async findMyDestionation(userId) {
    const destinations = await this.destinations.findDestinationsByUserId(
      userId
    );
    return destinations.map(DestinationResponse.of);
  }

  async getMyQeustions(userId: number) {
    userId = 1;
    const questions = await this.questions.findQuestionsByUserId(userId);
    return questions.map(QuestionResponse.of);
  }

  async getMyCurrentOrders(userId: number) {
    userId = 1;
    const orders = await this.orders.findCurrentOrdersByUserId(userId);
    return orders.map(MyCurrentOredersResponse.of);
  }

  async getMyOrders(userId: number) {
    userId = 1;
    const orders = await this.orders.findOrdersByUserId(userId);
    return orders.map(MyOredersResponse.of);
  }
}
