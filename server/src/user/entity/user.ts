import { Cart } from "@/cart/entity/cart";
import { Destination } from "@/destination/entity/destination";
import { Order } from "@/order/entity/order";
import { Question } from "@/product/entity/question";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Wish } from "./wish";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  password: string;

  @Column({ length: 10, default: "반가운분" })
  grade: string;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 40, unique: true })
  email: string;

  @Column({ type: "char", length: 11, name: "phone_number", nullable: true })
  phoneNumber: string;

  @Column({ type: "char", length: 32, nullable: true })
  profile: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Destination, (destination) => destination.user)
  destinations: Destination[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Wish, (wish) => wish.user)
  wishes: Wish[];
}
