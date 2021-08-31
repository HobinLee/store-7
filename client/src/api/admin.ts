import { GET } from "@/utils/axios";

export const getStocksOfCategories = async () =>
  await GET("/admin/category-stock");

export const getStocksOfHotCategories = async () =>
  await GET("/admin/category-hot");
