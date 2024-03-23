import { Method } from '../../payrollDomain/Method.interface.ts';

export class HoldMethod implements Method {
  constructor(public address: string) {}

  pay(): void {}
}
