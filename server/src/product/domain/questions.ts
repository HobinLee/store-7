import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "@/product/entity/question";
import {
  QuestionPostRequest,
  QuestionPatchRequest,
} from "@/product/dto/question-request";

@Injectable()
export class Questions {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) {}

  async findQuestion(id): Promise<Question> {
    return await this.questionRepository.findOne({ where: { id } });
  }

  async findQuestionsByProductId(productId): Promise<Question[]> {
    return await this.questionRepository.find({ where: { productId } });
  }

  async findQuestionsByUserId(userId): Promise<Question[]> {
    return await this.questionRepository.find({ where: { userId } });
  }

  async createQuestion(question: QuestionPostRequest) {
    await this.questionRepository.insert(question);
  }

  async editQuestion(request: QuestionPatchRequest) {
    await this.questionRepository.update(
      { id: request.id },
      { ...request.content }
    );
  }

  async deleteQuestion(id: number) {
    await this.questionRepository.delete({ id });
  }
}
