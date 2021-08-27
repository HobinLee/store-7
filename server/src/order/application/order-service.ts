import { Injectable } from "@nestjs/common";
import { Orders } from "../domain/orders";
import { OrderRequest } from "../dto/order-request";
import { OrderResponse } from "../dto/order-response";
import { OrderStatus } from "@/order/entity/order";

@Injectable()
export class OrderService {
  constructor(private readonly orders: Orders) {}

  async findOrderById(id: number): Promise<OrderResponse> {
    try {
      const orders = await this.orders.findOrderById(id);
      return OrderResponse.of(orders);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async findOrderByOrderNum(orderNum: number): Promise<OrderResponse[]> {
    try {
      const orders = await this.orders.findOrderByOrderNum(orderNum);
      return orders.map(OrderResponse.of);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async findOrders(): Promise<OrderResponse[]> {
    try {
      const orders = await this.orders.findOrders();
      return orders.map(OrderResponse.of);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async findOrdersByUserId(userId: number): Promise<OrderResponse[]> {
    try {
      const orders = await this.orders.findOrdersByUserId(userId);
      return orders.map(OrderResponse.of);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async createOrder(userId: number, order: OrderRequest): Promise<number> {
    try {
      // 비회원은 id 7
      const orderId = await this.orders.createOrder({
        ...order,
        product: { id: order.productId },
        user: {
          id: userId ?? 7,
        },
        status: OrderStatus.Prepare,
      });
      return orderId;
    } catch (e) {
      throw Error(e.message);
    }
  }

  async updateOrderNum(id: number, orderNum: string): Promise<string> {
    try {
      await this.orders.updateOrderNum(id, orderNum);
      return orderNum;
    } catch (e) {
      throw Error(e.message);
    }
  }

  updateOrderStatus(id: number, status: OrderStatus): string {
    try {
      this.orders.updateOrderStatus(id, status);
      return "Updated!";
    } catch (e) {
      throw Error(e.message);
    }
  }
}
