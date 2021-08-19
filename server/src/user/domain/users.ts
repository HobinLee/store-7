import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignupRequest } from "../dto/signup-request";
import { User } from "../entity/user";

@Injectable()
export class Users {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(signupRequset: SignupRequest) {
    //const resultUser = await this.userRepository.insert();
    //const resultUser = await this.userRepository.insert();
    return true;
  }
}
