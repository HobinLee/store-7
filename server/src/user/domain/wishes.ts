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

  async findMyWishesByUserId(userId: number): Promise<Wish[]> {
    return await this.wishRepository.find({
      relations: ["product", "product.images", "user"],
      where: { user_id: userId },
    });
  }
  async createWish(wish: WishRequest) {
    await this.wishRepository.insert({
      user_id: wish.userId,
      product_id: wish.productId,
    });
  }

  async deleteWish(wish: WishRequest) {
    return await this.wishRepository.delete({
      user_id: wish.userId,
      product_id: wish.productId,
    });
  }
}
