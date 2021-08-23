import { CategoryType } from "@/Components/Header/Menu";
import { ItemType, ReviewListType, UserType } from "./type";

export const IMAGE_DUMMY =
  "https://store.baemin.com/data/board/upload/goodsreview/eea0b21ff31b55a0";

export const sampleMain = [
  {
    id: 1,
    discountRate: 40,
    tags: ["new", "sale"],
    name: `타이틀이 굉장히 길어지면 무슨 일이 일어날지 대비하기 위해 작성하는 굉장히 긴 타이틀입니동. 세상에 이렇게 긴 타이틀을 가진 제품이 있을진 모르겠지만 그래도 일단 길에 줄줄 늘어놔야겠죠? 아 배고프다 이따 저녁은 어제 시킨 김치찜인데 솔직히 맛있진 않아서.. 떡볶이 먹고 싶다`,
    price: 10000,
    isWish: true,
  },
  {
    id: 2,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    name: "타이틀2",
    price: 260000,
    isWish: false,
  },
  {
    id: 3,
    tags: ["green"],
    name: "타이틀3",
    price: 10000,
    isWish: false,
  },
  {
    id: 4,
    discountRate: 50,
    tags: ["sale"],
    name: "타이틀4",
    price: 100000,
    isWish: true,
  },
];

export const sampleCategory = [
  {
    id: 1,
    discountRate: 40,
    tags: ["new", "sale"],
    name: "`타이틀이 굉장히 길어지면 무슨 일이 일어날지 대비하기 위해 작성하는 굉장히 긴 타이틀입니동. 세상에 이렇게 긴 타이틀을 가진 제품이 있을진 모르겠지만 그래도 일단 길에 줄줄 늘어놔야겠죠? 아 배고프다 이따 저녁은 어제 시킨 김치찜인데 솔직히 맛있진 않아서.. 떡볶이 먹고 싶다`",
    price: 10000,
    isWish: true,
  },
  {
    id: 2,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    name: "타이틀2",
    price: 260000,
    isWish: false,
  },
  {
    id: 3,
    tags: ["green"],
    name: "타이틀3",
    price: 10000,
    isWish: true,
  },
  {
    id: 4,
    discountRate: 50,
    tags: ["sale"],
    name: "타이틀4",
    price: 100000,
    isWish: true,
  },
  {
    id: 5,
    discountRate: 40,
    tags: ["new", "sale"],
    name: "타이틀",
    price: 10000,
    isWish: false,
  },
  {
    id: 6,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    name: "타이틀2",
    price: 260000,
    isWish: false,
  },
  {
    id: 7,
    tags: ["green"],
    name: "타이틀3",
    price: 10000,
    isWish: true,
  },
  {
    id: 8,
    discountRate: 50,
    tags: ["sale"],
    name: "타이틀4",
    price: 100000,
    isWish: true,
  },
];

export const wishlistSample = {
  ths: ["상품명/옵션", "상품금액/수량", " 합계"],
  ratio: [6, 1, 1],
};

export const categories: CategoryType[] = [
  {
    name: "전체",
  },
  {
    name: "문구",
    subCategories: [
      {
        name: "펜",
      },
      {
        name: "공책",
      },
    ],
  },
  {
    name: "리빙",
    subCategories: [
      {
        name: "가방",
      },
      {
        name: "그립톡",
      },
      {
        name: "레터링시트지",
      },
      {
        name: "돗자리",
      },
      {
        name: "기타",
      },
    ],
  },
  {
    name: "책",
    subCategories: [
      {
        name: "매거진",
      },
      {
        name: "소설",
      },
      {
        name: "교양용",
      },
      {
        name: "전문가용",
      },
      {
        name: "기타",
      },
    ],
  },
  {
    name: "배민그린",
    subCategories: [
      {
        name: "가방",
      },
      {
        name: "문구",
      },
      {
        name: "리빙",
      },
      {
        name: "기타",
      },
    ],
  },
  {
    name: "ㅋㅋ에디션",
    subCategories: [
      {
        name: "양말",
      },
      {
        name: "슬리퍼",
      },
      {
        name: "핸드폰 액세서리",
      },
      {
        name: "옷",
      },
      {
        name: "기타",
      },
    ],
  },
  {
    name: "을지로에디션",
    subCategories: [
      {
        name: "뱃지",
      },
      {
        name: "엽서",
      },
      {
        name: "리빙",
      },
      {
        name: "기타",
      },
    ],
  },
  {
    name: "배달이친구들",
    subCategories: [
      {
        name: "포스터",
      },
      {
        name: "피규어",
      },
      {
        name: "기타",
      },
    ],
  },
  {
    name: "선물세트",
    subCategories: [
      {
        name: "문구",
      },
      {
        name: "리빙",
      },
      {
        name: "기타",
      },
    ],
  },
  {
    name: "콜라보레이션",
    subCategories: [
      {
        name: "업사이클링",
      },
      {
        name: "세븐일레븐",
      },
      {
        name: "넛때문이야",
      },
    ],
  },
];

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
