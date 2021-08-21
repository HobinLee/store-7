import { Review } from "@/product/entity/review";
import { User } from "@/user/entity/user";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "product_id" })
  productId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Review, (review) => review.order)
  @JoinColumn({ name: "review_id" })
  reviews: Review[];

  @Column({ type: "int", name: "review_id", nullable: true })
  reviewId: number;

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
