import { ServiceCharge } from '@/src/affiliation/implementations/union/ServiceCharge';
import { Transaction } from '../Transaction.interface';
import { gpayrollDatabase } from '@/src/PayrollDatabase';
import { UnionAffiliation } from '@/src/affiliation/implementations/union/UnionAffiliation';

export class AddServiceChargeTransaction implements Transaction {
  constructor(
    private memberId: number,
    private date: string,
    private amount: number,
  ) {}

  public execute(): void {
    const member = gpayrollDatabase.getUnionMember(this.memberId);
    const af = member.affiliation;
    if (af instanceof UnionAffiliation) {
      af.addServiceCharge(new ServiceCharge(this.date, this.amount));
    }
  }
}
