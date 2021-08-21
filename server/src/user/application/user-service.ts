import { Injectable, Res } from "@nestjs/common";
import { Users } from "../domain/users";
import { SignupRequest } from "../dto/signup-request";
import { JwtService } from "@nestjs/jwt";
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
import messages from "@/config/messages";
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
    const userId = await this.createNewUser(user);
    if (!userId) throw new Error(messages.failed.FAILED_TO_SIGN_UP);

    const newAddress = await this.createNewAddress(address, userId);
    if (!newAddress) throw new Error(messages.failed.FAILED_TO_ADD_DESTINATION);

    const token: string = await this.jwtService.signAsync({ userId });
    if (!token) throw new Error(messages.failed.FAILED_TO_GEN_JWT);

    signupResponse.cookie(properties.auth.tokenKey, token);

    return messages.success.SUCCESS_TO_SIGN_UP;
  }

  async createNewUser(user: CreateUserDTO): Promise<number> {
    try {
      //TODO: validation 체크
      user.password = PasswordEncoder.encode(user.password);

      return await this.users.createAndGetUserId(user);
    } catch (error) {
      console.error(error);
      throw Error(messages.failed.FAILED_TO_SIGN_UP);
    }
  }

  async createNewAddress(address: FirstDestinationDTO, userId: number) {
    try {
      return await this.destinationService.createDestination(
        userId,
        createFirstDestination(address)
      );
    } catch (error) {
      throw Error(error);
    }
  }

  async checkEmailExist(email: string): Promise<CheckEmailResponse | Error> {
    try {
      return { isExist: !!(await this.users.findUserByEmail(email)) };
    } catch (error) {
      throw Error(error);
    }
  }
}
