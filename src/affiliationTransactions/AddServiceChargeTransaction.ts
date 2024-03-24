import { ServiceCharge } from '../affiliations/union/ServiceCharge.ts';
import { UnionAffiliation } from '../affiliations/union/UnionAffiliation.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { Transaction } from '../transactionApplication/Transaction.ts';

export class AddServiceChargeTransaction implements Transaction {
  constructor(
    private db: PayrollDatabase,
    private memberId: number,
    private date: Date,
    private amount: number,
  ) {}

  public async execute(): Promise<void> {
    const member = await this.db.getUnionMember(this.memberId)!;
    const af = member!.affiliation;
    if (af instanceof UnionAffiliation) {
      af.addServiceCharge(new ServiceCharge(this.date, this.amount));
      await this.db.saveEmployee(member!);
    }
  }
}
