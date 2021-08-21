import { Module, MiddlewareConsumer } from "@nestjs/common";
import MysqlConfig from "./infra/mysql/mysql-config";
import { UserModule } from "./user/user-module";
import { ProductModule } from "./product/product-module";
import { DestinationModule } from "./destination/destination-module";
import { CartModule } from "./cart/cart-module";
import { OrderModule } from "./order/order-module";
import { LoggerMiddleware } from "./jwt-middleware";
import { JwtModule } from "@nestjs/jwt";
import properties from "./config/properties/properties";

const jwtConfig = properties.auth;

@Module({
  imports: [
    MysqlConfig,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    ProductModule,
    DestinationModule,
    CartModule,
    OrderModule,
    UserModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .exclude("/auth")
      .exclude("/auth/*")
      .exclude("/users")
      .exclude("/users/*")
      .forRoutes("*");
  }
}
