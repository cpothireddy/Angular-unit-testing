import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {
    debugger; // to see how many times it is calling
  }
  messages: string[] = [];

  log(message: string) {
    debugger; // to see how many times it is calling
    this.messages.push(message);
  }
}
