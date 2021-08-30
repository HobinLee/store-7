import { Injectable } from "@nestjs/common";
import { Questions } from "@/product/domain/questions";
import {
  CreateQuestionPostRequest,
  QuestionPatchRequest,
} from "../dto/question-request";
import messages from "@/config/messages";
import { ETException } from "@/config/filter/exception-handler";

@Injectable()
export class QuestionService {
  constructor(private readonly questions: Questions) {}

  async createQuestion(question: CreateQuestionPostRequest): Promise<string> {
    try {
      await this.questions.createQuestion(question);
      return messages.success.SUCCESS_TO_CREATE_QUESTION;
    } catch (e) {
      throw new ETException(400, messages.failed.FAILED_TO_CREATE_QUESTION);
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
      throw new ETException(400, messages.failed.FAILED_TO_UPDATE_QUESTION);
    }
  }
  async deleteQuestion(id: number): Promise<string> {
    try {
      await this.questions.deleteQuestion(id);
      return messages.success.SUCCESS_TO_DELETE_QUESTION;
    } catch (e) {
      throw new ETException(404, messages.failed.FAILED_TO_DELETE_QUESTION);
    }
  }
}
