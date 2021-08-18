import { Injectable } from "@nestjs/common";
import { Users } from "../domain/users";
import { SigninRequest } from "../dto/signin-request";

@Injectable()
export class AuthService {
  constructor(private readonly users: Users) {}

  auth(signinRequest: SigninRequest): string {
    return "Authenticated!";
  }
}
