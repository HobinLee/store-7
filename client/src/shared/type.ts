export type ReviewType = {
  id: number;
  rate: number;
  content: string;
  image?: string;
  author: string;
  date: Date;
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
    category?: string;
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

export type QnAType = {
  id: number;
  authorName: string;
  type: string;
  title: string;
  question: string;
  answer?: string;
  image?: string;
  createdAt: Date;
  answerCreatedAt?: Date;
  product: {
    id: number;
    name: string;
  };
};

export type UserType = {
  name: string;
  phone: string;
  email: string;
  image: string;
  addresses: AddressType[];
  defaultDestinationId: number;
};

export type AddressType = {
  id?: number;
  name?: string;
  detailAddress: string;
  postcode: PostcodeType;
};

export type PostcodeType = {
  postcode?: number;
  address?: string;
};

export type ItemBannerType = {
  brief?: string;
  title: string;
  src: any;
  id: number;
  isWhite?: boolean;
};

export type ItemType = {
  name: string;
  num?: number;
  price: number;
  delivery: number;
};

export type ProductType = {
  id: number;
  name: string;
  price: number;
  deliveryCost: number;
  discountRate: number;
  stock: number;
  category: string;
  subCategory: string;
  option: string;
  images: string[];
  details: string[];
};

export type CartType = {
  totalPrice: number;
  totalDelivery: number;
  totalPayment: number;
  items: {
    name: string;
    price: number;
    deliveryCost: number;
    images: string[];
    productOptionId: number;
    amount: number;
  }[];
};
