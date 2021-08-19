import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductService } from "../application/product-service";
import { ProductResponse } from "../dto/product-response";

@Controller("/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    @Query("order") order,
    @Query("category") category,
    @Query("subCategory") subCategory,
    @Query("keyword") keyword
  ): Promise<ProductResponse[]> {
    return await this.productService.getProducts(
      order,
      category,
      subCategory,
      keyword
    );
  }
}
