import { atom } from "recoil";

export const selectedCategoryState = atom({
  key: "selecteCategory",
  default: {
    categoryId: -1,
    subCategoryId: 0,
  },
});

export const categoryPaddingState = atom({
  key: "categoryPadding",
  default: 0,
});

export const hoveredCategoryState = atom({
  key: "hoveredCategory",
  default: {
    categoryId: -1,
    subCategoryId: -1,
  },
});
