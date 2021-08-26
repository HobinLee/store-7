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
  async createQuestion(
    @Body() body: { userId: number; data: QuestionPostRequest }
  ) {
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
    // 모든 body에 userId가 필요한게 아닌
    const newQuestion = {
      type: request.type,
      question: request.question,
      isSecret: request.isSecret,
    };
    return await this.questionService.updateQuestion(id, newQuestion);
  }

  @Delete("/:id")
  async deleteQuestion(@Param("id") id: number) {
    await this.questionService.deleteQuestion(id);
  }
}
