import { Injectable } from "@nestjs/common";
import { Reviews } from "@/product/domain/reviews";
import {
  CreateReviewPostRequest,
  ReviewPatchReqeust,
  UpdateReviewPatchRequest,
} from "../dto/review-request";
import { MyReviewResponse } from "../dto/review-my-response";

@Injectable()
export class ReviewService {
  constructor(private readonly reviews: Reviews) {}

  async createReview(review: CreateReviewPostRequest, image) {
    const fileName = image ? await this.reviews.addImage(image) : null;
    await this.reviews.createReview({
      ...review,
      image: fileName,
      order: { id: review.orderId },
      product: { id: review.productId },
    });
  }

  async updateReview(id: number, review: UpdateReviewPatchRequest, image) {
    const fileName = image ? await this.reviews.addImage(image) : "";
    const newReview: ReviewPatchReqeust = { ...review };
    if (fileName) {
      newReview.image = fileName;
    }
    await this.reviews.updateReview(id, newReview);
  }

  async deletereview(id: number) {
    await this.reviews.deleteReview(id);
  }

  async findRecentReviews(query) {
    const reviews = await this.reviews.findRecentReviews(query);
    return reviews.map(MyReviewResponse.of);
  }
}
