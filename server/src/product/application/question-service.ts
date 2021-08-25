import { Injectable } from "@nestjs/common";
import { Questions } from "@/product/domain/questions";
import { QuestionResponse } from "@/product/dto/question-response";
import {
  CreateQuestionPostRequest,
  QuestionPatchRequest,
} from "../dto/question-request";

@Injectable()
export class QuestionService {
  constructor(private readonly questions: Questions) {}

  async getQuestionsByProductId(productId: number) {
    const questions = await this.questions.findQuestionsByProductId(productId);
    return questions.map(QuestionResponse.of);
  }
  async createQuestion(question: CreateQuestionPostRequest) {
    await this.questions.createQuestion(question);
  }
  async updateQuestion(id: number, question: QuestionPatchRequest) {
    await this.questions.updateQuestion(id, question);
  }
  async deleteQuestion(id: number) {
    await this.questions.deleteQuestion(id);
  }
}
