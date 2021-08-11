export type ReviewType = {
  id: number;
  rate: number;
  content: string;
  author: string;
  date: string;
};
export type ReviewListType = {
  totalCount: number;
  averageRate: number;
  rates: { rate: number; count: number }[];
  reviews: ReviewType[];
};

export type QuestionType = {
  id: number;
  question: {
    author: string;
    content: string;
    date: Date;
  };
  answer?: {
    content: string;
    date: Date;
  };
};
export type QuestionListType = {
  totalCount: number;
  questions: QuestionType[];
};
