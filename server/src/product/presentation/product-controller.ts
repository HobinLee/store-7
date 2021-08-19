import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "../application/product-service";
import { ProductElementResponse } from "../dto/product-element-response";
import { ProductResponse } from "@/product/dto/product-response";
import { ReviewResponse } from "@/product/dto/review-response";
import { QuestionResponse } from "@/product/dto/question-response";
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { ProductUploadRequest } from "@/product/dto/product-upload-request";

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

  @UseInterceptors(
    FileFieldsInterceptor([{ name: "images" }, { name: "details" }])
  )
  @Post()
  async addProduct(
    @UploadedFiles() files,
    @Body() body: ProductUploadRequest
  ): Promise<number> {
    return await this.productService.createProduct(
      body,
      files.images,
      files.details
    );
  }

  @Delete("/:id")
  async deleteProduct(@Param("id") id: number) {
    await this.productService.deleteProduct(id);
  }
}
