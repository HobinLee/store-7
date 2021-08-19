export class QuestionResponse {
  id: number;
  authorName: string;
  type: string;
  title: string;
  question: string;
  answer: string;
  image: string;
  createdAt: Date;
  answeredCreatedAt: Date;
  product: {
    id: number;
    name: string;
  };

  static of(): QuestionResponse {
    return null;
  }
}
