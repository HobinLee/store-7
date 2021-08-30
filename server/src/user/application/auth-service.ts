import { Injectable, Req, Res } from "@nestjs/common";
import { Users } from "../domain/users";
import { SigninRequest } from "../dto/signin-request";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import properties from "../../config/properties/properties";
import PasswordEncoder from "../infrastructure/password-encoder";
import messages from "@/config/messages";
import {
  getGithubAccessToken,
  getGithubUserInfo,
} from "../infrastructure/github-login";
import { CreateUserDTO } from "../dto/create-user";
import {
  getGoogleAccessToken,
  getGoogleUserInfo,
} from "../infrastructure/google-login";
import { ETException } from "@/config/filter/exception-handler";

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
    const user = await this.users.findUserByEmail(email);
    if (!user) throw new ETException(406, messages.failed.FAILED_TO_SIGN_IN);

    const { id: userId, password: userPW } = user;

    if (!userPW || !PasswordEncoder.check(password, userPW)) {
      throw new ETException(406, messages.failed.FAILED_TO_SIGN_IN);
    }

    const token: string = await this.jwtService.signAsync({ userId });
    if (!token) throw new ETException(406, messages.failed.FAILED_TO_GEN_JWT);

    signinResponse.cookie(properties.auth.tokenKey, token);

    return messages.success.SUCCESS_TO_SIGN_IN;
  }

  signOut(@Res({ passthrough: true }) signoutResponse: Response) {
    try {
      signoutResponse.clearCookie(properties.auth.tokenKey);
      return messages.success.SUCCESS_TO_SIGN_OUT;
    } catch (e) {
      throw new ETException(400, messages.failed.FAILED_TO_SIGN_OUT);
    }
  }

  verifyToken(@Req() request: Request) {
    const token = request.cookies[properties.auth.tokenKey];
    if (!token) throw new ETException(407);

    return !!this.jwtService.verifyAsync(token);
  }

  //*-------------------------- Github Login --------------------------------

  async githubLogin(code: string, @Res() res: Response) {
    try {
      const accessToken = await getGithubAccessToken(code);
      if (!accessToken)
        throw new ETException(400, messages.failed.FAIL_GET_ACCESS_TOKEN);

      const info = await getGithubUserInfo(accessToken);
      const userId = await this.getGithubUserId(info);

      const token: string = await this.jwtService.signAsync({ userId });
      if (!token) throw new ETException(400, messages.failed.FAILED_TO_GEN_JWT);

      res.cookie(properties.auth.tokenKey, token);
    } catch (e) {
      throw new ETException(400, e.message);
    }
  }

  getGithubUserId = async ({ id, node_id, avatar_url, name, login, email }) => {
    const existUser = await this.users.findUserByEmail(id);
    if (existUser) return existUser.id;

    const user: CreateUserDTO = {
      email: id,
      password: node_id,
      name: name ?? login ?? email,
      //profile: avatar_url, TODO: 이미지 변환 후 저장
    };

    return await this.users.createAndGetUserId(user);
  };

  //*-------------------------- Google Login --------------------------------

  async googleLogin(code: string, @Res() res: Response) {
    try {
      const accessToken = await getGoogleAccessToken(code);
      if (!accessToken)
        throw new ETException(400, messages.failed.FAIL_GET_ACCESS_TOKEN);

      const info = await getGoogleUserInfo(accessToken);
      const userId = await this.getGoogleUserId(info);
      if (!userId)
        throw new ETException(400, messages.failed.FAILED_TO_SIGN_IN);

      const token: string = await this.jwtService.signAsync({ userId });
      if (!token) throw new ETException(400, messages.failed.FAILED_TO_GEN_JWT);

      res.cookie(properties.auth.tokenKey, token);
    } catch (e) {
      throw new ETException(400, e.message);
    }
  }

  async getGoogleUserId({ id, name, picture }) {
    const existUser = await this.users.findUserByEmail(id);
    if (existUser) {
      return existUser.id;
    }

    const user: CreateUserDTO = {
      email: id,
      password: PasswordEncoder.encode(id),
      name: name,
      //profile: picture, TODO: 이미지 변환 후 저장
    };

    return await this.users.createAndGetUserId(user);
  }
}
