import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product";

@Entity("product_image")
export class ProductImage {
  @PrimaryColumn({ type: "char", length: 32 })
  id: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
