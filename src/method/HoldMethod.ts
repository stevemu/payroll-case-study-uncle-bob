import { Method } from './Method.interface';

export class HoldMethod implements Method {
  constructor(public address: string) {}

  pay(): void {
    throw new Error('Method not implemented.');
  }
}
