import { Body, Controller, Delete, Param, Post, Patch } from "@nestjs/common";
import { QuestionService } from "../application/question-service";
import {
  QuestionPatchRequest,
  QuestionPostRequest,
} from "../dto/question-request";

@Controller("/questions")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async postQuestion(
    @Body() body: { userId: number; data: QuestionPostRequest }
  ) {
    console.log(body);
    return await this.questionService.createQuestion({
      ...body.data,
      product: {
        id: body.data.productId,
      },
      user: {
        id: body.userId || 7,
      },
    });
  }

  @Patch("/:id")
  async patchQuestion(
    @Param("id") id: number,
    @Body() request: QuestionPatchRequest
  ) {
    return await this.questionService.updateQuestion(id, request);
  }

  @Delete("/:id")
  async deleteQuestion(@Param("id") id: number) {
    await this.questionService.deleteQuestion(id);
  }
}
