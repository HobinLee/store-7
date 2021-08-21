import { User } from "@/user/entity/user";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./product";

@Entity("qna")
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.questions)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Product, (product) => product.questions)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ type: "char", length: 5 })
  type: string;

  @Column({ length: 32 })
  title: string;

  @Column({ length: 100 })
  question: string;

  @Column({ type: "char", length: 32, nullable: true })
  image: string;

  @Column({ length: 100, nullable: true })
  answer: string;

  @Column({ type: "tinyint", name: "is_secret" })
  isSecret: boolean;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @Column({
    type: "timestamp",
    name: "answered_at",
    nullable: true,
  })
  answeredAt: Date;
}
