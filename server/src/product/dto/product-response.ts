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
  isWish: boolean;

  static of(product: Product, userId: number): ProductResponse {
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
      details = product.getDetailImagesAsString(),
      isWish =
        product.wishes?.filter((wish) => wish.user?.id === userId).length ===
          1 || false;

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
      isWish,
    } as ProductResponse;
  }
}
