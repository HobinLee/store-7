import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "user_id" })
  userId: number;

  @Column({ type: "int", name: "product_id" })
  productId: number;

  @Column({ type: "int", name: "product_option_id" })
  productOptionId: number;

  @Column({ type: "int" })
  amount: number;
}
