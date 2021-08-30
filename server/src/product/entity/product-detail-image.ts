import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product";

@Entity("product_detail_image")
export class ProductDetailImage {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: "char", length: 32 })
  name: string;

  @ManyToOne(() => Product, (product) => product.detailImages, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
