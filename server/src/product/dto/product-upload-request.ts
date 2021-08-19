export interface ProductUploadRequest {
  name: string;
  price: number;
  deliveryCost: number;
  discountRate: number;
  stock: number;
  category: string;
  subCategory: string;
  option?: {
    value: string;
    list: [
      {
        name: string;
        stock: number;
      }
    ];
  };
}
