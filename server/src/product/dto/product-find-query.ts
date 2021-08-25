export interface ProductFindQuery {
  ids?: number[];
  order: string;
  category: string;
  subCategory: string;
  page: number;
  size: number;
}

export interface ProductSearchQuery extends ProductFindQuery {
  keyword: string;
}
