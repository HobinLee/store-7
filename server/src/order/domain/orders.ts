import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderRequest } from "../dto/order-request";
import { Order } from "../entity/order";

@Injectable()
export class Orders {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async findOrders() {
    return await this.orderRepository.find();
  }

  async findOrdersByUserId(userId: number) {
    return await this.orderRepository.find({ where: { userId } });
  }

  async findOrderById(id: number) {
    return await this.orderRepository.find({ where: { id } });
  }

  async findOrderByOrderNum(orderNum: number) {
    return await this.orderRepository.find({ where: { orderNum } });
  }

  createOrder(order: OrderRequest) {
    this.orderRepository.insert(order);
  }

  async updateOrderStatus(id: number, status: string) {
    return await this.orderRepository.update({ id }, { status });
  }
}
