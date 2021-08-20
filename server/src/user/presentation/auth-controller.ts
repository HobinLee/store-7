import { Body, Controller, Delete, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "../application/auth-service";
import { SigninRequest } from "../dto/signin-request";
import { Request, Response } from "express";

const STATUS = {
  SUCCESS: 200,
  AUTH_REQUIRED: 407,
};
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
      signinResponse.status(STATUS.SUCCESS);
    } catch (e) {
      signinResponse.status(STATUS.AUTH_REQUIRED);
    } finally {
      return;
    }
  }

  @Delete()
  async signOut(
    @Res({ passthrough: true }) signoutResponse: Response,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log("try to sign out");
    try {
      await this.authService.signOut(signoutResponse);
      res.status(STATUS.SUCCESS);
    } catch (e) {
      console.error(e);
      res.status(STATUS.AUTH_REQUIRED);
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
      ? response.status(STATUS.SUCCESS)
      : response.status(STATUS.AUTH_REQUIRED);
    return;
  }
}
