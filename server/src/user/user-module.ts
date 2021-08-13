import { Module } from "@nestjs/common";
import { AuthService } from "./application/auth-service";
import { User } from "./domain/user";
import { AuthController } from "./presentation/auth-controller";

@Module({
  controllers: [AuthController],
  providers: [AuthService, User],
})
export class UserModule {}
