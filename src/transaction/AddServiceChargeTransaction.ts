import { gPayrollDatabase } from '../database/index.ts';
import { ServiceCharge } from '../affiliation/union/ServiceCharge.ts';
import { UnionAffiliation } from '../affiliation/union/UnionAffiliation.ts';
import { Transaction } from './Transaction.interface.ts';

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
