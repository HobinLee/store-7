import { moveTo } from "@/Router";
import { GET } from "@/utils/axios";
import { useQuery } from "react-query";
import { ProductParams } from "./products";

// GET products/keywords/:keyword
const getKeywords = (keyword: string) =>
  keyword.length && GET(`/products/keywords/${keyword}`);

export const useKeywords = (keyword: string) =>
  useQuery(["autoComplete", keyword], () => getKeywords(keyword), {
    keepPreviousData: true,
  });

export interface SearchParams extends ProductParams {
  keyword: string;
}

export const getSearchedProducts = async (searchParams: SearchParams) => {
  if (searchParams.keyword.length === 0) {
    moveTo("/");
    return [];
  }

  return await GET(`/products/search`, searchParams);
};

export const useSearchProducts = (searchParams: SearchParams) =>
  useQuery(["autoComplete", searchParams], () =>
    getSearchedProducts(searchParams)
  );
