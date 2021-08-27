import { Body, Controller, Get, Patch, Post, Param } from "@nestjs/common";
import { OrderService } from "../application/order-service";
import { OrderChangeRequest } from "../dto/order-change-request";
import { OrderRequest } from "../dto/order-request";
import { OrderResponse } from "../dto/order-response";

@Controller("/orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() body: { userId: number; data: OrderRequest }
  ): Promise<number> {
    return await this.orderService.createOrder(body.userId, body.data);
  }

  @Post("/:id")
  async updateOrderNum(
    @Param("id") id: number,
    @Body("orderNum") orderNum: string
  ) {
    return await this.orderService.updateOrderNum(id, orderNum);
  }

  @Get()
  async findOrders(): Promise<OrderResponse[]> {
    return await this.orderService.findOrders();
  }

  @Get("/:orderNum")
  async findOrderByOrderId(
    @Param("orderNum") orderNum: number
  ): Promise<OrderResponse[]> {
    return await this.orderService.findOrderByOrderNum(orderNum);
  }

  @Get("/:id")
  async findOrderById(@Param("id") id: number): Promise<OrderResponse> {
    return await this.orderService.findOrderById(id);
  }

  @Patch("/:id")
  updateOrderStatus(
    @Param("id") id: number,
    @Body() changeRequest: OrderChangeRequest
  ): string {
    return this.orderService.updateOrderStatus(id, changeRequest.status);
  }
}
