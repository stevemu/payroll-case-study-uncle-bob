import { ServiceCharge } from '@/src/affiliation/union/ServiceCharge';
import { Transaction } from './Transaction.interface';
import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { UnionAffiliation } from '@/src/affiliation/union/UnionAffiliation';

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
