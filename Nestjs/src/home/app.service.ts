import { Injectable } from '@nestjs/common';
import { TestException } from './index';

@Injectable()
export class AppService {
  getStart(): string {
    //throw new TestException;
    return 'Hello World!';
  }
}
