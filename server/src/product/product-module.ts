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
import { Reviews } from "./domain/reviews";
import { Review } from "./entity/review";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductOption,
      ProductImage,
      ProductDetailImage,
      Question,
      Review,
    ]),
  ],
  controllers: [ProductController, ImageController],
  providers: [
    Products,
    ProductService,
    S3Repository,
    Questions,
    Reviews,
    ImageService,
  ],
  exports: [Products],
})
export class ProductModule {}
