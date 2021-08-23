import { Product } from "@/product/entity/product";
import { Review } from "@/product/entity/review";
import { User } from "@/user/entity/user";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.orders)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToOne(() => Review, (review) => review.order)
  @JoinColumn({ name: "review_id" })
  review: Review;

  @Column({ length: 20 })
  addressee: string;

  @Column({ type: "int", name: "product_option_id", nullable: true })
  productOptionId: number;

  @Column({ type: "int" })
  amount: number;

  @Column({ length: 64, name: "destination" })
  destination: string;

  @Column({ type: "char", length: 5 })
  status: string;

  @Column({ length: 20, nullable: true })
  request: string;

  @Column({ type: "int" })
  price: number;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;
}
