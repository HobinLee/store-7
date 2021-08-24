export interface QuestionPostRequest {
  productId: number;
  type: string;
  title: string;
  question: string;
  isSecret: boolean;
}

export interface CreateQuestionPostRequest extends QuestionPostRequest {
  product: {
    id: number;
  };
  user: {
    id: number;
  };
}

export interface QuestionPatchRequest {
  type: string;
  question: string;
  isSecret: boolean;
}
