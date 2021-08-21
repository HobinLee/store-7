import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "@/product/entity/product";
import { User } from "./user";

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Product, (product) => product.wishes)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
