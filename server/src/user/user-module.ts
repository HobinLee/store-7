import { Module } from "@nestjs/common";
import { AuthService } from "./application/auth-service";
import { User } from "./domain/user";
import PasswordEncoder from "./infrastructure/password-encoder";
import { AuthController } from "./presentation/auth-controller";

@Module({
  controllers: [AuthController],
  providers: [AuthService, User, PasswordEncoder],
})
export class UserModule {}
