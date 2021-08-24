import { Injectable } from "@nestjs/common";
import { ProductElementResponse } from "../dto/product-element-response";
import { Products } from "../domain/products";
import { ProductResponse } from "@/product/dto/product-response";
import { QuestionResponse } from "@/product/dto/question-response";
import { ReviewResponse } from "@/product/dto/review-response";
import { ProductUploadRequest } from "@/product/dto/product-upload-request";
import { Product } from "@/product/entity/product";
import { Questions } from "../domain/questions";
import { Reviews } from "../domain/reviews";
import { SearchService } from "./search-service";
import { SearchProduct } from "../dto/product-search-response";
import { Wishes } from "@/user/domain/wishes";

@Injectable()
export class ProductService {
  constructor(
    private readonly products: Products,
    private readonly questions: Questions,
    private readonly reviews: Reviews,
    private readonly serachService: SearchService,
    private readonly wishes: Wishes
  ) {}

  async getProducts(
    order: string,
    category: string,
    subCategory: string,
    keyword: string,
    page: number,
    size: number
  ): Promise<ProductElementResponse[]> {
    const products =
      await this.products.findProductsByOrderAndCategoryAndSubCategoryAndKeyword(
        order,
        category,
        subCategory,
        keyword,
        page,
        size
      );
    if (size) {
      return products.map(ProductElementResponse.of).slice(0, size);
    } else {
      return products.map(ProductElementResponse.of);
    }
  }

  async getProduct(id: number, userId: number) {
    const isWish = userId
      ? !!(await this.wishes.findMyWishByProductId(userId, id))
      : false;
    const product = await this.products.findProductById(id);
    if (product) {
      return ProductResponse.of(product, isWish);
    }
    throw new Error("404 Product NotFound");
  }

  async getProductReviews(productId: number) {
    const reviews = await this.reviews.findReviewsByProductId(productId);
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
}
