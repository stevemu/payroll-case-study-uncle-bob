import { MailMethod } from '@/src/method/MailMethod.ts';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.abstract.ts';

export class ChangeMailTransaction extends ChangeMethodTransaction {
  constructor(
    empId: number,
    private address: string,
  ) {
    super(empId);
  }

  getMethod() {
    return new MailMethod(this.address);
  }
}
