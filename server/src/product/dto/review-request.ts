export interface ReviewPostReqeust {
  orderId: number;
  content: string;
  rate: number;
  image?: string;
}

export interface ReviewPatchRequest {
  content: {
    content: string;
    rate: number;
    image?: string;
  };
}
