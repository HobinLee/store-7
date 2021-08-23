import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product";

@Entity("product_detail_image")
export class ProductDetailImage {
  @PrimaryColumn({ type: "char", length: 32 })
  id: string;

  @ManyToOne(() => Product, (product) => product.detailImages, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
