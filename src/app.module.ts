import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanService } from './loan/loan.service';
import { LoanModule } from './loan/loan.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [LoanModule],
  controllers: [AppController, UserController],
  providers: [AppService, LoanService],
})
export class AppModule {}
