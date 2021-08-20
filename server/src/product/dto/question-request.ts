export interface QuestionPostRequest {
  userId: number;
  type: string;
  title: string;
  question: string;
  isSecret: boolean;
}

export interface QuestionPatchRequest {
  type: string;
  title: string;
  question: string;
  isSecret: boolean;
}
