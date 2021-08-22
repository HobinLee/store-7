import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WishRequest } from "../dto/wish-request";
import { Wish } from "../entity/wish";

@Injectable()
export class Wishes {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>
  ) {}

  async findWishesByUserId(userId: number): Promise<Wish[]> {
    return await this.wishRepository.find({
      relations: ["product", "user"],
      where: { user: { id: userId } },
    });
  }
  async createWish(wish: WishRequest) {
    await this.wishRepository.insert({
      user: {
        id: wish.userId,
      },
      product: {
        id: wish.productId,
      },
    });
  }

  async deleteWish(wish: WishRequest) {
    await this.wishRepository.delete({
      user: {
        id: wish.userId,
      },
      product: {
        id: wish.productId,
      },
    });
  }
}
