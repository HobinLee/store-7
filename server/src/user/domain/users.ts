import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDTO } from "../dto/create-user";
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

  async createAndGetUserId(createUser: CreateUserDTO): Promise<number> {
    const result = await this.createUser(createUser);
    return result.identifiers[0].id;
  }

  async createUser(createUser: CreateUserDTO) {
    return await this.userRepository.insert(createUser);
  }
}
