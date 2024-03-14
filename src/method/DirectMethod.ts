import { Method } from './Method.interface.ts';

export class DirectMethod implements Method {
  constructor(
    public bank: string,
    public account: string,
  ) {}

  pay(): void {}
}
