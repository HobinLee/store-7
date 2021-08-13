import { Injectable } from "@nestjs/common";
import { User } from "../domain/user";
import { SigninRequest } from "../dto/signin-request";

@Injectable()
export class AuthService {
  constructor(private readonly user: User) {}

  auth(signinRequest: SigninRequest): string {
    return "Authenticated!";
  }
}
