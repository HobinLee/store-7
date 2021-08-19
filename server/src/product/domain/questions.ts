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

  createQuestion(question: QuestionPostRequest) {
    this.questionRepository.insert(question);
  }

  editQuestion(request: QuestionPatchRequest) {
    this.questionRepository.update({ id: request.id }, { ...request.content });
  }

  deleteQuestion(id: number) {
    this.questionRepository.delete({ id });
  }
}
