import { Review } from "../entity/review";

export class MyReviewResponse {
  id: number;
  rate: number;
  content: string;
  image?: string;
  authorName: string;
  product: {
    id: number;
    name: string;
  };
  date: Date;

  static of(review: Review): MyReviewResponse {
    const id = review.id,
      rate = review.rate,
      content = review.content,
      image = review.image,
      authorName = review.order.user.name,
      date = review.createdAt,
      product = { id: review.product.id, name: review.product.name };

    return {
      id,
      rate,
      content,
      image,
      authorName,
      date,
      product,
    };
  }
}
