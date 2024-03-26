import { UnionAffiliation } from '../domain/UnionAffiliation.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { Transaction } from './Transaction.ts';
import { ServiceCharge } from '../domain/ServiceCharge.ts';

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
