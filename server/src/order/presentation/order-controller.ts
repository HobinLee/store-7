import { Body, Controller, Get, Patch, Post, Param } from "@nestjs/common";
import { OrderService } from "../application/order-service";
import { OrderRequest } from "../dto/order-request";
import { OrderResponse } from "../dto/order-response";

@Controller("/orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createDestination(
    @Param("userId") userId: number,
    @Body() order: OrderRequest
  ): string {
    return this.orderService.createOrder(1, order);
  }

  //   @Get()
  //   async findOrdersByUserId(
  //     @Body()
  //     userId: number
  //   ): Promise<OrderResponse[]> {
  //     return await this.orderService.findOrdersByUserId(userId);
  //   }

  @Get()
  async findOrders(): Promise<OrderResponse[]> {
    return await this.orderService.findOrders();
  }

  // @Get("/:orderNum")
  // async findOrderByOrderId(
  //   @Param("orderNum") orderNum: number
  // ): Promise<OrderResponse[]> {
  //   return await this.orderService.findOrderByOrderNum(orderNum);
  // }

  @Get("/:id")
  async findOrderById(@Param("id") id: number): Promise<OrderResponse[]> {
    return await this.orderService.findOrderById(id);
  }

  @Patch("/:id")
  updateOrderStatus(@Param("id") id: number, @Body() status: string): string {
    return this.orderService.updateOrderStatus(id, status);
  }
}
