import { Question } from "../entity/question";

export class QuestionResponse {
  id: number;
  authorName: string;
  type: string;
  title: string;
  question: string;
  answer: string;
  image: string;
  isSecret: boolean;
  createdAt: Date;
  answeredAt: Date;
  product: {
    id: number;
    name: string;
  };

  static of(q: Question): QuestionResponse {
    const id = q.id,
      authorName = q.user.name,
      type = q.type,
      title = q.title,
      question = q.question,
      answer = q.answer,
      image = q.image,
      isSecret = q.isSecret,
      createdAt = q.createdAt,
      answeredAt = q.answeredAt,
      product = { id: q.product.id, name: "name" };

    return {
      id,
      authorName,
      type,
      title,
      question,
      answer,
      image,
      isSecret,
      createdAt,
      answeredAt,
      product,
    };
  }
}
