import { HoldMethod } from '../../../method/HoldMethod';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.abstract';

export class ChangeHoldTransaction extends ChangeMethodTransaction {
  constructor(empId: number) {
    super(empId);
  }

  getMethod() {
    return new HoldMethod('Hold');
  }
}
