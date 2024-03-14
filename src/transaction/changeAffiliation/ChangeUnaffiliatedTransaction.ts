import { Employee } from '@/src/Employee';
import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { Affiliation } from '@/src/affiliation/Affiliation.interface';
import { NoAffiliation } from '@/src/affiliation/noAffiliation/NoAffiliation';
import { UnionAffiliation } from '@/src/affiliation/union/UnionAffiliation';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract';

export class ChangeUnaffiliatedTransaction extends ChangeAffiliationTransaction {
  recordMembership(employee: Employee): void {
    if (employee.affiliation instanceof UnionAffiliation) {
      gPayrollDatabase.deleteUnionMember(employee.affiliation.memberId);
    }
  }

  getAffiliation(): Affiliation {
    return new NoAffiliation();
  }
}
