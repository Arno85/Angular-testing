import { CalculatorService } from './calculator.service';
import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;
  let loggerServiceSpy: any;

  beforeEach(() => {
    loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerServiceSpy }
      ]
    });

    calculatorService = TestBed.get(CalculatorService);
  });

  it('should add two numbers', () => {
    const result = calculatorService.add(2, 2);

    expect(result).toBe(4, 'Unexpected addition result');
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should substract two numbers', () => {
    const result = calculatorService.subtract(2, 2);

    expect(result).toBe(0, 'Unexpected substraction result');
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

});
