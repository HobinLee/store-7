import { CategoryType } from "@/Components/Header/Menu";
import dayjs from "dayjs";
import { ItemType, QuestionListType, ReviewListType, UserType } from "./type";

export const sampleMypage = {
  shopping: [
    { itemTitle: "주문목록/배송조회", path: "orderlist" },
    { itemTitle: "찜리스트", path: "wishlist" },
  ],
  userInfo: [
    { itemTitle: "회원정보 변경", path: "userinfo" },
    { itemTitle: "나의 상품문의", path: "question" },
    { itemTitle: "나의 상품후기", path: "review" },
  ],
};

export const sampleUser: UserType = {
  name: "이정민",
  phone: "010-4632-6807",
  email: "ljm991108@gmail.com",
  image: "",
  addresses: [
    {
      id: 0,
      name: "집",
      detailAddress: "서울 강남구 선릉로76길 33 (대치동) 대치파인빌, 101호",
      postcode: {
        postcode: 10101,
        address: "서울 강남구 선릉로76길 33 (대치동) 대치파인빌, 101호",
      },
    },
    {
      id: 1,
      name: "회사",
      detailAddress: "우아한형제들 작은집",
      postcode: {
        postcode: 10101,
        address: "서울 강남구 선릉로76길 33 (대치동) 대치파인빌, 101호",
      },
    },
    {
      id: 1,
      name: "회사",
      detailAddress: "우아한형제들 작은집",
      postcode: {
        postcode: 10101,
        address: "서울 강남구 선릉로76길 33 (대치동) 대치파인빌, 101호",
      },
    },
    {
      id: 1,
      name: "회사",
      detailAddress: "우아한형제들 작은집",
      postcode: {
        postcode: 10101,
        address: "서울 강남구 선릉로76길 33 (대치동) 대치파인빌, 101호",
      },
    },
  ],
  defaultDestinationId: 0,
};

export const questions: QuestionListType = {
  totalCount: 2,
  questions: [
    {
      id: 0,
      question: {
        author: "우아한개발자",
        content: "점심 뭐드셨어여",
        date: new Date(),
        category: "상품",
      },
    },
    {
      id: 1,
      question: {
        author: "우아한개발자",
        content: `방금 배송 받아서 풀어봤는데, 검수하고 보내신 것 맞나요?
        기다렸던 상품이라 서둘러 뜯었는데, 오염이 잔뜩 뭍어있는거 보고 완전 속상했어요
        다른 상품에도 조금씩 뭍은건 닦으니 지워져서 그냥 사용하려고 하는데,
        중 사이즈 1개는 닦아도 오염이 남아있어요
        찝찝해서 교환신청합니다`,
        date: new Date(),
        category: "배송",
      },
      answer: {
        content: `안녕하세요 고객님
        불편을 드려 죄송합니다
        아래 방법 참고하시어 접수 부탁드립니다.
        [카톡접수]
        카카오톡>친구추가>올리빙 검색후
        사이트.성함.사진첨부접수요청`,
        date: new Date(),
      },
    },
  ],
};

export const reviews: ReviewListType = {
  totalCount: 3,
  averageRate: 3.5,
  rates: [
    { rate: 5, count: 0 },
    { rate: 4, count: 1 },
    { rate: 3, count: 2 },
    { rate: 2, count: 0 },
    { rate: 1, count: 0 },
  ],
  reviews: [
    {
      id: 0,
      rate: 3,
      content: "조아유",
      img: "https://store.baemin.com/data/board/upload/goodsreview/eea0b21ff31b55a0",
      author: "우아한개발자",
      date: new Date(),
    },
    {
      id: 1,
      rate: 3,
      content:
        "흠 처음에 별 생각 없이 구매했는데, 생각보다 너무 잘 산것 같습니다. 부모님께서 참 좋아하세요. 이렇게 긴 리뷰라면 내일 곱도리탕 맛있게 먹을 수 있겠죠? 데모 화이팅!",
      img: "https://store.baemin.com/data/board/upload/goodsreview/4d9f2950f11c0478",
      author: "우아한개발자",
      date: new Date(),
    },
    {
      id: 3,
      rate: 4,
      img: "https://store.baemin.com/data/board/upload/goodsreview/0b3a8185859afb31",
      content: "와 너무 귀여워요 ㅠㅠ",
      author: "우아한개발자",
      date: new Date(),
    },
  ],
};

export const sampleMain = [
  {
    id: 1,
    discountRate: 40,
    tags: ["new", "sale"],
    title: `타이틀이 굉장히 길어지면 무슨 일이 일어날지 대비하기 위해 작성하는 굉장히 긴 타이틀입니동. 세상에 이렇게 긴 타이틀을 가진 제품이 있을진 모르겠지만 그래도 일단 길에 줄줄 늘어놔야겠죠? 아 배고프다 이따 저녁은 어제 시킨 김치찜인데 솔직히 맛있진 않아서.. 떡볶이 먹고 싶다`,
    price: 10000,
    isWish: true,
  },
  {
    id: 2,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    title: "타이틀2",
    price: 260000,
    isWish: false,
  },
  {
    id: 3,
    tags: ["green"],
    title: "타이틀3",
    price: 10000,
    isWish: false,
  },
  {
    id: 4,
    discountRate: 50,
    tags: ["sale"],
    title: "타이틀4",
    price: 100000,
    isWish: true,
  },
];

