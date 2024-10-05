import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  beforeEach(() => {
    service = new LoggerService();
  });
  it('should not have any messages at starting', () => {
    // arrage
    //const service = new LoggerService();
    // act
    let count = service.messages.length;
    //assert
    expect(count).toBe(0);
  });
  it('should add the messed whn log is called', () => {
    //arrage
    //const service = new LoggerService();
    //act
    service.log('message');
    //assert
    expect(service.messages.length).toBe(1);
  });
  it('should clear all the messages when clear called', () => {
    //arrage
    //const service = new LoggerService();
    service.log('message');
    //act
    service.clear();
    //assert
    expect(service.messages.length).toBe(0);
  });
});
