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

const jwtConfig = properties.auth;

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    DestinationModule,
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, Users, PasswordEncoder],
})
export class UserModule {}
