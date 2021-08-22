import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { CreateOrderRequest } from "../dto/order-request";
import { Order } from "../entity/order";

@Injectable()
export class Orders {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async findOrders() {
    return await this.orderRepository.find({ relations: ["user", "product"] });
  }

  async findOrdersByUserId(userId: number) {
    return await this.orderRepository.find({
      relations: ["user"],
      where: { user: { id: userId } },
    });
  }

  async findCurrentOrdersByUserId(userId: number) {
    return await this.orderRepository.find({
      relations: ["user"],
      where: { user: { id: userId }, status: "배송중" },
    });
  }

  async findOrderById(id: number) {
    return await this.orderRepository.find({ where: { id } });
  }

  async findOrdersByUserIdByDateRange(
    userId: number,
    range: {
      from: Date;
      to: Date;
    }
  ) {
    return await this.orderRepository.find({
      relations: ["user"],
      where: { user: { id: userId }, createdAt: Between(range.from, range.to) },
    });
  }
  // async findOrderByOrderNum(orderNum: number) {
  //   return await this.orderRepository.find({ where: { orderNum } });
  // }

  async createOrder(order: CreateOrderRequest) {
    this.orderRepository.insert(order);
  }

  async updateOrderStatus(id: number, status: string) {
    return await this.orderRepository.update({ id }, { status });
  }
}
