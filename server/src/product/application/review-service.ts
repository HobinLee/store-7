import { Injectable } from "@nestjs/common";
import { Questions } from "@/product/domain/questions";
import { Reviews } from "@/product/domain/reviews";
import { QuestionResponse } from "@/product/dto/question-response";
import { ReviewResponse } from "@/product/dto/review-response";
import { ReviewPatchRequest, ReviewPostReqeust } from "../dto/review-request";
import {
  QuestionPatchRequest,
  QuestionPostRequest,
} from "../dto/question-request";

@Injectable()
export class MyService {
  constructor(
    private readonly reviews: Reviews,
    private readonly questions: Questions
  ) {}

  // reviews
  async getReviewsByProductId(productId: number) {
    const reviews = await this.reviews.findReviewsByProductId(productId);
    return ReviewResponse.of(reviews);
  }
  async createReview(review: ReviewPostReqeust) {
    await this.reviews.createReview(review);
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
