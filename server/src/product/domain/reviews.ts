import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Review } from "../entity/review";
import { ReviewPostReqeust, ReviewPatchRequest } from "../dto/review-request";

@Injectable()
export class Reviews {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) {}

  async findReviewsByProjectId(productId: number) {
    return this.reviewRepository.find({
      relations: [],
      where: {
        productId,
      },
    });
  }

  async findReviewByUserId() {
    return this.reviewRepository.find({
      relations: [],
      where: {},
    });
  }

  async findLatelyReview(count: number) {
    return this.reviewRepository.find({
      relations: [],
      where: {},
    });
  }

  async createReview(review: ReviewPostReqeust) {
    await this.reviewRepository.insert(review);
  }

  async editReview(request: ReviewPatchRequest) {
    await this.reviewRepository.update(
      { id: request.id },
      { ...request.content }
    );
  }

  async deleteReview(id: number) {
    this.reviewRepository.delete({ id });
  }
}
