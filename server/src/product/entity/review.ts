import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Order } from "@/order/entity/order";

@Entity("review")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.reviews)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({ type: "char", length: 32, nullable: true })
  image: string;

  @Column({ type: "double" })
  rate: number;

  @Column({ length: 100 })
  content: string;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  getAverageRate(reviews) {
    return Number(
      (
        reviews.reduce((result, review) => {
          return result + review.rate;
        }, 0) / reviews.length
      ).toFixed(1)
    );
  }
}
