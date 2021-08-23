import { Injectable } from "@nestjs/common";
import { Questions } from "@/product/domain/questions";
import { Reviews } from "@/product/domain/reviews";
import { QuestionResponse } from "@/product/dto/question-response";
import { ReviewResponse } from "@/product/dto/review-response";
import {
  CreateReviewPostRequest,
  ReviewPatchRequest,
} from "../dto/review-request";
import {
  QuestionPatchRequest,
  QuestionPostRequest,
} from "../dto/question-request";

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviews: Reviews,
    private readonly questions: Questions
  ) {}

  // reviews
  async getReviewsByProductId(productId: number) {
    const reviews = await this.reviews.findReviewsByProductId(productId);
    return ReviewResponse.of(reviews);
  }
  async createReview(review: CreateReviewPostRequest, image) {
    const fileName = this.reviews.addImage(image);
    await this.reviews.createReview({
      ...review,
      image: fileName,
      order: { id: review.orderId },
    });
  }
  async updateReview(id: number, review: ReviewPatchRequest) {
    await this.reviews.updateReview(id, review);
  }

  // questions
  async getMyQuestions(productId: number) {
    const questions = await this.questions.findQuestionsByProductId(productId);
    return questions.map(QuestionResponse.of);
  }
  async createQuestion(productId: number, question: QuestionPostRequest) {
    await this.questions.createQuestion(productId, question);
  }
  async updateQuestion(id: number, question: QuestionPatchRequest) {
    await this.questions.updateQuestion(id, question);
  }
}
