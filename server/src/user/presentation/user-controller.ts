import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { SignupRequest } from "../dto/signup-request";
import { UserService } from "../application/user-service";
import { CheckEmailResponse } from "../dto/check-email-response";
import messages from "@/config/messages";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(
    @Body() signupRequest: SignupRequest,
    @Res({ passthrough: true }) signupResponse: Response
  ) {
    await this.userService.signUp(signupRequest, signupResponse);
    return { message: messages.success.SUCCESS_TO_SIGN_UP };
  }

  @Get()
  async checkEmailExist(
    @Query("email") email: string
  ): Promise<CheckEmailResponse | Error> {
    return this.userService.checkEmailExist(email);
  }
}
