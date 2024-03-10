import { Method } from './Method.interface';

export class MailMethod implements Method {
  constructor(private address: string) {}

  pay(): void {
    throw new Error('Method not implemented.');
  }
}
