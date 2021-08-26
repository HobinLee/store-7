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

export interface ReviewPatchReqeust {
  content: string;
  rate: number;
  image?: string;
}

export interface UpdateReviewPatchRequest {
  content: string;
  rate: number;
}
