import { DirectMethod } from '@/src/method/DirectMethod';
import { Method } from '@/src/method/Method.interface';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.abstract';

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
