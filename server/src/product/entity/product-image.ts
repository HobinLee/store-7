import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product";

@Entity("product_image")
export class ProductImage {
  @PrimaryColumn({ type: "char", length: 32 })
  id: string;

  @ManyToOne(() => Product, (product) => product.images, {
    nullable: false,
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
