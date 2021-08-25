import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createQueryBuilder, In, Like, Repository } from "typeorm";
import { Product } from "@/product/entity/product";
import { S3Repository } from "@/product/infrastructure/s3-repository";
import { ProductImage } from "@/product/entity/product-image";
import { ProductDetailImage } from "@/product/entity/product-detail-image";
import { ProductOption } from "@/product/entity/option";

const RANDOM_FILENAME_LENGTH = 32;
const START_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const ORDER_TYPE = {
  hot: { price: "DESC" },
  new: { createdAt: "DESC" },
  discount: { discountRate: "DESC" },
  priceAsc: { price: "ASC" },
  priceDesc: { price: "DESC" },
};

@Injectable()
export class Products {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductDetailImage)
    private readonly productDetailImageRepository: Repository<ProductDetailImage>,
    @InjectRepository(ProductOption)
    private readonly productOptionRepository: Repository<ProductOption>,
    private readonly s3Repository: S3Repository
  ) {}

  async findProductsByOrderAndCategoryAndSubCategoryAndKeyword(
    order: string | "",
    category: string | "",
    subCategory: string | "",
    page: number = START_PAGE,
    size: number = DEFAULT_PAGE_SIZE,
    ids?: number[]
  ): Promise<Product[]> {
    return this.productRepository.find({
      relations: ["options", "images", "detailImages"],
      where: {
        category: wrapWordToLike(category),
        subCategory: wrapWordToLike(subCategory),
      },
      order: ORDER_TYPE[order],
    });
  }

  async findProductById(id: number): Promise<Product> {
    return this.productRepository.findOne(id, {
      relations: ["options", "images", "detailImages", "wishes", "wishes.user"],
    });
  }

  async createProduct(product: Product): Promise<Product> {
    const result = await this.productRepository.insert(product);
    return await this.findProductById(result.raw.insertId);
  }

  addImages(images, product) {
    images?.forEach((image) => {
      const fileName = generateRandomFileName();
      this.s3Repository.putObject(fileName, image);
      this.productImageRepository.insert({
        id: fileName,
        product,
      });
    });
  }

  addDetailImages(detailImages, product) {
    detailImages?.forEach((image) => {
      const fileName = generateRandomFileName();
      this.s3Repository.putObject(fileName, image);
      this.productDetailImageRepository.insert({
        id: fileName,
        product,
      });
    });
  }

  addOption(options, product) {
    options.forEach((option) => {
      this.productOptionRepository.insert({
        product,
        value: option.name,
        stock: option.stock,
      } as ProductOption);
    });
  }

  async updateProduct(product: Product): Promise<Product> {
    const result = await this.productRepository.update(product.id, product);
    return await this.findProductById(result.raw.insertId);
  }

  async deleteProduct(id: number) {
    await this.productRepository.delete(id);
  }

  async findProductsByIds(productIds: number[]): Promise<Product[]> {
    return await this.productRepository.find({ id: In(productIds) });
  }

  async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      order: {
        id: "DESC",
      },
    });
  }
}

const wrapWordToLike = (word: string) => {
  if (!word) return Like("%%");
  return Like(`%${word}%`);
};

const generateRandomFileName = () => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < RANDOM_FILENAME_LENGTH; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
