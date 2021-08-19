import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "@/user/entity/user";

@Entity("review")
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "order_id", type: "int" })
  orderId: number;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: "author_id" })
  author: User;

  @Column({ type: "char", length: 32, nullable: true })
  image: string;

  @Column({ type: "double" })
  rate: number;

  @Column({ length: 100 })
  content: string;

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
