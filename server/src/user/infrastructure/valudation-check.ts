import { Injectable } from "@nestjs/common";

@Injectable()
export default class ValidationChecker {
  static checkEmailValidation(email: string): boolean {
    return email.length > 10;
  }

  static checkPWValidation(password: string): boolean {
    return password.length > 10;
  }
}
