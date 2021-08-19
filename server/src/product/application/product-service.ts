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

@Injectable()
export class ProductService {
  constructor(
    private readonly products: Products,
    private readonly questions: Questions,
    private readonly reviews: Reviews
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

  async getReviews(productId: number) {
    const product = await this.getProduct(productId);
    return ReviewResponse.of(); // TODO insert product.reviews in parameter
  }

  // question
  // 단일 요청이 필요할지 모르니 일단 만들어두고 이후 필요 없으면 삭제, 컨트롤러에서 사용 안 하는 중
  async getQuestion(id: number) {
    const question = await this.questions.findQuestion(id);
    return QuestionResponse.of(question);
  }

  async createProduct(productBody: ProductUploadRequest, images, detailImages) {
    const productEntity = Product.toEntity(productBody);
    const product = await this.products.createProduct(productEntity);
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

  async postQuestion(question: QuestionPostRequest) {
    await this.questions.createQuestion(question);
  }

  async patchQuestion(request: QuestionPatchRequest) {
    await this.questions.editQuestion(request);
  }

  async deleteQuestion(id: number) {
    await this.questions.deleteQuestion(id);
  }

  async getProductReview(productId: number) {
    await this.reviews.findReviewsByProjectId(productId);
  }
}
