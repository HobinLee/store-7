import properties from "@/config/properties/properties";
import { S3 } from "aws-sdk";
import { Injectable } from "@nestjs/common";

@Injectable()
export class S3Repository {
  s3: S3;
  bucket: string;
  constructor() {
    this.s3 = new S3({
      accessKeyId: properties.s3.accessKey,
      secretAccessKey: properties.s3.secretKey,
      region: properties.s3.region,
    });
    this.bucket = properties.s3.bucket;
  }

  getObject(fileName) {
    return this.s3
      .getObject({
        Bucket: this.bucket,
        Key: fileName,
      })
      .promise();
  }

  putObject(fileName, data) {
    return this.s3
      .putObject({
        Bucket: this.bucket,
        Key: fileName,
        Body: data.buffer,
      })
      .promise();
  }

  deleteObject(fileName) {
    return this.s3
      .deleteObject({
        Bucket: this.bucket,
        Key: fileName,
      })
      .promise();
  }
}
