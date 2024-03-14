import { Method } from './Method.interface.ts';

export class HoldMethod implements Method {
  constructor(public address: string) {}

  pay(): void {}
}
