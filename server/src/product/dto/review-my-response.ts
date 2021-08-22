import { Review } from "../entity/review";

export class MyReviewResponse {
  id: number;
  rate: number;
  content: string;
  image?: string;
  authorName: string;
  date: Date;

  static of(review: Review): MyReviewResponse {
    const id = review.id,
      rate = review.rate,
      content = review.content,
      image = review.image,
      authorName = review.order.user.name,
      date = review.createdAt;

    return {
      id,
      rate,
      content,
      image,
      authorName,
      date,
    };
  }
}
