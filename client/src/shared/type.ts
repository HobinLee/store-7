import { css } from "styled-components";

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
  order: {
    user: {
      name: string;
    };
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

export interface ProductElementType {
  id: number;
  name: string;
  price: number;
  originPrice: number;
  discountRate: number;
  isWish: boolean;
  amount: number;
  image: string;
  createdAt: Date;
  wishCount: number;
  stock: number;
}

export interface AdminProductType {
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
  originPrice: number;
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
  options: ProductOptionType[];
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
  optionName: string;
  optionValue: string;
}

export enum OrderStatus {
  Prepare = "배송준비중",
  Delivery = "배송중",
  Arrival = "배송완료",
}

export const CATEGORY = {
  "문구": {
    code: 100,
    style: css`
      justify-content: flex-start;
    `,
    list: [
      {
        id: 101,
        name: "노트",
      },
      {
        id: 102,
        name: "필기류",
      },
      {
        id: 103,
        name: "잡화",
      },
    ],
  },
  "리빙": {
    code: 200,
    list: [
      {
        id: 201,
        name: "가방",
      },
      {
        id: 202,
        name: "의류",
      },
      {
        id: 203,
        name: "레터링시트지",
      },
      {
        id: 204,
        name: "있어 시리즈",
      },
    ],
  },
  "책": {
    code: 300,
    list: [
      {
        id: 301,
        name: "매거진",
      },
      {
        id: 302,
        name: "기타",
      },
    ],
  },
  "배민그린": {
    code: 400,
    list: [
      {
        id: 401,
        name: "가방",
      },
      {
        id: 402,
        name: "문구",
      },
      {
        id: 403,
        name: "리빙",
      },
      {
        id: 404,
        name: "기타",
      },
    ],
  },
  "ㅋㅋ에디션": {
    code: 500,
    list: [
      {
        id: 501,
        name: "양말",
      },
      {
        id: 502,
        name: "슬리퍼",
      },
      {
        id: 503,
        name: "핸드폰 엑세서리",
      },
      {
        id: 504,
        name: "옷",
      },
      {
        id: 505,
        name: "기타",
      },
    ],
  },
  "을지로 에디션": {
    code: 600,
    list: [
      {
        id: 601,
        name: "뱃지",
      },
      {
        id: 602,
        name: "엽서",
      },
      {
        id: 603,
        name: "리빙",
      },
      {
        id: 604,
        name: "기타",
      },
    ],
  },
  "배달이 친구들": {
    code: 700,
    list: [
      {
        id: 701,
        name: "뱃지",
      },
      {
        id: 702,
        name: "피규어",
      },
      {
        id: 703,
        name: "기타",
      },
    ],
  },
  "선물하기": { code: 800, list: [] },
  "콜라보레이션": { code: 900, list: [] },
};
