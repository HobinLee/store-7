import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
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

  getDiscountedPrice() {
    return this.discountRate === 0
      ? this.price
      : this.price * ((100 - this.discountRate) / 100);
  }

  getThumbnailImage() {
    if (this.images.length == 0) return "";
    return this.images[0].id;
  }

  getImagesAsString() {
    return this.images.map((image) => image.id);
  }

  getDetailImagesAdString() {
    return this.detailImages.map((image) => image.id);
  }
}
