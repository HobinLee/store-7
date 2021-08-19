import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("qna")
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id", type: "int" })
  userID: number;

  @Column({ name: "product_id", type: "int" })
  productID: number;

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

  @CreateDateColumn({
    type: "timestamp",
    name: "answered_at",
    default: () => "CURRENT_TIMESTAMP(6)",
    nullable: true,
  })
  answeredAt: Date;
}
