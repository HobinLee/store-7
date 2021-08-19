import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("qna")
export class QuA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "int" })
  product_id: number;

  @Column({ type: "char", length: 5 })
  type: string;

  @Column({ length: 32 })
  title: string;

  @Column({ length: 100 })
  question: string;

  @Column({ type: "char", length: 32 })
  image: string;

  @Column({ length: 100 })
  answer: string;

  @Column({ name: "answered_at" })
  answeredAt: Date;

  @Column({ type: "tinyint", name: "is_secret" })
  isSecret: number;
}
