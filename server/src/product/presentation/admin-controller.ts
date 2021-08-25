import { Controller, Get, Query } from "@nestjs/common";
import { ProductService } from "../application/product-service";

@Controller("/admin")
export class AdminController {
  constructor(private readonly productService: ProductService) {}

  @Get("/products")
  async getProducts(@Query("keyword") keyword: string) {
    return await this.productService.getAllProductsByKeyword(keyword);
  }
}
