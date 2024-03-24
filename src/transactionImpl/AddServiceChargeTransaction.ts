import { UnionAffiliation } from '../payrollImpl/UnionAffiliation.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { Transaction } from '../transaction/Transaction.ts';
import { PayrollFactory } from '../payrollFactory/PayrollFactory.ts';

export class AddServiceChargeTransaction implements Transaction {
  constructor(
    private db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    private memberId: number,
    private date: Date,
    private amount: number,
  ) {}

  public async execute(): Promise<void> {
    const member = await this.db.getUnionMember(this.memberId)!;
    const af = member!.affiliation;
    if (af instanceof UnionAffiliation) {
      af.addServiceCharge(this.payrollFactory.makeServiceCharge(this.date, this.amount));
      await this.db.saveEmployee(member!);
    }
  }
}
