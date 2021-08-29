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
import { ProductFindQuery } from "../dto/product-find-query";
import { ProductAdminResponse } from "../dto/product-admin-response";
import { ProductReviewsQuery } from "../dto/product-request";

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
    findQuery: ProductFindQuery,
    userId: number
  ): Promise<ProductElementResponse[]> {
    const products = await this.products.findProductsByQueries(findQuery);
    return products.map((product) =>
      ProductElementResponse.of(product, userId)
    );
  }

  async getAllProductsByKeyword(keyword: string) {
    const products = await this.products.findAllProductsByKeyword(keyword);
    return products.map(ProductAdminResponse.of);
  }

  async getProduct(id: number, userId: number) {
    const product = await this.products.findProductById(id);
    if (product) {
      return ProductResponse.of(product, userId);
    }
    throw new Error("404 Product NotFound");
  }

  async getProductReviews(productId: number, query: ProductReviewsQuery) {
    const { sortBy, isPhotoOnly, rating } = query;
    const reviews = await this.reviews.findReviewsByProductId(
      productId,
      sortBy
    );

    const rateFiltered =
      (rating !== "all" &&
        reviews.filter((review) => review.rate === parseInt(rating))) ||
      reviews ||
      reviews;

    const photoFiltered =
      (isPhotoOnly === "true" &&
        rateFiltered.filter((review) => review.image !== null)) ||
      rateFiltered;

    const result = ReviewResponse.of(reviews);

    return { ...result, reviews: photoFiltered, length: result.reviews.length };
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
      const option = JSON.parse(productBody.option);
      this.products.addOption(option.list, product);
    }
    return product.id;
  }

  async deleteProduct(id: number) {
    this.serachService.deleteProduct(id);
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
