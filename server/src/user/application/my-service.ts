import { Carts } from "@/cart/domain/carts";
import { CartResponse } from "@/cart/dto/cart-response";
import { Injectable } from "@nestjs/common";
import {
  MyCartsResponse,
  MyInfoResponse,
  MyWishResponse,
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
import { Wishes } from "../domain/wishes";
import { WishRequest } from "../dto/wish-request";
import { OrderResponse } from "@/order/dto/order-response";

@Injectable()
export class MyService {
  constructor(
    private readonly carts: Carts,
    private readonly reviews: Reviews,
    private readonly destinations: Destinations,
    private readonly questions: Questions,
    private readonly users: Users,
    private readonly orders: Orders,
    private readonly wishes: Wishes
  ) {}

  // info
  async getMyInfo(userId) {
    const user = await this.users.findUserById(userId);
    return MyInfoResponse.of(user);
  }

  async editMyInfo(request: MyInfoEditRequest) {
    await this.users.updateUserInfo(request);
  }

  // carts
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

  // destinations
  async findMyDestionation(userId) {
    const destinations = await this.destinations.findDestinationsByUserId(
      userId
    );
    return destinations.map(DestinationResponse.of);
  }

  // reviews
  async findMyReviews(userId: number) {
    const reviews = await this.reviews.findReviewsByUserId(userId);
    return reviews.map(MyReviewResponse.of);
  }

  // questions
  async findMyQuestions(userId: number) {
    const questions = await this.questions.findQuestionsByUserId(userId);
    return questions.map(QuestionResponse.of);
  }

  // orders
  async findMyOrders(userId: number) {
    const orders = await this.orders.findOrdersByUserId(userId);
    return orders.map(OrderResponse.of);
  }

  async findMyOrdersByDateRange(
    userId: number,
    range: { from: Date; to: Date }
  ) {
    const orders = await this.orders.findOrdersByUserIdByDateRange(
      userId,
      range
    );
    return orders.map(OrderResponse.of);
  }

  async findCurrentOrdersByUserId(userId: number): Promise<OrderResponse[]> {
    const orders = await this.orders.findCurrentOrdersByUserId(userId);
    return orders.map(OrderResponse.of);
  }

  async findDeliverdOrdersByUserId(userId: number): Promise<OrderResponse[]> {
    const orders = await this.orders.findDeliverdOrdersByUserId(userId);
    return orders.map(OrderResponse.of);
  }

  async findReviewedOrdersByUserId(userId: number): Promise<OrderResponse[]> {
    const orders = await this.orders.findReviewedOrdersByUserId(userId);
    return orders.map(OrderResponse.of);
  }

  // wishes
  async findMyWishes(userId: number) {
    const wishes = await this.wishes.findMyWishesByUserId(userId);
    return MyWishResponse.of(wishes);
  }

  async findMyWishByProductId(userId: number, productId: number) {
    const wish = await this.wishes.findMyWishByProductId(userId, productId);
    return wish;
  }

  async createWishProduct(wish: WishRequest) {
    await this.wishes.createWish(wish);
  }

  async deleteWishProduct(wish: WishRequest) {
    return await this.wishes.deleteWish(wish);
  }
}
