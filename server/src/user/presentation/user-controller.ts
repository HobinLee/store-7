import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { SignupRequest } from "../dto/signup-request";
import { UserService } from "../application/user-service";
import { CheckEmailResponse } from "../dto/check-email-response";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(
    @Body() signupRequest: SignupRequest,
    @Res({ passthrough: true }) signupResponse: Response
  ): Promise<string | Error> {
    return this.userService.signUp(signupRequest, signupResponse);
  }

  @Get()
  async checkEmailExist(
    @Param("email") email: string
  ): Promise<CheckEmailResponse | Error> {
    return this.userService.checkEmailExist(email);
  }
}
