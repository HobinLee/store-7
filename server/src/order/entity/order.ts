import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", name: "product_id" })
  productId: number;

  @Column({ type: "int", name: "user_id" })
  userId: number;

  @Column({ length: 20 })
  orderNum: string;

  @Column({ length: 20 })
  addressee: string;

  @Column({ type: "int" })
  productOptionId: number;

  @Column({ type: "int" })
  amount: number;

  @Column({ length: 64, name: "destination" })
  destination: string;

  @Column({ type: "char", length: 5 })
  status: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;
}
