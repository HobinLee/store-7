export interface ReviewPostReqeust {
  orderId: number;
  content: string;
  rate: number;
  image?: string;
}

export interface ReviewPatchRequest {
  id;
  content: {
    content: string;
    rate: number;
    image?: string;
  };
}
