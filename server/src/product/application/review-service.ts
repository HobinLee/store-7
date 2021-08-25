import { Injectable } from "@nestjs/common";
import { Reviews } from "@/product/domain/reviews";
import { ReviewResponse } from "@/product/dto/review-response";
import {
  CreateReviewPostRequest,
  ReviewPatchRequest,
} from "../dto/review-request";

@Injectable()
export class ReviewService {
  constructor(private readonly reviews: Reviews) {}

  async getReviewsByProductId(productId: number) {
    const reviews = await this.reviews.findReviewsByProductId(productId);
    return ReviewResponse.of(reviews);
  }
  async createReview(review: CreateReviewPostRequest, image) {
    const fileName = image ? this.reviews.addImage(image) : "";
    await this.reviews.createReview({
      ...review,
      image: fileName,
      order: { id: review.orderId },
      product: { id: review.productId },
    });
  }
  async updateReview(id: number, review: ReviewPatchRequest) {
    await this.reviews.updateReview(id, review);
  }
}
