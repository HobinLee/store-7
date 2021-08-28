import { MainCategoryType } from "@/Pages/Category";
import { ItemType, ProductElementType, ReviewType } from "./type";
import {
  CategoryBanner0,
  CategoryBanner1,
  CategoryBanner2,
  CategoryBanner3,
  CategoryBanner4,
  CategoryBanner5,
  CategoryBanner6,
  CategoryBanner7,
  CategoryBanner8,
  CategoryBanner9,
} from "@/assets";

export const IMAGE_DUMMY =
  "https://store.baemin.com/data/board/upload/goodsreview/eea0b21ff31b55a0";

export const categories: MainCategoryType[] = [
  {
    id: 0,
    name: "전체",
    brief: "",
    fontColor: "#333",
    backgroundImg: CategoryBanner0,
    subCategories: [],
  },
  {
    id: 100,
    name: "문구",
    brief: "세상 하나뿐인 필통을 위해",
    fontColor: "#333",
    backgroundImg: CategoryBanner1,
    subCategories: [
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
  {
    id: 200,
    name: "리빙",
    brief: "날 안 사고 살 수 있겠어?",
    fontColor: "#333",
    backgroundImg: CategoryBanner2,
    subCategories: [
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
  {
    id: 300,
    name: "책",
    brief: "쌓인만큼 교양이 쌓인다",
    backgroundImg: CategoryBanner3,
    subCategories: [
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
  {
    id: 400,
    name: "배민그린",
    brief: "내가 그린 지구 그림",
    fontColor: "#32BF9A",
    backgroundImg: CategoryBanner4,
    subCategories: [
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
  {
    id: 500,
    name: "ㅋㅋ에디션",
    brief: "즐겁게 살자구ㅋㅋ",
    fontColor: "#555",
    font: "BMKIRANGHAERANG",
    backgroundImg: CategoryBanner5,
    subCategories: [
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
  {
    id: 600,
    name: "을지로 에디션",
    brief: "여기는 영원히 아날로그야",
    font: "BMEULJIRO",
    fontColor: "#333",
    backgroundImg: CategoryBanner6,
    subCategories: [
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
  {
    id: 700,
    name: "배달이 친구들",
    brief: "만나서 반가워",
    fontColor: "#32BF9A",
    backgroundImg: CategoryBanner7,
    subCategories: [
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
  {
    id: 800,
    name: "선물하기",
    brief: "주면 200% 친해지는",
    backgroundImg: CategoryBanner8,
    subCategories: [],
  },
  {
    id: 900,
    name: "콜라보레이션",
    brief: "우아한 콜라보",
    fontColor: "#32BF9A",
    backgroundImg: CategoryBanner9,
    subCategories: [],
  },
];

export const sampleMain = [
  {
    id: 1,
    discountRate: 40,
    name: `타이틀이 굉장히 길어지면 무슨 일이 일어날지 대비하기 위해 작성하는 굉장히 긴 타이틀입니동. 세상에 이렇게 긴 타이틀을 가진 제품이 있을진 모르겠지만 그래도 일단 길에 줄줄 늘어놔야겠죠? 아 배고프다 이따 저녁은 어제 시킨 김치찜인데 솔직히 맛있진 않아서.. 떡볶이 먹고 싶다`,
    price: 10000,
    isWish: true,
  },
  {
    id: 2,
    discountRate: 20,
    name: "타이틀2",
    price: 260000,
    isWish: false,
  },
  {
    id: 3,
    name: "타이틀3",
    price: 10000,
    isWish: false,
  },
  {
    id: 4,
    discountRate: 50,
    name: "타이틀4",
    price: 100000,
    isWish: true,
  },
];

export const sampleProducts: ProductElementType[] = [
  {
    id: 1,
    discountRate: 40,
    name: "`타이틀이 굉장히 길어지면 무슨 일이 일어날지 대비하기 위해 작성하는 굉장히 긴 타이틀입니동. 세상에 이렇게 긴 타이틀을 가진 제품이 있을진 모르겠지만 그래도 일단 길에 줄줄 늘어놔야겠죠? 아 배고프다 이따 저녁은 어제 시킨 김치찜인데 솔직히 맛있진 않아서.. 떡볶이 먹고 싶다`",
    price: 10000,
    originPrice: 10000,
    amount: 100,
    image: "",
    isWish: true,
  },
  {
    id: 2,
    discountRate: 20,
    name: "타이틀2",
    price: 260000,
    isWish: false,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 3,
    name: "타이틀3",
    price: 10000,
    isWish: true,
    discountRate: 0,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 4,
    discountRate: 50,
    name: "타이틀4",
    price: 100000,
    isWish: true,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 5,
    discountRate: 40,
    name: "타이틀",
    price: 10000,
    isWish: false,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 6,
    discountRate: 20,
    name: "타이틀2",
    price: 260000,
    isWish: false,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 7,
    name: "타이틀3",
    price: 10000,
    isWish: true,
    discountRate: 0,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 8,
    discountRate: 50,
    name: "타이틀4",
    price: 100000,
    isWish: true,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 9,
    discountRate: 50,
    name: "타이틀4",
    price: 100000,
    isWish: true,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 10,
    discountRate: 40,
    name: "타이틀",
    price: 10000,
    isWish: false,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 11,
    discountRate: 20,
    name: "타이틀2",
    price: 260000,
    isWish: false,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 12,
    name: "타이틀3",
    price: 10000,
    isWish: true,
    discountRate: 0,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
  {
    id: 13,
    discountRate: 50,
    name: "타이틀4",
    price: 100000,
    isWish: true,
    originPrice: 260000,
    image: "",
    amount: 1,
  },
];

export const wishlistSample = {
  ths: ["상품명/옵션", "상품금액/수량", " 합계"],
  ratio: [6, 1, 1],
};

export const buyItems = {
  totalPrice: 50000,
  totalDelivery: 40000,
  totalPayment: 90000,
  totalCount: 5,
  items: [
    {
      name: "1+1 IH 인덕션/스마트 프라이팬 궁중팬 균일가 골라담기",
      num: 1,
      price: 10000,
      delivery: 2500,
    },
    {
      name: "1+1 IH 인덕션/스마트 프라이팬 궁중팬 균일가 골라담기",
      num: 1,
      price: 10000,
      delivery: 2500,
    },
    {
      name: "1+1 IH 인덕션/스마트 프라이팬 궁중팬 균일가 골라담기",
      num: 1,
      price: 10000,
      delivery: 2500,
    },
    {
      name: "1+1 IH 인덕션/스마트 프라이팬 궁중팬 균일가 골라담기",
      num: 1,
      price: 10000,
      delivery: 2500,
    },
    {
      name: "1+1 IH 인덕션/스마트 프라이팬 궁중팬 균일가 골라담기",
      num: 1,
      price: 10000,
      delivery: 2500,
    },
  ],
};

export const sampleItemDetail: ItemType = {
  name: "1+1 IH 인덕션/스마트 프라이팬 궁중팬 균일가 골라담기",
  price: 10000,
  delivery: 2500,
};

export const recent = [
  {
    id: 1,
    date: new Date(),
    number: "20210813004530201",
    image:
      "https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg",
    name: "아 11시 30분에 했던 걸 날려먹어서 다시 하고 있네 하하 인생은 도전보단 안전이다 내일 점심 저녁 다 맛있는거 머거야지 데모 영상은 뭐 그냥 뚝딱 찍자",
    price: 10000,
    count: 2,
    status: "shipping",
    reviewID: 0,
  },
  {
    id: 2,
    date: new Date(),
    number: "20210812004533211",
    image:
      "https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg",
    name: "점심은 떡볶이",
    price: 5000,
    count: 10,
    status: "completed",
    reviewID: 12,
  },
  {
    id: 3,
    date: new Date(),
    number: "20210809004313219",
    image:
      "https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg",
    name: "어제 먹은 김치찜은 별로였는데 아직도 남음.",
    price: 27500,
    count: 1,
    status: "completed",
    reviewID: 12,
  },
];

export const review = [
  {
    id: 1,
    number: 123,
    name: "제목 1",
    date: "20210814",
    authorName: "홍영준",
  },
  {
    id: 2,
    number: 234,
    name: "제목 2",
    date: "20210815",
    authorName: "홍영준",
  },
];

export const reviews: ReviewType[] = [
  {
    id: 1,
    rate: 3,
    content: "조아유",
    image:
      "https://store.baemin.com/data/board/upload/goodsreview/eea0b21ff31b55a0",
    authorName: "쭈니쭈니",
    date: new Date(),
    product: {
      id: 7,
      name: "더미더미",
    },
    order: {
      user: {
        name: "et",
      },
    },
  },
  {
    id: 1,
    rate: 3,
    content:
      "흠 처음에 별 생각 없이 구매했는데, 생각보다 너무 잘 산것 같습니다. 부모님께서 참 좋아하세요. 이렇게 긴 리뷰라면 내일 곱도리탕 맛있게 먹을 수 있겠죠? 데모 화이팅!",
    image:
      "https://store.baemin.com/data/board/upload/goodsreview/4d9f2950f11c0478",
    authorName: "우아한개발자",
    date: new Date(),
    product: {
      id: 7,
      name: "더미더미",
    },
    order: {
      user: {
        name: "et",
      },
    },
  },
  {
    id: 1,
    rate: 4,
    image:
      "https://store.baemin.com/data/board/upload/goodsreview/0b3a8185859afb31",
    content: "와 너무 귀여워요 ㅠㅠ",
    authorName: "호비",
    date: new Date(),
    product: {
      id: 7,
      name: "더미더미",
    },
    order: {
      user: {
        name: "et",
      },
    },
  },
];
