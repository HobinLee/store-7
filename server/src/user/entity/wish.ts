import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "@/product/entity/product";
import { User } from "./user";

@Entity()
export class Wish {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  product_id: number;

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Product, (product) => product.wishes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
