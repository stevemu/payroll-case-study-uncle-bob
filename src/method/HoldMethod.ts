import { Method } from './Method.interface';

export class HoldMethod implements Method {
  pay(): void {
    throw new Error('Method not implemented.');
  }
}
