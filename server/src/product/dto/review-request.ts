export interface ReviewPostReqeust {
  order: {
    id: number;
  };
  content: string;
  rate: number;
  image?: string;
}

export interface CreateReviewPostRequest {
  orderId: number;
  content: string;
  rate: number;
}

export interface ReviewPatchRequest {
  content: {
    content: string;
    rate: number;
    image?: string;
  };
}
