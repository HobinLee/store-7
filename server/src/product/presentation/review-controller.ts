import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Patch,
  Delete,
  Param,
  Get,
  Query,
} from "@nestjs/common";
import {
  CreateReviewPostRequest,
  UpdateReviewPatchRequest,
  RecentReviewsQuery,
} from "../dto/review-request";
import { ReviewService } from "../application/review-service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("/reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseInterceptors(FileFieldsInterceptor([{ name: "file" }]))
  @Post()
  async createReview(
    @UploadedFiles() files,
    @Body() body: CreateReviewPostRequest
  ) {
    return await this.reviewService.createReview(body, files.file);
  }

  @UseInterceptors(FileFieldsInterceptor([{ name: "file" }]))
  @Patch("/:id")
  async updateReview(
    @Param("id") id: number,
    @UploadedFiles() files,
    @Body() review: UpdateReviewPatchRequest
  ) {
    return await this.reviewService.updateReview(id, review, files.file);
  }

  @Delete("/:id")
  async deleteReview(@Param("id") id: number) {
    return await this.reviewService.deletereview(id);
  }

  @Get("/recent")
  async getRecentReviews(@Query() query: RecentReviewsQuery) {
    return await this.reviewService.findRecentReviews(query);
  }
}
