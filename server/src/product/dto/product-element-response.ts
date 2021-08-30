import { Product } from "../entity/product";

export class ProductElementResponse {
  id: number;
  name: string;
  price: number;
  originPrice: number;
  discountRate: number;
  isWish: boolean;
  stock: number;
  image: string;
  createdAt: Date;
  wishCount: number;

  constructor(response: ProductElementResponse) {
    this.id = response.id;
    this.name = response.name;
    this.price = response.price;
    this.originPrice = response.originPrice;
    this.discountRate = response.discountRate;
    this.isWish = response.isWish;
    this.stock = response.stock;
    this.image = response.image;
    this.createdAt = response.createdAt;
    this.wishCount = response.wishCount;
  }

  static of(product: Product, userId: number): ProductElementResponse {
    const id = product.id,
      name = product.name,
      originPrice = product.price,
      discountRate = product.discountRate,
      stock = product.stock,
      image = product.getThumbnailImage(),
      price = product.getDiscountedPrice(),
      createdAt = product.createdAt,
      wishCount = product.wishCount,
      isWish = userId
        ? product.wishes?.filter((wish) => {
            return wish?.user_id === userId;
          }).length !== 0
        : false;

    return new ProductElementResponse({
      id,
      name,
      price,
      originPrice,
      discountRate,
      isWish,
      stock,
      image,
      createdAt,
      wishCount,
    });
  }
}
