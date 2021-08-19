import { Injectable } from "@nestjs/common";
import { ProductResponse } from "../dto/product-response";
import { Products } from "../domain/products";

@Injectable()
export class ProductService {
  constructor(private readonly products: Products) {}

  async getProducts(
    order: string,
    category: string,
    subCategory: string,
    keyword: string
  ): Promise<ProductResponse[]> {
    const products =
      await this.products.findProductsByOrderAndCategoryAndSubCategoryAndKeyword(
        order,
        category,
        subCategory,
        keyword
      );
    return products.map(ProductResponse.of);
  }
}
