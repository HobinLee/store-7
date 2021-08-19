import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Product } from "@/product/entity/product";

const ORDER_TYPE = {
  hot: { orderAmount: "DESC" },
  new: { createdAt: "DESC" },
  priceAsc: { price: "ASC" },
  priceDesc: { price: "DESC" },
};

@Injectable()
export class Products {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async findProductsByOrderAndCategoryAndSubCategoryAndKeyword(
    order: string | "",
    category: string | "",
    subCategory: string | "",
    keyword: string | ""
  ): Promise<Product[]> {
    return this.productRepository.find({
      relations: ["options", "images", "detailImages"],
      where: {
        category: wrapWordToLike(category),
        subCategory: wrapWordToLike(subCategory),
        name: wrapWordToLike(keyword),
      },
      order: ORDER_TYPE[order],
    });
  }

  async findProductById(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  createProduct() {
    this.productRepository.create();
  }

  async deleteProduct(id: number) {
    await this.productRepository.delete(id);
  }
}

const wrapWordToLike = (word: string) => {
  if (!word) return Like("%%");
  return Like(`%${word}%`);
};

const generateOrder = (order: string) => {
  const orderName = order.split;
};
