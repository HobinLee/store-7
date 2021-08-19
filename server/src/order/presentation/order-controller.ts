import { Body, Controller, Get, Patch, Post, Param } from "@nestjs/common";
import { OrderService } from "../application/order-service";
import { OrderRequest, OrderResponse } from "../dto/order-request";

@Controller("/orders")
export class DestinationController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createDestination(@Body() order: OrderRequest): string {
    return this.orderService.createOrder(order);
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

  @Get("/:orderNum")
  async findOrderByOrderNum(
    @Param("orderNum") orderNum: number
  ): Promise<OrderResponse[]> {
    return await this.orderService.findOrderByOrderNum(orderNum);
  }

  @Get("/:id")
  async findOrderById(@Param("id") id: number): Promise<OrderResponse[]> {
    return await this.orderService.findOrderById(id);
  }

  @Patch("/:id")
  updateDestination(@Param("id") id: number, @Body() status: string): string {
    return this.orderService.updateOrderStatus(id, status);
  }
}
