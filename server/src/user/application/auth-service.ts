import { Injectable, Req, Res } from "@nestjs/common";
import { Users } from "../domain/users";
import { SigninRequest } from "../dto/signin-request";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import properties from "../../config/properties/properties";
import PasswordEncoder from "../infrastructure/password-encoder";
import messages from "@/config/messages";

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
    const { email, password } = signinRequest;
    const { id: userId, password: userPW } = await this.users.findUserByEmail(
      email
    );

    if (!userPW || !PasswordEncoder.check(password, userPW)) {
      throw Error(messages.failed.FAILED_TO_SIGN_IN);
    }

    const token: string = await this.jwtService.signAsync({ userId });
    if (!token) throw Error(messages.failed.FAILED_TO_GEN_JWT);

    signinResponse.cookie(properties.auth.tokenKey, token);

    return messages.success.SUCCESS_TO_SIGN_IN;
  }

  signOut(@Res({ passthrough: true }) signoutResponse: Response) {
    signoutResponse.clearCookie(properties.auth.tokenKey);
    return messages.success.SUCCESS_TO_SIGN_OUT;
  }

  verifyToken(@Req() request: Request) {
    const token = request.cookies[properties.auth.tokenKey];
    if (!token) return false;

    return !!this.jwtService.verifyAsync(token);
  }
}
