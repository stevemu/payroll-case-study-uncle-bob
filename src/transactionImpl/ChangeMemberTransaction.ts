import { Employee } from '../payrollDomain/Employee.ts';
import { Affiliation } from '../payrollDomain/Affiliation.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeAffiliationTransaction } from '../abstractTransactions/ChangeAffiliationTransaction.ts';
import { PayrollFactory } from '../payrollFactory/PayrollFactory.ts';

export class ChangeMemberTransaction extends ChangeAffiliationTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
    private memberId: number,
    private dues: number,
  ) {
    super(db, empId);
  }

  async recordMembership(employee: Employee): Promise<void> {
    await this.db.addUnionMember(this.memberId, employee);
  }

  getAffiliation(): Affiliation {
    return this.payrollFactory.makeUnionAffiliation(this.memberId, this.dues);
  }
}