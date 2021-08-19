import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entity/product";
import { Products } from "./domain/products";
import { ProductImage } from "./entity/product-image";
import { ProductDetailImage } from "./entity/product-detail-image";
import { ProductOption } from "./entity/option";
import { ProductController } from "./presentation/product-controller";
import { ProductService } from "./application/product-service";
import { Question } from "./entity/question";
import { Questions } from "./domain/questions";

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
  controllers: [ProductController],
  providers: [Products, Questions, ProductService],
})
export class ProductModule {}
