import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import properties from "../../config/properties/properties";

@Injectable()
export default class PasswordEncoder {
  static encode(password: string): string {
    return bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(properties.auth.saltRounds)
    );
  }

  static check(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
