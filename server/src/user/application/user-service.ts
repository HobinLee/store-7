import { Injectable, Res } from "@nestjs/common";
import { Users } from "../domain/users";
import { SignupRequest } from "../dto/signup-request";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import properties from "../../config/properties/properties";
import { CheckEmailResponse } from "../dto/check-email-response";
import PasswordEncoder from "../infrastructure/password-encoder";

const RESULT_MSG = {
  SUCCESS_TO_SIGN_UP: "success to sign up",

  FAILED_TO_SIGN_UP: "계정생성에 실패했습니다.",
  FAILED_TO_GEN_JWT: "json web token 생성 실패",
};

@Injectable()
export class UserService {
  constructor(
    private readonly users: Users,
    private readonly jwtService: JwtService
  ) {}

  async signUp(
    signupRequest: SignupRequest,
    @Res({ passthrough: true }) signupResponse: Response
  ): Promise<string | Error> {
    try {
      //TODO: validation 체크

      signupRequest.password = PasswordEncoder.encode(signupRequest.password);

      const newUser = await this.users.createUser(signupRequest);

      if (!newUser) throw Error(RESULT_MSG.FAILED_TO_SIGN_UP);

      //TODO: destination도 만들어주기

      const token: string = this.jwtService.sign({
        email: signupRequest.email,
        password: signupRequest.password,
      });

      if (!token) throw Error(RESULT_MSG.FAILED_TO_GEN_JWT);

      signupResponse.cookie(properties.auth.tokenKey, token);

      return RESULT_MSG.SUCCESS_TO_SIGN_UP;
    } catch (e) {
      return e;
    }
  }

  async checkEmailExist(email: string): Promise<CheckEmailResponse | Error> {
    try {
      return { isExist: !!(await this.users.findUserByEmail(email)) };
    } catch (e) {
      return e;
    }
  }
}
