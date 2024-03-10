import { MailMethod } from '@/src/method/MailMethod';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.abstract';

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
