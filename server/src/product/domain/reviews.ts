import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
import { Review } from "@/product/entity/review";
import {
  RecentReviewsQuery,
  ReviewPatchReqeust,
  ReviewPostReqeust,
} from "@/product/dto/review-request";
import { S3Repository } from "@/product/infrastructure/s3-repository";

const RANDOM_FILENAME_LENGTH = 32;
const REVIEW_PER_MAINPAGE = 3;

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

  async findReviewsByUserId(userId) {
    return await this.reviewRepository.find({
      relations: ["order", "order.user", "product"],
      where: { order: { user: { id: userId } } },
    });
  }

  async findRecentReviews(query: RecentReviewsQuery) {
    return this.reviewRepository.find({
      relations: ["order", "order.user", "product"],
      order: { createdAt: "DESC" },
      where: { image: Not(IsNull()), rate: 5 },
      take: query.size ?? REVIEW_PER_MAINPAGE,
    });
  }

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
