import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export default class PasswordEncoder {
  static encode(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static check(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
