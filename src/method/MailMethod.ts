import { Method } from './Method.interface';

export class MailMethod implements Method {
  constructor(public address: string) {}

  pay(): void {
    throw new Error('Method not implemented.');
  }
}
