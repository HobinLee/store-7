import {
  All,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "../application/auth-service";
import { SigninRequest } from "../dto/signin-request";
import { Request, Response } from "express";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @All()
  middleWare(@Req() req: Request) {
    req.params.userId = "14";
  }

  @Post()
  async signIn(
    @Param("userId") userId: string,
    @Body() signinRequest: SigninRequest,
    @Res({ passthrough: true }) signinResponse: Response
  ): Promise<Error | string> {
    console.log(userId);
    return this.authService.signIn(signinRequest, signinResponse);
  }

  @Delete()
  async signOut(@Res({ passthrough: true }) signoutResponse: Response) {
    return this.authService.signOut(signoutResponse);
  }
}
