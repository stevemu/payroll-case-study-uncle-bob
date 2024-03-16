import { Employee } from '../../Employee.ts';
import { gPayrollDatabase } from '../../database/index.ts';
import { Affiliation } from '../../affiliation/Affiliation.interface.ts';
import { NoAffiliation } from '../../affiliation/noAffiliation/NoAffiliation.ts';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation.ts';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract.ts';

export class ChangeUnaffiliatedTransaction extends ChangeAffiliationTransaction {
  async recordMembership(employee: Employee): Promise<void> {
    if (employee.affiliation instanceof UnionAffiliation) {
      await gPayrollDatabase.deleteUnionMember(employee.affiliation.memberId);
    }
  }

  getAffiliation(): Affiliation {
    return new NoAffiliation();
  }
}
