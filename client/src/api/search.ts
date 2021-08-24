import { moveTo } from "@/Router";
import { ProductType } from "@/shared/type";
import { GET } from "@/utils/axios";
import { useQuery } from "react-query";
import { ProductParams } from "./products";

// GET products/keywords/:keyword
const getKeywords = (keyword: string) =>
  keyword.length && GET(`/products/keywords/${keyword}`);

export const useKeywords = (keyword: string) =>
  useQuery(["autoComplete", keyword], () => getKeywords(keyword));

export interface SearchParams extends ProductParams {
  keyword: string;
}

const getSearchedProducts = async (searchParams: SearchParams) => {
  if (searchParams.keyword.length === 0) {
    moveTo("/");
    return [];
  }
  const result = await GET(`/products/search`, searchParams);
  return result;
};
export const useSearchProducts = (searchParams: SearchParams) =>
  useQuery(["autoComplete", searchParams], () =>
    getSearchedProducts(searchParams)
  );
