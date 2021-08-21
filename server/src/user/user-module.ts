import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./application/auth-service";
import { Users } from "./domain/users";
import { User } from "./entity/user";
import PasswordEncoder from "./infrastructure/password-encoder";
import { AuthController } from "./presentation/auth-controller";
import { JwtModule } from "@nestjs/jwt";
import properties from "../config/properties/properties";
import { UserController } from "./presentation/user-controller";
import { UserService } from "./application/user-service";
import { DestinationModule } from "src/destination/destination-module";
import { MyController } from "./presentation/my-controller";
import { CartModule } from "@/cart/cart-module";
import { MyService } from "./application/my-service";
import { Reviews } from "@/product/domain/reviews";
import { Questions } from "@/product/domain/questions";
import { Review } from "@/product/entity/review";
import { Question } from "@/product/entity/question";
import { ProductService } from "@/product/application/product-service";
import { Product } from "@/product/entity/product";
import { Orders } from "@/order/domain/orders";
import { Order } from "@/order/entity/order";
import { ProductModule } from "@/product/product-module";
import { Wishes } from "./domain/wishes";
import { Wish } from "./entity/wish";

const jwtConfig = properties.auth;

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Review, Question, Product, Order, Wish]),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    DestinationModule,
    CartModule,
    ProductModule,
  ],
  controllers: [AuthController, UserController, MyController],
  providers: [
    PasswordEncoder,
    AuthService,
    UserService,
    MyService,
    ProductService,
    Users,
    Reviews,
    Questions,
    Orders,
    Wishes,
  ],
})
export class UserModule {}
