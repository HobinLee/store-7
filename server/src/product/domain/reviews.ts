import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "@/product/entity/review";
import {
  ReviewPatchReqeust,
  ReviewPostReqeust,
} from "@/product/dto/review-request";
import { S3Repository } from "@/product/infrastructure/s3-repository";

const RANDOM_FILENAME_LENGTH = 32;

@Injectable()
export class Reviews {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly s3Repository: S3Repository
  ) {}

  async findReviewsByProductId(
    productId: number,
    sortBy: "popularity" | "latest"
  ) {
    const result = await this.reviewRepository.find({
      relations: ["product", "order", "order.user"],
      where: {
        product: {
          id: productId,
        },
      },
      order: sortBy === "latest" ? { id: "DESC" } : { rate: "DESC" },
    });
    return result;
  }

  //TODO : 해결하쇼 유저 아이디로 order찾기
  async findReviewsByUserId(userId) {
    return await this.reviewRepository.find({
      relations: ["order", "order.user"],
      where: { order: { user: { id: userId } } },
    });
  }

  // async findLatelyReview(count: number) {
  //   return this.reviewRepository.find({
  //     relations: [],
  //     where: {},
  //   });
  // }

  async createReview(review: ReviewPostReqeust) {
    await this.reviewRepository.insert(review);
  }

  async updateReview(id: number, review: ReviewPatchReqeust) {
    await this.reviewRepository.update({ id }, review);
  }

  async deleteReview(id: number) {
    this.reviewRepository.delete({ id });
  }

  async addImage(image) {
    const fileName = generateRandomFileName();
    await this.s3Repository.putObject(fileName, image[0]);
    return fileName;
  }
}

const generateRandomFileName = () => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < RANDOM_FILENAME_LENGTH; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
