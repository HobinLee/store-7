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
    try {
      await this.userService.signUp(signupRequest, signupResponse);
      signupResponse.status(HttpStatus.OK);
      return { message: messages.success.SUCCESS_TO_SIGN_UP };
    } catch (e) {
      signupResponse.status(HttpStatus.BAD_REQUEST);
      return e.message;
    }
  }

  @Get()
  async checkEmailExist(
    @Query("email") email: string
  ): Promise<CheckEmailResponse | Error> {
    return this.userService.checkEmailExist(email);
  }
}
