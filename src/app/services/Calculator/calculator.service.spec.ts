import { LoggerService } from '../Logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let mockLoggerService: any;
  let calculator: CalculatorService;
  beforeEach(() => {
    console.log('calling before each');
    mockLoggerService = jasmine.createSpyObj('chandraService', ['log']);
    calculator = new CalculatorService(mockLoggerService);
  });
  // beforeEach will run before every test case
  it('should add two numbers', () => {
    console.log('calling add method');
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    console.log('calling subtract method');
    let result = calculator.subtract(2, 2);
    expect(result).toBe(0);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});
