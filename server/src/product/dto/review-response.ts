import { ReviewDTO } from "@/product/dto/review-DTO";
import { ReviewRate } from "@/product/dto/review-rate";

export class ReviewResponse {
  averageRate: number;
  rates: ReviewRate[];
  reviews: ReviewDTO[];

  static of(): ReviewResponse {
    return null;
  }
}
