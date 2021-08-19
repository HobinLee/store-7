import { Body, Controller, Delete, Post, Res } from "@nestjs/common";
import { AuthService } from "../application/auth-service";
import { SigninRequest } from "../dto/signin-request";
import { Response } from "express";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(
    @Body() signinRequest: SigninRequest,
    @Res({ passthrough: true }) signinResponse: Response
  ): Promise<Error | string> {
    return this.authService.signIn(signinRequest, signinResponse);
  }

  @Delete()
  async signOut(@Res({ passthrough: true }) signoutResponse: Response) {
    return this.authService.signOut(signoutResponse);
  }
}
