import { ProductType } from "@/shared/type";
import { GET } from "@/utils/axios";
import { useQuery } from "react-query";

// GET products/keywords/:keyword
const getKeywords = (keyword) => GET(`/products/keywords/${keyword}`);

export const useKeywords = (keyword: string) =>
  useQuery(["autoComplete", keyword], () => getKeywords(keyword));

// GET products/search/:keyword
const getSearchedProducts = (keyword) => GET(`/products/search/${keyword}`);
export const useSearchProducts = () =>
  useQuery(["autoComplete"], (keyword) => getSearchedProducts(keyword));
