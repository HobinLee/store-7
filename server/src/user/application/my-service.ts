import { Carts } from "@/cart/domain/carts";
import { CartResponse } from "@/cart/dto/cart-response";
import { Injectable } from "@nestjs/common";
import { MyCartsResponse } from "../dto/my-response";
import { Questions } from "@/product/domain/questions";
import { Reviews } from "@/product/domain/reviews";
import { QuestionResponse } from "@/product/dto/question-response";
import { MyReviewResponse } from "@/product/dto/review-my-response";

@Injectable()
export class MyService {
  constructor(
    private readonly carts: Carts,
    private readonly reviews: Reviews,
    private readonly questions: Questions
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
    return "";
  }

  async getMyReviews(userId) {
    userId = 12;
    const reviews = await this.reviews.findReviewByUserId(userId);
    return reviews.map(MyReviewResponse.of);
  }

  async getMyQeustions(userId) {
    userId = 12;
    const questions = await this.questions.findQuestionsByUserId(userId);
    return questions.map(QuestionResponse.of);
  }

  async getMyCurrentOrders() {
    return "";
  }

  async getMyOrders() {
    return "";
  }

  async patchMyInfo() {
    return "";
  }
}
