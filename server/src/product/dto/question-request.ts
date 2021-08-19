export interface QuestionRequest {
  userID: number;
  productID: number;
  type: string;
  title: string;
  question: string;
  isSecret: boolean;
}

export interface QuestionDelete {
  id: number;
}
