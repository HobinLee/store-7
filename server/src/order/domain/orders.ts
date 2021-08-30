import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { CreateOrderRequest } from "../dto/order-request";
import { Order } from "../entity/order";
import { OrderStatus } from "@/order/entity/order";

@Injectable()
export class Orders {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async findOrders() {
    return await this.orderRepository.find({
      relations: ["user", "product", "product.images", "product.options"],
    });
  }

  async findOrdersByUserId(userId: number) {
    return await this.orderRepository.find({
      relations: ["user", "product", "product.images", "review"],
      where: { user: { id: userId } },
    });
  }

  async findOrderByOrderNum(orderNum: number) {
    return await this.orderRepository.find({
      relations: ["user", "product", "product.images", "product.options"],
      where: { orderNum },
    });
  }

  async findOrderById(id: number) {
    return await this.orderRepository.findOne({ where: { id } });
  }

  async createOrder(order: CreateOrderRequest) {
    const result = await this.orderRepository.insert(order);
    return (await this.findOrderById(result.raw.insertId)).id;
  }

  async updateOrderStatus(id: number, status: OrderStatus) {
    return await this.orderRepository.update({ id }, { status });
  }

  async updateOrderNum(id: number, orderNum: string) {
    await this.orderRepository.update({ id }, { orderNum });
  }

  async deleteOrder(id: number) {
    await this.orderRepository.delete({ id });
  }
}
