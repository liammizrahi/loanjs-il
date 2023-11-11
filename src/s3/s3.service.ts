import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.DO_SPACES_ACCESS_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET_KEY,
      endpoint: process.env.DO_SPACES_ENDPOINT,
      s3ForcePathStyle: true,
    });
  }

  async uploadFile(fileKey: string, fileBody: Buffer) {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.DO_SPACES_BUCKET_NAME,
      Key: fileKey,
      Body: fileBody,
    };

    return this.s3.upload(params).promise();
  }
}
