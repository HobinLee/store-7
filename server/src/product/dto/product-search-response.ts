import { Product } from "../entity/product";

export class SearchProduct {
  productId: number;
  name: string;

  static of(product: Product): SearchProduct {
    return {
      productId: product.id,
      name: product.name,
    } as SearchProduct;
  }
}
