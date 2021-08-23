import { Body, Controller, Delete, Param, Post, Patch } from "@nestjs/common";
import { QuestionService } from "../application/question-service";
import {
  QuestionPatchRequest,
  CreateQuestionPostRequest,
} from "../dto/question-request";

@Controller("/questions")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async postQuestion(@Body() question: CreateQuestionPostRequest) {
    return await this.questionService.createQuestion(question);
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
