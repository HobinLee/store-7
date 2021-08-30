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
    await this.authService.signIn(signinRequest, signinResponse);
    return { message: messages.success.SUCCESS_TO_SIGN_IN };
  }

  @Delete()
  async signOut(
    @Res({ passthrough: true }) signoutResponse: Response,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.authService.signOut(signoutResponse);
    return { message: messages.success.SUCCESS_TO_SIGN_OUT };
  }

  @Get("/githubLogin")
  async redirectToGithubSignin(@Res({ passthrough: true }) response: Response) {
    const url = `https://github.com/login/oauth/authorize?redirect_uri=${properties.github.redirect}&client_id=${properties.github.id}`;

    response.redirect(url);
  }

  @Get("/github")
  async githubSignin(
    @Query("code") code: string,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.githubLogin(code, response);
    response.redirect(properties.client);
  }

  @Get("/googleLogin")
  async redirectToGoogleSignin(@Res({ passthrough: true }) response: Response) {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${properties.google.redirect}&client_id=${properties.google.id}&response_type=code&include_granted_scopes=true&scope=profile`;

    response.redirect(url);
  }

  @Get("/google")
  async googleSignin(
    @Query("code") code: string,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.googleLogin(code, response);
    response.redirect(properties.client);
  }

  @Get()
  async verifyToken(@Req() req: Request) {
    await this.authService.verifyToken(req);
  }
}
