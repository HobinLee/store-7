import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderService } from "./application/order-service";
import { Orders } from "./domain/orders";
import { Order } from "./entity/order";
import { OrderController } from "./presentation/order-controller";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService, Orders],
})
export class OrderModule {}
