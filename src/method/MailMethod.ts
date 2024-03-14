import { Method } from './Method.interface.ts';

export class MailMethod implements Method {
  constructor(public address: string) {}

  pay(): void {}
}
