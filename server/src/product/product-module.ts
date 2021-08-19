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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductOption,
      ProductImage,
      ProductDetailImage,
      Question,
    ]),
  ],
  controllers: [ProductController, ImageController],
  providers: [Products, ProductService, S3Repository, Questions, ImageService],
})
export class ProductModule {}
