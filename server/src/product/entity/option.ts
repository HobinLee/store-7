import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./product";

@Entity("product_option")
export class ProductOption {
  @PrimaryColumn({ type: "char", length: 32 })
  id: string;

  @ManyToOne(() => Product, (product) => product.options)
  product: Product;

  @Column({ length: 32 })
  value: string;

  @Column({ default: 0 })
  stock: number;
}
