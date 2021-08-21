import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "../application/auth-service";
import { SigninRequest } from "../dto/signin-request";
import { Request, Response } from "express";
import messages from "@/config/messages";
import properties from "@/config/properties/properties";

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
      signinResponse.status(HttpStatus.OK);
      return { message: messages.success.SUCCESS_TO_SIGN_IN };
    } catch (e) {
      signinResponse.status(HttpStatus.NOT_ACCEPTABLE);
      return e.message;
    }
  }

  @Delete()
  async signOut(
    @Res({ passthrough: true }) signoutResponse: Response,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      await this.authService.signOut(signoutResponse);
      res.status(HttpStatus.OK);
      return { message: messages.success.SUCCESS_TO_SIGN_OUT };
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST);
      return messages.failed.FAILED_TO_SIGN_OUT;
    }
  }
  @Get("/google")
  async googleSiginin() {
    return;
  }

  @Get("/github")
  async githubSignin(
    @Query("code") code: string,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      await this.authService.githubLogin(code, response);
      response.redirect(properties.local);
    } catch (e) {
      console.error(e);
      return e.message;
    }
  }

  @Get("/googleLogin")
  async redirectToGoogleSignin(@Res({ passthrough: true }) response: Response) {
    const url = `https://github.com/login/oauth/authorize?redirect_uri=${properties.github.redirect}&client_id=${properties.github.id}`;

    response.redirect(url);
  }

  @Get("/githubLogin")
  async redirectToGithubSignin(@Res({ passthrough: true }) response: Response) {
    const url = `https://github.com/login/oauth/authorize?redirect_uri=${properties.github.redirect}&client_id=${properties.github.id}`;

    response.redirect(url);
  }

  @Get()
  async verifyToken(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    (await this.authService.verifyToken(req))
      ? response.status(HttpStatus.OK)
      : response.status(HttpStatus.PROXY_AUTHENTICATION_REQUIRED);
    return;
  }
}
