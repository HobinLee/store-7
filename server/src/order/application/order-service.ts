import { Injectable } from "@nestjs/common";
import { Orders } from "../domain/orders";
import { OrderRequest } from "../dto/order-request";
import { OrderResponse } from "../dto/order-response";
import { OrderStatus } from "@/order/entity/order";

@Injectable()
export class OrderService {
  constructor(private readonly orders: Orders) {}

  async findOrderById(id: number): Promise<OrderResponse> {
    const orders = await this.orders.findOrderById(id);
    return OrderResponse.of(orders);
  }

  // async findOrderByOrderNum(orderNum: number): Promise<OrderResponse[]> {
  //   try {
  //     const data = await this.orders.findOrderByOrderNum(orderNum);
  //     return data;
  //   } catch (e) {
  //     return e;
  //   }
  // }

  async findOrders(): Promise<OrderResponse[]> {
    const orders = await this.orders.findOrders();
    return orders.map(OrderResponse.of);
  }

  async findOrdersByUserId(userId: number): Promise<OrderResponse[]> {
    const orders = await this.orders.findOrdersByUserId(userId);
    return orders.map(OrderResponse.of);
  }

  createOrder(userId: number, order: OrderRequest): string {
    try {
      // 비회원은 id 7
      this.orders.createOrder({
        ...order,
        product: { id: order.productId },
        user: {
          id: userId ?? 7,
        },
        status: OrderStatus.Prepare,
      });
    } catch (e) {
      throw Error(e.message);
    }
    return "Created!";
  }

  updateOrderStatus(id: number, status: OrderStatus): string {
    try {
      this.orders.updateOrderStatus(id, status);
    } catch (e) {
      throw Error(e.message);
    }
    return "Updated!";
  }
}
