import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartRequest, CartModifyRequest } from "../dto/cart-request";
import { Cart } from "../entity/cart";

@Injectable()
export class Carts {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) {}

  async findCartsByUserId(userId: number) {
    return await this.cartRepository.find({ where: { userId } });
  }

  createCart(destination: CartRequest) {
    this.cartRepository.create(destination);
  }

  async updateCart(
    userId: number,
    { amount, productOptionId }: CartModifyRequest
  ) {
    return await this.cartRepository.update(
      { userId },
      { ...(amount && { amount }), ...(productOptionId && { productOptionId }) }
    );
  }

  async deleteCart(id: number) {
    await this.cartRepository.delete({ id });
  }
}
