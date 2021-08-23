import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Question } from "@/product/entity/question";
import {
  CreateQuestionPostRequest,
  QuestionPatchRequest,
} from "@/product/dto/question-request";

@Injectable()
export class Questions {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>
  ) {}

  async findQuestion(id: number): Promise<Question> {
    return await this.questionRepository.findOne({ where: { id } });
  }

  async findQuestionsByProductId(productId: number): Promise<Question[]> {
    return await this.questionRepository.find({ where: { productId } });
  }

  async findQuestionsByUserId(userId: number): Promise<Question[]> {
    return await this.questionRepository.find({
      relations: ["user", "product"],
      where: { user: { id: userId } },
    });
  }

  async createQuestion(question: CreateQuestionPostRequest) {
    await this.questionRepository.insert({
      product: { id: question.product.id },
      ...question,
    });
  }

  async updateQuestion(id: number, question: QuestionPatchRequest) {
    await this.questionRepository.update({ id }, { ...question });
  }

  async deleteQuestion(id: number) {
    await this.questionRepository.delete({ id });
  }
}
