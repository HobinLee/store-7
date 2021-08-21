import { Product } from "@/product/entity/product";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wish } from "../entity/wish";

@Injectable()
export class Wishes {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>
  ) {}

  async findWishesByUserId(userId: number): Promise<Wish[]> {
    return this.wishRepository.find({
      select: ["product", "user"],
      where: { user: { id: userId } },
    });
  }
}
