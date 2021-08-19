import { Module } from "@nestjs/common";
import MysqlConfig from "./infra/mysql/mysql-config";
import { UserModule } from "./user/user-module";
import { ProductModule } from "./product/product-module";
import { DestinationModule } from "./destination/destination-module";
import { CartModule } from "./cart/cart-module";
import { OrderModule } from "./order/order-module";

@Module({
  imports: [
    MysqlConfig,
    UserModule,
    ProductModule,
    DestinationModule,
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
