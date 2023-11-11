// src/app/loan/loan.service.ts
import { Injectable } from '@nestjs/common';
import { LoanCalculationService } from './loan-calculation.service';

interface LoanDetails {
  paymentAmount: number;
  interestAmount: number;
  principalAmount: number;
  remainingPrincipal: number;
  date: string;
}

interface Loan {
  schedule: LoanDetails[];
  startDate: string;
  maturityDate: string;
}

@Injectable()
export class LoanService {
  constructor(
    private readonly loanCalculationService: LoanCalculationService,
  ) {}

  createLoan(
    principal: number,
    interestRate: number,
    months: number,
    loanType: string,
    loanStartDate: string = moment().toISOString(),
  ): Loan {
    const maturityDate = this.loanCalculationService.calculateMaturityDate(
      loanStartDate,
      months,
    );
    let schedule: LoanDetails[] = [];

    // Calculate schedule based on loan type using loanCalculationService...
    switch (loanType) {
      case 'spitzer':
        schedule =
          this.loanCalculationService.calculateSpitzerSchedule(/* Add parameters as needed */);
        break;
      case 'equal_principal':
        schedule =
          this.loanCalculationService.calculateEqualPrincipalSchedule(/* Add parameters as needed */);
        break;
      case 'balloon':
        schedule =
          this.loanCalculationService.calculateBalloonPaymentSchedule(/* Add parameters as needed */);
        break;
      default:
        throw new Error('Invalid loan type');
    }

    // Populate the loan object
    const loan: Loan = {
      schedule: schedule,
      startDate: loanStartDate,
      maturityDate: maturityDate,
    };

    return loan;
  }
}
