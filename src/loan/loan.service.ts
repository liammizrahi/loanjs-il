import { Injectable } from '@nestjs/common';
import { LoanCalculatorService } from './loan-calculator.service';
import { Loan, LoanInput } from './loan.interface';

@Injectable()
export class LoanService {
  constructor(private readonly loanCalculatorService: LoanCalculatorService) {}

  calculateLoan(input: LoanInput): Loan {
    return this.loanCalculatorService.calculateLoan(input);
  }
}
