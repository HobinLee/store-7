import { Injectable } from "@nestjs/common";
import { ProductElementResponse } from "../dto/product-element-response";
import { Products } from "../domain/products";
import { ProductResponse } from "@/product/dto/product-response";
import { QuestionResponse } from "@/product/dto/question-response";
import { ReviewResponse } from "@/product/dto/review-response";
import { ProductUploadRequest } from "@/product/dto/product-upload-request";
import { Product } from "@/product/entity/product";
import { S3Repository } from "@/product/infrastructure/s3-repository";
import { ProductOption } from "@/product/entity/option";

@Injectable()
export class ProductService {
  constructor(private readonly products: Products) {}

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
    return ProductResponse.of(product);
  }

  async getReviews(productId: number) {
    const product = await this.getProduct(productId);
    return ReviewResponse.of(); // TODO insert product.reviews in parameter
  }

  async getQuestions(productId: number) {
    const product = await this.getProduct(productId);
    return QuestionResponse.of(); // TODO insert product.questions in parameter
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
}
