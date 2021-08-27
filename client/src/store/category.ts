import { decodeParams } from "@/utils/location";
import { atom } from "recoil";

const initParams = decodeParams();

export const selectedCategoryState = atom({
  key: "selectedCategory",
  default: {
    categoryId: parseInt(initParams.category) ?? 0,
    subCategoryId: initParams.subCategory
      ? parseInt(initParams.subCategory)
      : null,
  },
});

export const categoryPaddingState = atom({
  key: "categoryPadding",
  default: 0,
});

export const hoveredCategoryState = atom({
  key: "hoveredCategory",
  default: {
    categoryId: null,
    subCategoryId: null,
  },
});
