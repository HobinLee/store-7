export interface QuestionPostRequest {
  userId: number;
  productID: number;
  type: string;
  title: string;
  question: string;
  isSecret: boolean;
}

export interface QuestionPatchRequest {
  id: number;
  content: {
    type: string;
    content: string;
    isSecret: boolean;
  };
}
