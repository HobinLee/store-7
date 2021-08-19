import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity("product_option")
export class ProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.options)
  product: Product;

  @Column({ length: 32 })
  value: string;

  @Column({ default: 0 })
  stock: number;
}
