import { Injectable } from "@nestjs/common";
import { Orders } from "../domain/orders";
import { OrderRequest, OrderResponse } from "../dto/order-request";

@Injectable()
export class OrderService {
  constructor(private readonly orders: Orders) {}

  async findOrderById(id: number): Promise<OrderResponse[]> {
    try {
      const data = await this.orders.findOrderById(id);
      return data;
    } catch (e) {
      return e;
    }
  }

  async findOrderByOrderNum(orderNum: number): Promise<OrderResponse[]> {
    try {
      const data = await this.orders.findOrderByOrderNum(orderNum);
      return data;
    } catch (e) {
      return e;
    }
  }

  async findOrders(): Promise<OrderResponse[]> {
    try {
      const data = await this.orders.findOrders();
      return data;
    } catch (e) {
      return e;
    }
  }

  async findOrdersByUserId(userId: number): Promise<OrderResponse[]> {
    try {
      const data = await this.orders.findOrdersByUserId(userId);
      return data;
    } catch (e) {
      return e;
    }
  }

  createOrder(order: OrderRequest): string {
    try {
      this.orders.createOrder(order);
    } catch (e) {
      return e;
    }
    return "Created!";
  }

  updateOrderStatus(id: number, status: string): string {
    try {
      this.orders.updateOrderStatus(id, status);
    } catch (e) {
      return e;
    }
    return "Updated!";
  }
}
