export interface ReviewType {
  id: number;
  rate: number;
  content: string;
  image?: string;
  authorName?: string;
  product?: {
    id: number;
    name: string;
  };
  date: Date;
}

export interface ReviewListType {
  averageRate: number;
  rates: { rate: number; count: number }[];
  reviews: ReviewType[];
  length: number;
}

export interface QuestionType {
  id: number;
  authorName: string;
  type: string;
  question: string;
  answer: string;
  isSecret: boolean;
  createdAt: Date;
  answeredAt: Date;
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
  destinations: DestinationType[];
}

export interface DestinationType extends AddressType {
  id: number;
  name: string;
  isDefault: boolean;
  addressee: string;
  phoneNumber: string;
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

//메인 페이지, 카테고리 등에서 나오는 Item버튼을 만드는데 사용되는 타입

export class ProductElementType {
  id: number;
  name: string;
  price: number;
  originPrice: number;
  discountRate: number;
  isWish: boolean;
  amount: number;
  image: string;
}

export class AdminProductType {
  id: number;
  name: string;
  price: number;
  originPrice: number;
  discountRate: number;
  isWish: boolean;
  amount: number;
  image: string;
  orderWait: number;
  salse: number;
}

export interface ProductOptionType {
  id: number;
  value: string;
  stock: number;
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
  options: {
    id: number;
    value: string;
    stock: number;
  }[];
  images: string[];
  details: string[];
  isWish: boolean;
}

export interface CartType {
  totalPrice: number;
  totalDelivery: number;
  totalPayment: number;
  items: PartialCart[];
}

export interface ICart {
  id: number;
  name: string;
  price: number;
  deliveryCost: number;
  images: string[];
  productOptionId: number;
  productOptionName?: string;
  amount: number;
  productId: number;
}
export interface OrderType extends CartType {
  totalCount: number;
}
export type PartialCart = Partial<ICart>;

export interface MyInfoType {
  name: string;
  grade: string;
  phoneNumber: string;
  profile: string;
  destinations: DestinationType[];
  email: string;
}

export interface MyReviewType {
  id: number;
  rate: number;
  content: string;
  image?: string;
  authorName: string;
  date: Date;
}

export interface MyOrderType {
  id: number;
  productId: number;
  userId: number;
  addressee: string;
  productOptionId: number;
  amount: number;
  destination: string;
  status: string;
  request: string;
  price: number;
  productName: string;
  createdAt: Date;
  reviewId: number;
  image: string;
}

export enum OrderStatus {
  Prepare = "배송준비중",
  Delivery = "배송중",
  Arrival = "배송완료",
}
