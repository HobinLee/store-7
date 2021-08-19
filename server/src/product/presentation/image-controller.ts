import { Controller, Get, Header, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { ImageService } from "@/product/application/image-service";
import { createReadStream } from "fs";

@Controller("/images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get("/:name")
  async getImage(@Param("name") imageName: string, @Res() res: Response) {
    const image = await this.imageService.getImage(imageName);
    res.set("Content-Type", "image/*").send(image);
  }
}
