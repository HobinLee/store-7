import { ReviewDTO } from "@/product/dto/review-DTO";
import { ReviewRate } from "@/product/dto/review-rate";
import { Review } from "../entity/review";

export class ReviewResponse {
  averageRate: number;
  rates: ReviewRate[];
  reviews: ReviewDTO[];

  static of(productReviews: Review[]): ReviewResponse {
    const RATES: ReviewRate[] = [
      { rate: 1, count: 0 },
      { rate: 2, count: 0 },
      { rate: 3, count: 0 },
      { rate: 4, count: 0 },
      { rate: 5, count: 0 },
    ];

    const averageRate = Number(
      (
        productReviews.reduce((result, review) => {
          return result + review.rate;
        }, 0) / productReviews.length
      ).toFixed(1)
    );

    const rates = productReviews.reduce(
      (result: ReviewRate[], review): ReviewRate[] => {
        result[review.rate - 1].count++;
        return result;
      },
      RATES
    );

    const reviews: ReviewDTO[] = productReviews.map((review): ReviewDTO => {
      return {
        id: review.id,
        rate: review.rate,
        content: review.content,
        image: review.image,
        authorName: review.order.user.name,
        createdAt: review.createdAt,
      };
    });

    return {
      averageRate,
      rates,
      reviews,
    };
  }
}
