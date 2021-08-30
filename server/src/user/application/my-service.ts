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
import messages from "@/config/messages";
import { ETException } from "@/config/filter/exception-handler";

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
    try {
      const user = await this.users.findUserById(userId);
      return MyInfoResponse.of(user);
    } catch (e) {
      throw new ETException(400, messages.failed.FAILTED_TO_FIND_MY_INFO);
    }
  }

  async editMyInfo(userId: number, request: MyInfoEditRequest) {
    try {
      await this.users.updateUserInfo(userId, request);
    } catch (e) {
      throw new ETException(400, messages.failed.FAILTED_TO_EDIT_MY_INFO);
    }
  }

  // carts
  async findMyCarts(userId: number): Promise<MyCartsResponse> {
    try {
      const data = await this.carts.findCartsByUserId(userId);

      const totalPrice = data.reduce(
        (sum, cart) => sum + cart.product.price,
        0
      );
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
    } catch (e) {
      throw new ETException(
        404,
        messages.failed.FAILED_TO_FIND_CARTS_BY_USER_ID
      );
    }
  }

  // destinations
  async findMyDestionation(userId) {
    try {
      const destinations = await this.destinations.findDestinationsByUserId(
        userId
      );
      return destinations.map(DestinationResponse.of);
    } catch (e) {
      throw new ETException(
        404,
        messages.failed.FAILED_TO_FIND_DESTINATIONS_BY_USER_ID
      );
    }
  }

  // reviews
  async findMyReviews(userId: number) {
    try {
      const reviews = await this.reviews.findReviewsByUserId(userId);
      return reviews.map(MyReviewResponse.of);
    } catch (e) {
      throw new ETException(404, messages.failed.FAILED_TO_FIND_MY_REVIEW);
    }
  }

  // questions
  async findMyQuestions(userId: number) {
    try {
      const questions = await this.questions.findQuestionsByUserId(userId);
      return questions.map(QuestionResponse.of);
    } catch (e) {
      throw new ETException(
        404,
        messages.failed.FAILED_TO_FIND_QUESTIONS_BY_USER_ID
      );
    }
  }

  // orders
  async findMyOrders(userId: number) {
    try {
      const orders = await this.orders.findOrdersByUserId(userId);
      return orders.map(OrderResponse.of);
    } catch (e) {
      throw new ETException(
        404,
        messages.failed.FAILED_TO_FIND_ORDERS_BY_USER_ID
      );
    }
  }

  // wishes
  async findMyWishes(userId: number) {
    try {
      const wishes = await this.wishes.findMyWishesByUserId(userId);
      return MyWishResponse.of(wishes);
    } catch (e) {
      throw new ETException(404, messages.failed.FAILED_TO_FIND_MY_WISHES);
    }
  }

  async createWishProduct(wish: WishRequest) {
    try {
      await this.wishes.createWish(wish);
    } catch (e) {
      throw new ETException(400, messages.failed.FAILED_TO_CREATE_MY_WISH);
    }
  }

  async deleteWishProduct(wish: WishRequest) {
    try {
      return await this.wishes.deleteWish(wish);
    } catch (e) {
      throw new ETException(404, messages.failed.FAILED_TO_DELETE_MY_WISH);
    }
  }
}
