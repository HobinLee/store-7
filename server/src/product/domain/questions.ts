import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "@/product/entity/question";
import {
  QuestionRequest,
  QuestionDelete,
} from "@/product/dto/question-request";

@Injectable()
export class Questions {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) {}

  async findQuestionsByProductID(productID): Promise<Question[]> {
    return await this.questionRepository.find({ where: { productID } });
  }

  async findQuestionsByUserID(userID): Promise<Question[]> {
    return await this.questionRepository.find({ where: { userID } });
  }

  createQuestion(question: QuestionRequest) {
    this.questionRepository.insert(question);
  }

  editQuestion(id, question: QuestionRequest) {
    this.questionRepository.update({ id }, question);
  }

  deleteQuestion(question: QuestionDelete) {
    this.questionRepository.delete(question);
  }
}
