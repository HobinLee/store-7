import { Injectable } from "@nestjs/common";
import { Reviews } from "@/product/domain/reviews";
import {
  CreateReviewPostRequest,
  ReviewPatchRequest,
} from "../dto/review-request";

@Injectable()
export class ReviewService {
  constructor(private readonly reviews: Reviews) {}

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
