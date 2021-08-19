import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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
