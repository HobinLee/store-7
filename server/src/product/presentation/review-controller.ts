import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { CreateReviewPostRequest } from "../dto/review-request";
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
}
