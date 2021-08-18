import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: "int", length: 11, name: "user_id" })
  userId: number;

  @Column({ type: "tinyint", length: 32, name: "is_default" })
  isDetault: boolean;
}
