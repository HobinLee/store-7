import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../application/auth-service";
import { SigninRequest } from "../dto/signin-request";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  auth(@Body() signinRequest: SigninRequest): string {
    return this.authService.auth(signinRequest);
  }
}
