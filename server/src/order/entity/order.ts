import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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
