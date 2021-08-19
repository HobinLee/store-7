import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  name: string;

  @Column({ length: 16 })
  postCode: string;

  @Column({ length: 36 })
  address: string;

  @Column({ length: 11, name: "detail_address" })
  detailAddress: string;

  @Column({ type: "int", name: "user_id" })
  userId: number;

  @Column({ type: "tinyint", length: 1, name: "is_default" })
  isDetault: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;
}
