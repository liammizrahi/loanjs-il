import { Test, TestingModule } from '@nestjs/testing';
import { LoanCalculatorService } from './loan-calculator.service';
import * as dayjs from 'dayjs';
import { LoanInput, LoanSchedule, LoanType } from './loan.interface';

describe('LoanCalculator', () => {
  let service: LoanCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanCalculatorService],
    }).compile();

    service = module.get<LoanCalculatorService>(LoanCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate spitzer loan schedule #1', () => {
    const loanInput: LoanInput = {
      principal: 10000,
      interestRate: 10.0,
      loanType: LoanType.Spitzer,
      loanStartDate: dayjs(),
      months: 10,
    };

    const loan = service.calculateLoan(loanInput);

    expect(loan).toBeDefined();
    expect(loan.schedule.length).toBe(10);

    const expectedFirstSchedule: LoanSchedule = {
      month: dayjs().format('MM/YYYY'),
      paymentAmount: 1046.4,
      interestAmount: 83.33,
      principalAmount: 963.07,
      remainingPrincipal: 9036.93,
    };

    expect(loan.schedule[0]).toEqual(expectedFirstSchedule);
  });

  it('should calculate spitzer loan schedule #2', () => {
    const loanInput: LoanInput = {
      principal: 139225,
      interestRate: 6.65,
      loanType: LoanType.Spitzer,
      loanStartDate: dayjs(),
      months: 60,
    };

    const loan = service.calculateLoan(loanInput);

    expect(loan).toBeDefined();
    expect(loan.schedule.length).toBe(60);

    const expectedFirstSchedule: LoanSchedule = {
      month: dayjs().format('MM/YYYY'),
      paymentAmount: 2733.89,
      interestAmount: 771.54,
      principalAmount: 1962.35,
      remainingPrincipal: 137262.65,
    };

    expect(loan.schedule[0]).toEqual(expectedFirstSchedule);
  });

  it('should calculate equal principal loan schedule #2', () => {
    const loanInput: LoanInput = {
      principal: 10000,
      interestRate: 10.0,
      loanType: LoanType.EqualPrincipal,
      loanStartDate: dayjs(),
      months: 10,
    };

    const loan = service.calculateLoan(loanInput);

    expect(loan).toBeDefined();
    expect(loan.schedule.length).toBe(10);

    const expectedFirstSchedule: LoanSchedule = {
      month: dayjs().format('MM/YYYY'),
      paymentAmount: 1083.33,
      interestAmount: 83.33,
      principalAmount: 1000,
      remainingPrincipal: 9000,
    };

    expect(loan.schedule[0]).toEqual(expectedFirstSchedule);
  });

  it('should calculate balloon loan schedule #4', () => {
    const loanInput: LoanInput = {
      principal: 20000,
      interestRate: 8.0,
      loanType: LoanType.Balloon,
      loanStartDate: dayjs(),
      months: 24,
    };

    const loan = service.calculateLoan(loanInput);

    expect(loan).toBeDefined();
    expect(loan.schedule.length).toBe(24);
    // Add more assertions based on your expected results
  });
});
