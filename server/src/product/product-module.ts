import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entity/product";
import { Products } from "./domain/products";
import { ProductImage } from "./entity/product-image";
import { ProductDetailImage } from "./entity/product-detail-image";
import { ProductOption } from "./entity/option";
import { ProductController } from "./presentation/product-controller";
import { ProductService } from "./application/product-service";
import { S3Repository } from "@/product/infrastructure/s3-repository";
import { Question } from "./entity/question";
import { Questions } from "./domain/questions";
import { ImageService } from "@/product/application/image-service";
import { ImageController } from "@/product/presentation/image-controller";
import { ReviewController } from "@/product/presentation/review-controller";
import { Reviews } from "./domain/reviews";
import { Review } from "./entity/review";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import properties from "@/config/properties/properties";
import { SearchService } from "./application/search-service";
import { ReviewService } from "./application/review-service";
import { QuestionController } from "./presentation/question-controller";
import { QuestionService } from "./application/question-service";
import { Wishes } from "@/user/domain/wishes";
import { Wish } from "@/user/entity/wish";
import { AdminController } from "./presentation/admin-controller";

const elasticsearchConfig = properties.elastic;

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductOption,
      ProductImage,
      ProductDetailImage,
      Question,
      Review,
      Wish,
    ]),
    ElasticsearchModule.register({
      node: elasticsearchConfig.node,
      auth: {
        username: elasticsearchConfig.username,
        password: elasticsearchConfig.password,
      },
    }),
  ],
  controllers: [
    ProductController,
    ImageController,
    ReviewController,
    QuestionController,
    AdminController,
  ],
  providers: [
    Products,
    ProductService,
    SearchService,
    S3Repository,
    Questions,
    Reviews,
    ImageService,
    ReviewService,
    QuestionService,
    Wishes,
  ],
  exports: [Products, ElasticsearchModule, SearchService],
})
export class ProductModule {}
