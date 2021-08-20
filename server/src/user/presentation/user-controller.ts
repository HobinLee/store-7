import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { SignupRequest } from "../dto/signup-request";
import { UserService } from "../application/user-service";
import { CheckEmailResponse } from "../dto/check-email-response";
import statusCode from "@/config/statusCode";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(
    @Body() signupRequest: SignupRequest,
    @Res({ passthrough: true }) signupResponse: Response
  ) {
    try {
      await this.userService.signUp(signupRequest, signupResponse);
      signupResponse.status(statusCode.SUCCESS);
    } catch (e) {
      signupResponse.status(statusCode.BAD_REQUEST);
    } finally {
      return;
    }
  }

  @Get()
  async checkEmailExist(
    @Query("email") email: string
  ): Promise<CheckEmailResponse | Error> {
    return this.userService.checkEmailExist(email);
  }
}
