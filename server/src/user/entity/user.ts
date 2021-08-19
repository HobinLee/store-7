import { Cart } from "@/cart/entity/cart";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  password: string;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 40, unique: true })
  email: string;

  @Column({ type: "char", length: 11, name: "phone_number" })
  phoneNumber: string;

  @Column({ type: "char", length: 32, nullable: true })
  profile: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
