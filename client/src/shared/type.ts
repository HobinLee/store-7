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
