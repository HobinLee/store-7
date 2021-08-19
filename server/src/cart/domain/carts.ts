import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCartRequest, CartModifyRequest } from "../dto/cart-request";
import { Cart } from "../entity/cart";

@Injectable()
export class Carts {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) {}

  async findCartsByUserId(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "product", "product.images"],
    });
  }

  async createCart(cart: CreateCartRequest) {
    this.cartRepository.insert(cart);
  }

  async updateCart(id: number, { amount, productOptionId }: CartModifyRequest) {
    return await this.cartRepository.update(
      { id },
      { ...(amount && { amount }), ...(productOptionId && { productOptionId }) }
    );
  }

  async deleteCart(id: number) {
    await this.cartRepository.delete({ id });
  }
}
