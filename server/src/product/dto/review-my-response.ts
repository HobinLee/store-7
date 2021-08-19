import { Review } from "../entity/review";

export class ReviewResponse {
  id: number;
  rate: number;
  content: string;
  image?: string;
  authorName: string;

  static of(review: Review): ReviewResponse {
    const id = review.id,
      rate = review.rate,
      content = review.content,
      image = review.image,
      authorName = review.author.name;

    return {
      id,
      rate,
      content,
      image,
      authorName,
    };
  }
}
