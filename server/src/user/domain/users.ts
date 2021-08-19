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

  async createUser(createUser: CreateUserDTO): Promise<number> {
    return (
      (await (
        await this.userRepository.insert(createUser)
      ).identifiers[0].id) ?? 0
    );
  }
}
