import { LoggerService } from '../Logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  it('should add two numbers', () => {
    // let loggerService = new LoggerService();
    // now, I want to create a spy on complete service, that means I don't want to hit the original service, instead I will create a spyon object on the loggerService.
    let mockLoggerService = jasmine.createSpyObj('chandraService', ['log']);
    // in above line, we are creating(spyonObj) a service and log method, that will use in below add method.
    // you can give any name here, but we are matching that with logService in below line
    const calculator = new CalculatorService(mockLoggerService);
    // spyOn(loggerService, 'log');
    let result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    let mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    const calculator = new CalculatorService(mockLoggerService);
    let result = calculator.subtract(2, 2);
    expect(result).toBe(0);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});