export const sampleCategory = [
  {
    id: 1,
    discountRate: 40,
    tags: ["new", "sale"],
    title:
      "`타이틀이 굉장히 길어지면 무슨 일이 일어날지 대비하기 위해 작성하는 굉장히 긴 타이틀입니동. 세상에 이렇게 긴 타이틀을 가진 제품이 있을진 모르겠지만 그래도 일단 길에 줄줄 늘어놔야겠죠? 아 배고프다 이따 저녁은 어제 시킨 김치찜인데 솔직히 맛있진 않아서.. 떡볶이 먹고 싶다`",
    price: 10000,
    isWish: true,
  },
  {
    id: 2,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    title: "타이틀2",
    price: 260000,
    isWish: false,
  },
  {
    id: 3,
    tags: ["green"],
    title: "타이틀3",
    price: 10000,
    isWish: true,
  },
  {
    id: 4,
    discountRate: 50,
    tags: ["sale"],
    title: "타이틀4",
    price: 100000,
    isWish: true,
  },
  {
    id: 5,
    discountRate: 40,
    tags: ["new", "sale"],
    title: "타이틀",
    price: 10000,
    isWish: false,
  },
  {
    id: 6,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    title: "타이틀2",
    price: 260000,
    isWish: false,
  },
  {
    id: 7,
    tags: ["green"],
    title: "타이틀3",
    price: 10000,
    isWish: true,
  },
  {
    id: 8,
    discountRate: 50,
    tags: ["sale"],
    title: "타이틀4",
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
    title: "전체",
  },
  {
    title: "문구",
    subCategories: [
      {
        title: "펜",
      },
      {
        title: "공책",
      },
    ],
  },
  {
    title: "리빙",
    subCategories: [
      {
        title: "가방",
      },
      {
        title: "그립톡",
      },
      {
        title: "레터링시트지",
      },
      {
        title: "돗자리",
      },
      {
        title: "기타",
      },
    ],
  },
  {
    title: "책",
    subCategories: [
      {
        title: "매거진",
      },
      {
        title: "소설",
      },
      {
        title: "교양용",
      },
      {
        title: "전문가용",
      },
      {
        title: "기타",
      },
    ],
  },
  {
    title: "배민그린",
    subCategories: [
      {
        title: "가방",
      },
      {
        title: "문구",
      },
      {
        title: "리빙",
      },
      {
        title: "기타",
      },
    ],
  },
  {
    title: "ㅋㅋ에디션",
    subCategories: [
      {
        title: "양말",
      },
      {
        title: "슬리퍼",
      },
      {
        title: "핸드폰 액세서리",
      },
      {
        title: "옷",
      },
      {
        title: "기타",
      },
    ],
  },
  {
    title: "을지로에디션",
    subCategories: [
      {
        title: "뱃지",
      },
      {
        title: "엽서",
      },
      {
        title: "리빙",
      },
      {
        title: "기타",
      },
    ],
  },
  {
    title: "배달이친구들",
    subCategories: [
      {
        title: "포스터",
      },
      {
        title: "피규어",
      },
      {
        title: "기타",
      },
    ],
  },
  {
    title: "선물세트",
    subCategories: [
      {
        title: "문구",
      },
      {
        title: "리빙",
      },
      {
        title: "기타",
      },
    ],
  },
  {
    title: "콜라보레이션",
    subCategories: [
      {
        title: "업사이클링",
      },
      {
        title: "세븐일레븐",
      },
      {
        title: "넛때문이야",
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
    date: "20210813",
    number: "20210813004530201",
    url: "https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg",
    title:
      "아 11시 30분에 했던 걸 날려먹어서 다시 하고 있네 하하 인생은 도전보단 안전이다 내일 점심 저녁 다 맛있는거 머거야지 데모 영상은 뭐 그냥 뚝딱 찍자",
    price: 10000,
    count: 2,
    status: "shipping",
    reviewID: 0,
  },
  {
    id: 2,
    date: "20210812",
    number: "20210812004533211",
    url: "https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg",
    title: "점심은 떡볶이",
    price: 5000,
    count: 10,
    status: "completed",
    reviewID: 12,
  },
  {
    id: 3,
    date: "20210809",
    number: "20210809004313219",
    url: "https://user-images.githubusercontent.com/41738385/128832252-b19d32b1-0a89-4eb6-b5d9-c399de5f44cc.jpeg",
    title: "어제 먹은 김치찜은 별로였는데 아직도 남음.",
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
    title: "제목 1",
    date: "20210814",
    author: "홍영준",
  },
  {
    id: 2,
    number: 234,
    title: "제목 2",
    date: "20210815",
    author: "홍영준",
  },
];
