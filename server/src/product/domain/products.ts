import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entity/product";

@Injectable()
export class Products {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  findProducts() {
    this.productRepository.find();
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
