import { Injectable, Res } from "@nestjs/common";
import { Users } from "../domain/users";
import { SigninRequest } from "../dto/signin-request";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import properties from "../../config/properties/properties";
import PasswordEncoder from "../infrastructure/password-encoder";

const RESULT_MSG = {
  SUCCESS_TO_SIGN_IN: "success to sign in",
  SUCCESS_TO_SIGN_OUT: "success to sign out",

  FAILED_TO_SIGN_IN: "이메일 또는 비밀번호가 다릅니다",
  FAILED_TO_GEN_JWT: "json web token 생성 실패",
};

@Injectable()
export class AuthService {
  constructor(
    private readonly users: Users,
    private readonly jwtService: JwtService
  ) {}

  async signIn(
    signinRequest: SigninRequest,
    @Res({ passthrough: true }) signinResponse: Response
  ): Promise<string | Error> {
    try {
      const { email, password } = signinRequest;
      const userPW: string = await (
        await this.users.findUserByEmail(email)
      ).password;

      if (!userPW || !PasswordEncoder.check(password, userPW)) {
        throw Error(RESULT_MSG.FAILED_TO_SIGN_IN);
      }

      const token: string = await this.jwtService.signAsync(signinRequest);

      if (!token) throw Error(RESULT_MSG.FAILED_TO_GEN_JWT);

      signinResponse.cookie(properties.auth.tokenKey, token);

      return RESULT_MSG.SUCCESS_TO_SIGN_IN;
    } catch (e) {
      return e;
    }
  }

  signOut(@Res({ passthrough: true }) signoutResponse: Response) {
    try {
      signoutResponse.clearCookie(properties.auth.tokenKey);
      return RESULT_MSG.SUCCESS_TO_SIGN_OUT;
    } catch (e) {
      return e;
    }
  }
}
