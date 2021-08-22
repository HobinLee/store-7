import { moveTo } from "@/Router";
import { ProductType } from "@/shared/type";
import { GET } from "@/utils/axios";
import { useQuery } from "react-query";

// GET products/keywords/:keyword
const getKeywords = (keyword: string) =>
  keyword.length && GET(`/products/keywords/${keyword}`);

export const useKeywords = (keyword: string) =>
  useQuery(["autoComplete", keyword], () => getKeywords(keyword));

// GET products/search/:keyword
const getSearchedProducts = (keyword: string) => {
  if (keyword.length === 0) {
    moveTo("/");
    return [];
  }
  GET(`/products/search/${keyword}`);
};
export const useSearchProducts = (keyword: string) =>
  useQuery(["autoComplete", keyword], () => getSearchedProducts(keyword));
