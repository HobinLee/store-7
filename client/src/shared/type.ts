export interface ReviewType {
  id: number;
  rate: number;
  content: string;
  image?: string;
  author: string;
  date: Date;
}

export interface ReviewListType {
  totalCount: number;
  averageRate: number;
  rates: { rate: number; count: number }[];
  reviews: ReviewType[];
}

export interface QuestionType {
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
}

export interface QuestionListType {
  totalCount: number;
  questions: QuestionType[];
}

export interface QnAType {
  id: number;
  type: string;
  authorName: string;
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
}

export interface UserType {
  name: string;
  phoneNumber: string;
  email: string;
  profile: string;
  // destinations: DestinationType[];
}

export interface DestinationType extends AddressType {
  id: number;
  name: string;
  isDefault?: boolean;
  addressee: string;
}

export interface AddressType {
  postCode: string;
  address: string;
  detailAddress: string;
}

export interface ItemBannerType {
  brief?: string;
  title: string;
  src: any;
  id: number;
  isWhite?: boolean;
}

export interface ItemType {
  name: string;
  num?: number;
  price: number;
  delivery: number;
}

export interface ProductType {
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
}

export interface CartType {
  totalPrice: number;
  totalDelivery: number;
  totalPayment: number;
  items: ICart[];
}
interface ICart {
  id: number;
  name: string;
  price: number;
  deliveryCost: number;
  images: string[];
  productOptionId: number;
  amount: number;
}
export type PartialCart = Partial<ICart>;
