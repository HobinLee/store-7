import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOperator, In, Like, Repository } from "typeorm";
import { Product } from "@/product/entity/product";
import { S3Repository } from "@/product/infrastructure/s3-repository";
import { ProductImage } from "@/product/entity/product-image";
import { ProductDetailImage } from "@/product/entity/product-detail-image";
import { ProductOption } from "@/product/entity/option";
import { ProductFindQuery } from "../dto/product-find-query";

const RANDOM_FILENAME_LENGTH = 32;
const START_PAGE = 1;
const PRODUCT_PER_PAGE = 12;

const ORDER_TYPE = {
  default: { "product.id": "DESC" },
  hot: { "product.wishCount": "DESC" },
  new: { "product.id": "DESC" },
  discount: { "product.discountRate": "DESC" },
  priceAsc: { "product.price": "ASC" },
  priceDesc: { "product.price": "DESC" },
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

  async findProductsByQueries(
    query: ProductFindQuery,
    userId?: number
  ): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.images", "images")
      .where(generateWhere(query.category, query.subCategory, query.ids))
      .skip(((query.page ?? START_PAGE) - 1) * (query.size ?? PRODUCT_PER_PAGE))
      .take(query.size ?? PRODUCT_PER_PAGE)
      .orderBy(ORDER_TYPE[query.order]);

    return userId
      ? queryBuilder.leftJoinAndSelect("product.wishes", "wishes").getMany()
      : queryBuilder.getMany();
  }

  async findProductById(id: number): Promise<Product> {
    return this.productRepository.findOne(id, {
      relations: ["options", "images", "detailImages", "wishes"],
    });
  }

  async findAllProductsByKeyword(keyword: string): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ["images", "orders"],
      where: [
        { name: wrapWordToLike(keyword) },
        { category: wrapWordToLike(keyword) },
        { subCategory: wrapWordToLike(keyword) },
      ],
      order: {
        id: "DESC",
      },
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

  async updateOptionStock(id, stock) {
    await this.productOptionRepository.update({ id }, { stock });
  }

  async updateProduct(product: Product): Promise<Product> {
    const result = await this.productRepository.update(product.id, product);
    return await this.findProductById(result.raw.insertId);
  }

  async updateProductStock(id: number, stock: number) {
    await this.productRepository.update({ id }, { stock });
  }

  async deleteProduct(id: number) {
    this.findProductById(id).then((product) => {
      product.images.forEach((image) => {
        this.s3Repository.deleteObject(image.id);
      });
      product.detailImages.forEach((image) => {
        this.s3Repository.deleteObject(image.id);
      });
    });
    await this.productRepository.delete(id);
  }

  async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ["images"],
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

interface WhereType {
  id?: FindOperator<unknown>;
  category?: FindOperator<unknown>;
  subCategory?: FindOperator<unknown>;
}

const generateWhere = (category, subCategory, ids) => {
  const where: WhereType = {};

  if (ids) where.id = In(ids);
  if (category) where.category = wrapWordToLike(category);
  if (subCategory) where.subCategory = wrapWordToLike(subCategory);

  return where;
};
