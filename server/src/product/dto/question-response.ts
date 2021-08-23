import { Question } from "../entity/question";

export class QuestionResponse {
  id: number;
  authorName: string;
  type: string;
  question: string;
  answer: string;
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
      question = q.question,
      answer = q.answer,
      isSecret = q.isSecret,
      createdAt = q.createdAt,
      answeredAt = q.answeredAt,
      product = { id: q.product.id, name: q.product.name };

    return {
      id,
      authorName,
      type,
      question,
      answer,
      isSecret,
      createdAt,
      answeredAt,
      product,
    };
  }
}
