import { Product } from "@/product/entity/product";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WishRequest } from "../dto/wish-request";
import { Wish } from "../entity/wish";

@Injectable()
export class Wishes {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async findMyWishesByUserId(userId: number): Promise<Wish[]> {
    return await this.wishRepository.find({
      relations: ["product", "product.images", "user"],
      where: { user_id: userId },
    });
  }

  async createWish(wish: WishRequest) {
    this.productRepository.findOne(wish.productId).then((product) => {
      product.wishLength++;
      this.productRepository.save(product);
    });
    await this.wishRepository.insert({
      user_id: wish.userId,
      product_id: wish.productId,
    });
  }

  async deleteWish(wish: WishRequest) {
    this.productRepository.findOne(wish.productId).then((product) => {
      if (product.wishLength > 0) {
        product.wishLength++;
      }
      this.productRepository.save(product);
    });
    return await this.wishRepository.delete({
      user_id: wish.userId,
      product_id: wish.productId,
    });
  }
}
