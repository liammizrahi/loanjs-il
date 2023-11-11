import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import {
  Loan,
  LoanData,
  LoanInput,
  LoanSchedule,
  LoanType,
} from './loan.interface';

@Injectable()
export class LoanCalculatorService {
  calculateLoan(input: LoanInput): Loan {
    const { principal, interestRate, loanType, loanStartDate, months } = input;
    const loanStartDateParsed = dayjs(loanStartDate);
    const maturityDate = this.calculateMaturityDate(
      loanStartDateParsed,
      months,
    );

    const schedule = this.calculateSchedule(
      principal,
      interestRate,
      loanType,
      loanStartDateParsed,
      months,
    );

    const loanData: LoanData = {
      principal,
      interestRate,
      loanType,
      loanStartDate: loanStartDateParsed.format('MM/YYYY'),
      maturityDate: maturityDate.format('MM/YYYY'),
    };

    return { schedule, data: loanData };
  }

  private calculateSchedule(
    principal: number,
    interestRate: number,
    loanType: LoanType,
    loanStartDate: dayjs.Dayjs,
    months: number,
  ): LoanSchedule[] {
    switch (loanType) {
      case LoanType.Spitzer:
        return this.calculateSpitzerSchedule(
          principal,
          interestRate,
          loanStartDate,
          months,
        );
      case LoanType.EqualPrincipal:
        return this.calculateEqualPrincipalSchedule(
          principal,
          interestRate,
          loanStartDate,
          months,
        );
      case LoanType.Balloon:
        return this.calculateBalloonPaymentSchedule(
          principal,
          interestRate,
          loanStartDate,
          months,
        );
      default:
        throw new Error('Invalid loan type');
    }
  }

  private calculateSpitzerSchedule(
    principal: number,
    interestRate: number,
    loanStartDate: dayjs.Dayjs,
    months: number,
  ): LoanSchedule[] {
    const schedule: LoanSchedule[] = [];
    const monthlyInterestRate = interestRate / 12 / 100;
    for (let i = 0; i < months; i++) {
      const monthlyPayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -months + i));
      const interestPayment = principal * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      const remainingPrincipal = principal - principalPayment;

      schedule.push({
        month: loanStartDate.add(i, 'month').format('MM/YYYY'),
        paymentAmount: parseFloat(monthlyPayment.toFixed(2)),
        interestAmount: parseFloat(interestPayment.toFixed(2)),
        principalAmount: parseFloat(principalPayment.toFixed(2)),
        remainingPrincipal: parseFloat(remainingPrincipal.toFixed(2)),
      });

      principal = remainingPrincipal;
    }

    return schedule;
  }

  private calculateEqualPrincipalSchedule(
    principal: number,
    interestRate: number,
    loanStartDate: dayjs.Dayjs,
    months: number,
  ): LoanSchedule[] {
    const schedule: LoanSchedule[] = [];
    const monthlyInterestRate = interestRate / 12 / 100;
    const principalPayment = principal / months;

    for (let i = 0; i < months; i++) {
      const interestPayment = principal * monthlyInterestRate;
      const monthlyPayment = principalPayment + interestPayment;
      const remainingPrincipal = principal - principalPayment;

      schedule.push({
        month: loanStartDate.add(i, 'month').format('MM/YYYY'),
        paymentAmount: parseFloat(monthlyPayment.toFixed(2)),
        interestAmount: parseFloat(interestPayment.toFixed(2)),
        principalAmount: parseFloat(principalPayment.toFixed(2)),
        remainingPrincipal: parseFloat(remainingPrincipal.toFixed(2)),
      });

      principal = remainingPrincipal;
    }

    return schedule;
  }

  private calculateBalloonPaymentSchedule(
    principal: number,
    interestRate: number,
    loanStartDate: dayjs.Dayjs,
    months: number,
  ): LoanSchedule[] {
    const schedule: LoanSchedule[] = [];
    const interestRateDecimal = interestRate / 100;
    const monthlyInterestPayment = principal * interestRateDecimal;

    for (let i = 0; i < months - 1; i++) {
      schedule.push({
        month: loanStartDate.add(i, 'month').format('MM/YYYY'),
        paymentAmount: parseFloat(monthlyInterestPayment.toFixed(2)),
        interestAmount: parseFloat(monthlyInterestPayment.toFixed(2)),
        principalAmount: 0.0,
        remainingPrincipal: parseFloat(principal.toFixed(2)),
      });
    }

    schedule.push({
      month: loanStartDate.add(months - 1, 'month').format('MM/YYYY'),
      paymentAmount: parseFloat(principal.toFixed(2)),
      interestAmount: 0.0,
      principalAmount: 0.0,
      remainingPrincipal: 0.0,
    });

    return schedule;
  }

  private calculateMaturityDate(
    loanStartDate: dayjs.Dayjs,
    months: number,
  ): dayjs.Dayjs {
    return loanStartDate.add(months, 'month');
  }
}
