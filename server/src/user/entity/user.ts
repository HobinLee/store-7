import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  password: string;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 40, unique: true })
  email: string;

  @Column({ type: "char", length: 11 })
  phoneNumber: string;

  @Column({ type: "char", length: 32 })
  profile: string;
}
