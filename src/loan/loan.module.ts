import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
//import { LoanController } from './loan.controller';
import { LoanCalculatorService } from './loan-calculator.service';

@Module({
  controllers: [],
  providers: [LoanService, LoanCalculatorService],
})
export class LoanModule {}
