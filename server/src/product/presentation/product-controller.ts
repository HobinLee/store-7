import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { ProductService } from "../application/product-service";
import { ProductElementResponse } from "../dto/product-element-response";
import { ProductResponse } from "@/product/dto/product-response";
import { ReviewResponse } from "@/product/dto/review-response";
import { QuestionResponse } from "@/product/dto/question-response";

@Controller("/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    @Query("order") order,
    @Query("category") category,
    @Query("subCategory") subCategory,
    @Query("keyword") keyword
  ): Promise<ProductElementResponse[]> {
    return await this.productService.getProducts(
      order,
      category,
      subCategory,
      keyword
    );
  }

  @Get("/:id")
  async getProduct(@Param("id") id: number): Promise<ProductResponse> {
    return await this.productService.getProduct(id);
  }

  @Get("/:productId/reviews")
  async getReviews(
    @Param("productId") productId: number
  ): Promise<ReviewResponse> {
    return await this.productService.getReviews(productId);
  }

  @Get("/:productId/questions")
  async getQuestions(
    @Param("productId") productId: number
  ): Promise<QuestionResponse> {
    return await this.productService.getQuestions(productId);
  }

  @Delete("/:id")
  async deleteProduct(@Param("id") id: number) {
    await this.productService.deleteProduct(id);
  }
}
