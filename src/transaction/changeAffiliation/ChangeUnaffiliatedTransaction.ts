import { Employee } from '../../Employee.ts';
import { Affiliation } from '../../affiliation/Affiliation.interface.ts';
import { NoAffiliation } from '../../affiliation/noAffiliation/NoAffiliation.ts';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation.ts';
import { PayrollDatabase } from '../../database/PayrollDatabase.interface.ts';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract.ts';

export class ChangeUnaffiliatedTransaction extends ChangeAffiliationTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  async recordMembership(employee: Employee): Promise<void> {
    if (employee.affiliation instanceof UnionAffiliation) {
      await this.db.deleteUnionMember(employee.affiliation.memberId);
    }
  }

  getAffiliation(): Affiliation {
    return new NoAffiliation();
  }
}
