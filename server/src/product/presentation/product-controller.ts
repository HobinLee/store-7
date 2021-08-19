import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ProductService } from "../application/product-service";
import { ProductElementResponse } from "../dto/product-element-response";
import { ProductResponse } from "@/product/dto/product-response";
import { ReviewResponse } from "@/product/dto/review-response";
import { QuestionResponse } from "@/product/dto/question-response";
import {
  QuestionPatchRequest,
  QuestionPostRequest,
} from "../dto/question-request";

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
  async getProductQuestions(
    @Param("productId") productId: number
  ): Promise<QuestionResponse[]> {
    return await this.productService.getProductQuestions(productId);
  }

  @Get("/my/questions")
  async getMyQuestions(
    @Param("userId") userId: number
  ): Promise<QuestionResponse[]> {
    return await this.productService.getUserQuestions(userId);
  }

  @Post("/:questions")
  async postQuestion(@Body() question: QuestionPostRequest) {
    return await this.productService.postQuestion(question);
  }

  @Patch("/questions/:id")
  async patchQuestion(@Body() request: QuestionPatchRequest) {
    return await this.productService.patchQuestion(request);
  }

  @Delete("/questions/:id")
  async deleteQuestion(@Body("id") id: number) {
    await this.productService.deleteQuestion(id);
  }

  @Delete("/:id")
  async deleteProduct(@Param("id") id: number) {
    await this.productService.deleteProduct(id);
  }
}
