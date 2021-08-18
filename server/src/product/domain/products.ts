import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Product } from "../entity/product";

@Injectable()
export class Products {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async findProductsByOrderAndCategoryAndSubCategoryAndKeyword(
    order: string,
    category: string,
    subCategory: string,
    keyword: string
  ): Promise<Product[]> {
    return this.productRepository.find({
      relations: ["options", "images", "detailImages"],
      where: {
        category: Like(category),
        subCategory: Like(subCategory),
        name: Like(keyword),
      },
    });
  }

  fintProductById() {
    this.productRepository.findOne();
  }

  createProduct() {
    this.productRepository.create();
  }

  deleteProduct() {
    this.productRepository.delete({});
  }
}
