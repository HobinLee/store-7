export interface ProductFindQuery {
  ids?: number[];
  order: string;
  category: string;
  subCategory: string;
  keyword: string;
  page: number;
  size: number;
}
