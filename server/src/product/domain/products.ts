import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Product } from "@/product/entity/product";
import { S3Repository } from "@/product/infrastructure/s3-repository";
import { ProductImage } from "@/product/entity/product-image";
import { ProductDetailImage } from "@/product/entity/product-detail-image";
import { ProductOption } from "@/product/entity/option";

const RANDOM_FILENAME_LENGTH = 32;

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
    return this.productRepository.findOne(id, {
      relations: ["options", "images", "detailImages"],
    });
  }

  async createProduct(product: Product): Promise<Product> {
    const result = await this.productRepository.insert(product);
    return await this.findProductById(result.raw.insertId);
  }

  addImages(images, product) {
    images.forEach((image) => {
      const fileName = generateRandomFileName();
      this.s3Repository.putObject(fileName, image);
      this.productImageRepository.insert({
        id: fileName,
        product,
      });
    });
  }

  addDetailImages(detailImages, product) {
    detailImages.forEach((image) => {
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
}

const wrapWordToLike = (word: string) => {
  if (!word) return Like("%%");
  return Like(`%${word}%`);
};

const generateOrder = (order: string) => {
  const orderName = order.split;
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
