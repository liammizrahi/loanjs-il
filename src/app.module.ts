import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanModule } from './loan/loan.module';
import { UserController } from './user/user.controller';
import { S3Service } from './s3/s3.service';

@Module({
  imports: [LoanModule],
  controllers: [AppController, UserController],
  providers: [AppService, S3Service],
})
export class AppModule {}
