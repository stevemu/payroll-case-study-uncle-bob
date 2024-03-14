import { DirectMethod } from '@/src/method/DirectMethod.ts';
import { Method } from '@/src/method/Method.interface.ts';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.abstract.ts';

export class ChangeDirectTransaction extends ChangeMethodTransaction {
  constructor(
    empId: number,
    private bank: string,
    private account: string,
  ) {
    super(empId);
  }

  getMethod(): Method {
    return new DirectMethod(this.bank, this.account);
  }
}
