import { Injectable } from "@nestjs/common";
import { S3Repository } from "@/product/infrastructure/s3-repository";
import { ETException } from "@/config/filter/exception-handler";

@Injectable()
export class ImageService {
  constructor(private readonly s3Repository: S3Repository) {}

  async getImage(imageName) {
    const s3Result = await this.s3Repository.getObject(imageName);
    if (s3Result) {
      return s3Result.Body;
    }
    throw new ETException(404, "Image not found");
  }
}
