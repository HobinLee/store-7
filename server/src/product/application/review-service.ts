import { Injectable } from "@nestjs/common";
import { Reviews } from "@/product/domain/reviews";
import {
  CreateReviewPostRequest,
  RecentReviewsQuery,
  ReviewPatchReqeust,
  UpdateReviewPatchRequest,
} from "../dto/review-request";
import { MyReviewResponse } from "../dto/review-my-response";
import messages from "@/config/messages";
import { ETException } from "@/config/filter/exception-handler";

@Injectable()
export class ReviewService {
  constructor(private readonly reviews: Reviews) {}

  async createReview(review: CreateReviewPostRequest, image): Promise<string> {
    try {
      const fileName = image ? await this.reviews.addImage(image) : null;
      await this.reviews.createReview({
        ...review,
        image: fileName,
        order: { id: review.orderId },
        product: { id: review.productId },
      });
      return messages.success.SUCCESS_TO_CREATE_REVIEW;
    } catch (e) {
      throw new ETException(400, messages.failed.FAILED_TO_CREATE_REVIEW);
    }
  }

  async updateReview(
    id: number,
    review: UpdateReviewPatchRequest,
    image
  ): Promise<string> {
    try {
      const fileName = image ? await this.reviews.addImage(image) : "";
      const newReview: ReviewPatchReqeust = { ...review };
      if (fileName) {
        newReview.image = fileName;
      }
      await this.reviews.updateReview(id, newReview);
      return messages.success.SUCCESS_TO_UPDATE_REVIEW;
    } catch (e) {
      throw new ETException(400, messages.failed.FAILED_TO_CREATE_REVIEW);
    }
  }

  async deletereview(id: number) {
    try {
      await this.reviews.deleteReview(id);
      return messages.success.SUCCESS_TO_DELETE_REVIEW;
    } catch (e) {
      throw new ETException(404, messages.failed.FAILED_TO_CREATE_REVIEW);
    }
  }

  async findRecentReviews(
    query: RecentReviewsQuery
  ): Promise<MyReviewResponse[]> {
    try {
      const reviews = await this.reviews.findRecentReviews(query);
      return reviews.map(MyReviewResponse.of);
    } catch (e) {
      throw new ETException(404, messages.failed.FAILED_TO_FIND_RECENT_REVIEWS);
    }
  }
}
