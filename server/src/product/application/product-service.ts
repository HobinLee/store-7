import { Injectable } from "@nestjs/common";
import { ProductElementResponse } from "../dto/product-element-response";
import { Products } from "../domain/products";
import { ProductResponse } from "@/product/dto/product-response";
import { QuestionResponse } from "@/product/dto/question-response";
import { ReviewResponse } from "@/product/dto/review-response";
import { ProductUploadRequest } from "@/product/dto/product-upload-request";
import { Product } from "@/product/entity/product";
import { Questions } from "../domain/questions";
import {
  QuestionPostRequest,
  QuestionPatchRequest,
} from "../dto/question-request";
import { Reviews } from "../domain/reviews";
import { SearchService } from "./search-service";
import { SearchProduct } from "../dto/product-search-response";

@Injectable()
export class ProductService {
  constructor(
    private readonly products: Products,
    private readonly questions: Questions,
    private readonly reviews: Reviews,
    private readonly serachService: SearchService
  ) {}

  async getProducts(
    order: string,
    category: string,
    subCategory: string,
    keyword: string
  ): Promise<ProductElementResponse[]> {
    const products =
      await this.products.findProductsByOrderAndCategoryAndSubCategoryAndKeyword(
        order,
        category,
        subCategory,
        keyword
      );
    return products.map(ProductElementResponse.of);
  }

  async getProduct(id: number) {
    const product = await this.products.findProductById(id);
    if (product) {
      return ProductResponse.of(product);
    }
    throw new Error("404 Product NotFound");
  }

  async getProductReviews(productId: number) {
    const reviews = await this.reviews.findReviewsByProjectId(productId);
    return ReviewResponse.of(reviews);
  }

  async getQuestion(id: number) {
    const question = await this.questions.findQuestion(id);
    return QuestionResponse.of(question);
  }

  async createProduct(productBody: ProductUploadRequest, images, detailImages) {
    const productEntity = Product.toEntity(productBody);
    const product: Product = await this.products.createProduct(productEntity);
    this.serachService.createProduct(SearchProduct.of(product));
    this.products.addImages(images, product);
    this.products.addDetailImages(detailImages, product);
    if (productBody.option) {
      this.products.addOption(productBody.option.list, product);
    }
    return product.id;
  }

  async deleteProduct(id: number) {
    await this.products.deleteProduct(id);
  }

  async getProductQuestions(productId: number) {
    const questions = await this.questions.findQuestionsByProductId(productId);
    return questions.map(QuestionResponse.of);
  }

  async getUserQuestions(userId: number) {
    const questions = await this.questions.findQuestionsByUserId(userId);
    return questions.map(QuestionResponse.of);
  }

  async registerQuestion(productId: number, question: QuestionPostRequest) {
    await this.questions.insertQuestion(productId, question);
  }

  async editQuestion(questionId: number, request: QuestionPatchRequest) {
    await this.questions.updateQuestion(questionId, request);
  }

  async deleteQuestion(id: number) {
    await this.questions.deleteQuestion(id);
  }
}
