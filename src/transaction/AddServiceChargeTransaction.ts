import { gPayrollDatabase } from '../PayrollDatabase';
import { ServiceCharge } from '../affiliation/union/ServiceCharge';
import { UnionAffiliation } from '../affiliation/union/UnionAffiliation';
import { Transaction } from './Transaction.interface';

export class AddServiceChargeTransaction implements Transaction {
  constructor(
    private memberId: number,
    private date: Date,
    private amount: number,
  ) {}

  public execute(): void {
    const member = gPayrollDatabase.getUnionMember(this.memberId)!;
    const af = member.affiliation;
    if (af instanceof UnionAffiliation) {
      af.addServiceCharge(new ServiceCharge(this.date, this.amount));
    }
  }
}
