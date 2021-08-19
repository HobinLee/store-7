import { Product } from "../entity/product";

export class ProductResponse {
  id: number;
  name: string;
  price: number;
  deliveryCost: number;
  discountRate: number;
  stock: number;
  category: string;
  subCategory: string;
  option: string;
  images: string[];
  details: string[];

  static of(product: Product): ProductResponse {
    const id = product.id,
      name = product.name,
      price = product.getDiscountedPrice(),
      deliveryCost = product.deliveryCost,
      discountRate = product.discountRate,
      category = product.category,
      subCategory = product.subCategory,
      option = product.option,
      stock = product.stock,
      images = product.getImagesAsString(),
      details = product.getDetailImagesAsString();

    return {
      id,
      name,
      price,
      deliveryCost,
      discountRate,
      category,
      subCategory,
      option,
      stock,
      images,
      details,
    } as ProductResponse;
  }
}
