// loan.interface.ts
import * as dayjs from 'dayjs';

export interface Loan {
  schedule: LoanSchedule[];
  data: LoanData;
}

export interface LoanData {
  principal: number;
  interestRate: number;
  loanType: LoanType;
  loanStartDate: string;
  maturityDate: string;
}

export interface LoanSchedule {
  month: string;
  paymentAmount: number;
  interestAmount: number;
  principalAmount: number;
  remainingPrincipal: number;
}

export enum LoanType {
  Spitzer = 'spitzer',
  EqualPrincipal = 'equal_principal',
  Balloon = 'balloon',
}

export interface LoanInput {
  principal: number;
  interestRate: number;
  loanType: LoanType;
  loanStartDate: dayjs.Dayjs;
  months: number; // Number of months (repayments)
}

export interface LoanCalculationParams {
  principal: number;
  interestRate: number;
  loanType: LoanType;
  loanStartDate: dayjs.Dayjs;
  months: number; // Updated to represent the number of months
}
