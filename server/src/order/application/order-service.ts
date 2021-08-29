import { Injectable } from "@nestjs/common";
import { Orders } from "../domain/orders";
import { OrderRequest } from "../dto/order-request";
import { OrderResponse } from "../dto/order-response";
import { OrderStatus } from "@/order/entity/order";
import messages from "@/config/messages";

@Injectable()
export class OrderService {
  constructor(private readonly orders: Orders) {}

  async findOrderById(id: number): Promise<OrderResponse> {
    try {
      const orders = await this.orders.findOrderById(id);
      return OrderResponse.of(orders);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_FIND_ORDER_BY_ID);
    }
  }

  async findOrderByOrderNum(orderNum: number): Promise<OrderResponse[]> {
    try {
      const orders = await this.orders.findOrderByOrderNum(orderNum);
      return orders.map(OrderResponse.of);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_FIND_ORDER_BY_ORDER_NUM);
    }
  }

  async findOrders(): Promise<OrderResponse[]> {
    try {
      const orders = await this.orders.findOrders();
      return orders.map(OrderResponse.of);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_FIND_ORDERS);
    }
  }

  async findOrdersByUserId(userId: number): Promise<OrderResponse[]> {
    try {
      const orders = await this.orders.findOrdersByUserId(userId);
      return orders.map(OrderResponse.of);
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_FIND_ORDERS_BY_USER_ID);
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
      throw new Error(messages.failed.FAILED_TO_CREATE_ORDER);
    }
  }

  async updateOrderNum(id: number, orderNum: string): Promise<string> {
    try {
      await this.orders.updateOrderNum(id, orderNum);
      return orderNum;
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_UPDATE_ORDER_NUM);
    }
  }

  updateOrderStatus(id: number, status: OrderStatus): string {
    try {
      this.orders.updateOrderStatus(id, status);
      return messages.success.SUCCESS_TO_UPDATE_ORDER_STATUS;
    } catch (e) {
      throw new Error(messages.failed.FAILED_TO_UPDATE_ORDER_STATUS);
    }
  }
}
