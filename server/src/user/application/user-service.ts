import { Injectable, Res } from "@nestjs/common";
import { Users } from "../domain/users";
import { SignupRequest } from "../dto/signup-request";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
import properties from "../../config/properties/properties";
import { CheckEmailResponse } from "../dto/check-email-response";
import PasswordEncoder from "../infrastructure/password-encoder";
import { DestinationService } from "src/destination/application/destination-service";
import { CreateUserDTO } from "../dto/create-user";
import {
  createFirstDestination,
  FirstDestinationDTO,
} from "../dto/create-address";

const RESULT_MSG = {
  SUCCESS_TO_SIGN_UP: "success to sign up",

  FAILED_TO_SIGN_UP: "계정생성에 실패했습니다.",
  FAILED_TO_GEN_JWT: "json web token 생성 실패",
  FAILED_TO_ADD_DESTINATION: "주소 생성 실패",
};

@Injectable()
export class UserService {
  constructor(
    private readonly users: Users,
    private readonly jwtService: JwtService,
    private readonly destinationService: DestinationService
  ) {}

  async signUp(
    { address, ...user }: SignupRequest,
    @Res({ passthrough: true }) signupResponse: Response
  ): Promise<string | Error> {
    try {
      const userId = await this.createNewUser(user);
      if (!userId) throw new Error(RESULT_MSG.FAILED_TO_SIGN_UP);

      const newAddress = await this.createNewAddress(address, userId);
      if (!newAddress) throw new Error(RESULT_MSG.FAILED_TO_ADD_DESTINATION);

      console.log("USER ID IS: " + userId);

      const token: string = await this.jwtService.signAsync({ userId });
      if (!token) throw new Error(RESULT_MSG.FAILED_TO_GEN_JWT);

      signupResponse.cookie(properties.auth.tokenKey, token);

      return RESULT_MSG.SUCCESS_TO_SIGN_UP;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async createNewUser(user: CreateUserDTO): Promise<number> {
    try {
      //TODO: validation 체크

      user.password = PasswordEncoder.encode(user.password);

      return await this.users.createAndGetUserId(user);
    } catch (e) {
      return 0;
    }
  }

  async createNewAddress(address: FirstDestinationDTO, userId: number) {
    try {
      return await this.destinationService.createDestination(
        createFirstDestination(userId, address)
      );
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async checkEmailExist(email: string): Promise<CheckEmailResponse | Error> {
    try {
      return { isExist: !!(await this.users.findUserByEmail(email)) };
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
