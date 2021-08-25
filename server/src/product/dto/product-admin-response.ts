import { Product } from "../entity/product";

export class ProductAdminResponse {
  id: number;
  name: string;
  price: number;
  originPrice: number;
  discountRate: number;
  isWish: boolean;
  amount: number;
  image: string;
  orderWait: number;
  salse: number;

  constructor(response: ProductAdminResponse) {
    this.id = response.id;
    this.name = response.name;
    this.price = response.price;
    this.originPrice = response.originPrice;
    this.discountRate = response.discountRate;
    this.isWish = response.isWish;
    this.amount = response.amount;
    this.image = response.image;
    this.orderWait = response.orderWait;
    this.salse = response.salse;
  }

  static of(product: Product): ProductAdminResponse {
    const id = product.id,
      name = product.name,
      originPrice = product.price,
      discountRate = product.discountRate,
      amount = product.stock,
      image = product.getThumbnailImage(),
      price = product.getDiscountedPrice(),
      orderWait = product.getWaitOrdersCount(),
      salse = product.getSalse();

    return new ProductAdminResponse({
      id,
      name,
      price,
      originPrice,
      discountRate,
      isWish: false,
      amount,
      image,
      orderWait,
      salse,
    });
  }
}
