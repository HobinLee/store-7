import { atom } from "recoil";

export const orders = atom({
  key: "orders",
  default: {
    totalPrice: 0,
    totalDelivery: 0,
    totalPayment: 0,
    totalCount: 0,
    items: [],
  },
});
