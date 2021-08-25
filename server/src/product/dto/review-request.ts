export interface ReviewPostReqeust {
  order: {
    id: number;
  };
  product: {
    id: number;
  };
  content: string;
  rate: number;
  image?: string;
}

export interface CreateReviewPostRequest {
  orderId: number;
  productId: number;
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
