import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProductImage } from "./product-image";
import { ProductOption } from "./option";
import { ProductDetailImage } from "./product-detail-image";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column()
  price: number;

  @Column({ name: "delivery_cost" })
  deliveryCost: number;

  @Column({ name: "discount_rate" })
  discountRate: number;

  @Column()
  stock: number;

  @Column()
  category: string;

  @Column({ name: "sub_category" })
  subCategory: string;

  @Column({ length: 16, nullable: true })
  option: string;

  @OneToMany(() => ProductOption, (option) => option.product)
  options: ProductOption[];

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @OneToMany(() => ProductImage, (detailImage) => detailImage.product)
  detailImages: ProductDetailImage[];

  getThumbnailImage() {
    if (!this.images) return "";
    return this.images[0].id;
  }
}
