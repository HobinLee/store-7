import { Product } from "../entity/product";

export class ProductResponse {
  id: number;
  name: string;
  price: number;
  originPrice: number;
  discountRate: number;
  isWish: boolean;
  amount: number;
  image: string;

  constructor(
    id: number,
    name: string,
    price: number,
    originPrice: number,
    discountRate: number,
    isWish: boolean,
    amount: number,
    image: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.originPrice = originPrice;
    this.discountRate = discountRate;
    this.isWish = isWish;
    this.amount = amount;
    this.image = image;
  }

  static of(product: Product): ProductResponse {
    const id = product.id,
      name = product.name,
      originPrice = product.price,
      disCountRate = product.discountRate,
      amount = product.stock,
      image = product.getThumbnailImage();

    let price = originPrice;
    if (disCountRate > 0) price *= disCountRate / 100;

    return new ProductResponse(
      id,
      name,
      price,
      originPrice,
      disCountRate,
      false,
      amount,
      image
    );
  }
}
