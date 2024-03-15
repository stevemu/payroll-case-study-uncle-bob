import { HoldMethod } from '../../../method/HoldMethod.ts';
import { ChangeMethodTransaction } from './ChangeMethodTransaction.abstract.ts';

export class ChangeHoldTransaction extends ChangeMethodTransaction {
  constructor(empId: number) {
    super(empId);
  }

  getMethod() {
    return new HoldMethod('Hold');
  }
}
