import { Method } from '../payrollDomain/Method.interface.ts';

export class MailMethod implements Method {
  constructor(public address: string) {}

  pay(): void {}
}
