import { Injectable } from "@nestjs/common";
import { Questions } from "@/product/domain/questions";
import { QuestionResponse } from "@/product/dto/question-response";
import {
  CreateQuestionPostRequest,
  QuestionPatchRequest,
} from "../dto/question-request";
import messages from "@/config/messages";

@Injectable()
export class QuestionService {
  constructor(private readonly questions: Questions) {}

  async getQuestionsByProductId(
    productId: number
  ): Promise<QuestionResponse[]> {
    try {
      const questions = await this.questions.findQuestionsByProductId(
        productId
      );
      return questions.map(QuestionResponse.of);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_FIND_QUESTIONS_BY_PRODUCT_ID);
    }
  }
  async createQuestion(question: CreateQuestionPostRequest): Promise<string> {
    try {
      await this.questions.createQuestion(question);
      return messages.success.SUCCESS_TO_CREATE_QUESTION;
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_CREATE_QUESTION);
    }
  }
  async updateQuestion(
    id: number,
    question: QuestionPatchRequest
  ): Promise<string> {
    try {
      await this.questions.updateQuestion(id, question);
      return messages.success.SUCCESS_TO_UPDATE_QUESTION;
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_UPDATE_QUESTION);
    }
  }
  async deleteQuestion(id: number): Promise<string> {
    try {
      await this.questions.deleteQuestion(id);
      return messages.success.SUCCESS_TO_DELETE_QUESTION;
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_DELETE_QUESTION);
    }
  }
}
