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

const jwtConfig = properties.auth;

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    DestinationModule,
    CartModule,
  ],
  controllers: [AuthController, UserController, MyController],
  providers: [AuthService, UserService, Users, PasswordEncoder, MyService],
})
export class UserModule {}
