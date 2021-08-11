import dayjs from "dayjs";
import { QuestionListType, ReviewListType } from "./type";

export const sampleMypage = {
  shopping: [
    { itemTitle: "주문목록/배송조회", path: "itemlist" },
    { itemTitle: "찜리스트", path: "wishlist" },
  ],
  userInfo: [
    { itemTitle: "회원정보 변경", path: "changeUserInfo" },
    { itemTitle: "나의 상품문의", path: "question" },
    { itemTitle: "나의 상품후기", path: "review" },
  ],
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
      author: "우아한개발자",
      date: dayjs(new Date()).format("YYYY.MM.DD"),
    },
    {
      id: 1,
      rate: 3,
      content: "흠",
      author: "우아한개발자",
      date: dayjs(new Date()).format("YYYY.MM.DD"),
    },
    {
      id: 3,
      rate: 4,
      content: "와",
      author: "우아한개발자",
      date: dayjs(new Date()).format("YYYY.MM.DD"),
    },
  ],
};

export const sampleMain = [
  {
    id: 1,
    discountRate: 40,
    tags: ["new", "sale"],
    title: "타이틀",
    price: 10000,
  },
  {
    id: 2,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    title: "타이틀2",
    price: 260000,
  },
  {
    id: 3,
    tags: ["green"],
    title: "타이틀3",
    price: 10000,
  },
  {
    id: 4,
    discountRate: 50,
    tags: ["sale"],
    title: "타이틀4",
    price: 100000,
  },
];

export const sampleCategory = [
  {
    id: 1,
    discountRate: 40,
    tags: ["new", "sale"],
    title: "타이틀",
    price: 10000,
  },
  {
    id: 2,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    title: "타이틀2",
    price: 260000,
  },
  {
    id: 3,
    tags: ["green"],
    title: "타이틀3",
    price: 10000,
  },
  {
    id: 4,
    discountRate: 50,
    tags: ["sale"],
    title: "타이틀4",
    price: 100000,
  },
  {
    id: 5,
    discountRate: 40,
    tags: ["new", "sale"],
    title: "타이틀",
    price: 10000,
  },
  {
    id: 6,
    discountRate: 20,
    tags: ["new", "green", "sale"],
    title: "타이틀2",
    price: 260000,
  },
  {
    id: 7,
    tags: ["green"],
    title: "타이틀3",
    price: 10000,
  },
  {
    id: 8,
    discountRate: 50,
    tags: ["sale"],
    title: "타이틀4",
    price: 100000,
  },
];

export const wishlistSample = {
  ths: ["상품명/옵션", "상품금액/수량", " 합계"],
  ratio: [6, 1, 1],
};
