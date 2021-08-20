import { Body, Controller, Delete, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "../application/auth-service";
import { SigninRequest } from "../dto/signin-request";
import { Request, Response } from "express";
import statusCode from "@/config/statusCode";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(
    @Body() signinRequest: SigninRequest,
    @Res({ passthrough: true }) signinResponse: Response
  ) {
    try {
      await this.authService.signIn(signinRequest, signinResponse);
      signinResponse.status(statusCode.SUCCESS);
    } catch (e) {
      signinResponse.status(statusCode.BAD_REQUEST);
    } finally {
      return;
    }
  }

  @Delete()
  async signOut(
    @Res({ passthrough: true }) signoutResponse: Response,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      await this.authService.signOut(signoutResponse);
      res.status(statusCode.SUCCESS);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST);
    } finally {
      return;
    }
  }

  @Get()
  async verifyToken(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    (await this.authService.verifyToken(req))
      ? response.status(statusCode.SUCCESS)
      : response.status(statusCode.AUTH_REQUIRED);
    return;
  }
}
