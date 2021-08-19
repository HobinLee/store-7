import { Injectable } from "@nestjs/common";
import { S3Repository } from "@/product/infrastructure/s3-repository";

@Injectable()
export class ImageService {
  constructor(private readonly s3Repository: S3Repository) {}

  async getImage(imageName) {
    const s3Result = await this.s3Repository.getObject(imageName);
    return s3Result.Body;
  }
}
