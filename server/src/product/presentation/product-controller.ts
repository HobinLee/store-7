import { Controller, Get, Param } from "@nestjs/common";
import { ProductService } from "../application/product-service";
import { ProductResponse } from "../dto/product-response";

@Controller("/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    @Param("order") order,
    @Param("category") category,
    @Param("subCategory") subCategory,
    @Param("keyword") keyword
  ): Promise<ProductResponse[]> {
    return await this.productService.getProducts(
      order,
      category,
      subCategory,
      keyword
    );
  }
}
