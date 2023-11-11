import { Test, TestingModule } from '@nestjs/testing';
import { LoanService } from './loan.service';
import { LoanCalculatorService } from './loan-calculator.service';

describe('LoanService', () => {
  let service: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanService, LoanCalculatorService],
    }).compile();

    service = module.get<LoanService>(LoanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
