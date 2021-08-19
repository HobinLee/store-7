import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartService } from "./application/cart-service";
import { Carts } from "./domain/carts";
import { Cart } from "./entity/cart";
import { CartController } from "./presentation/cart-controller";

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService, Carts],
  exports: [CartService],
})
export class CartModule {}
