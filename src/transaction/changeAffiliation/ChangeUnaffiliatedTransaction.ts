import { Employee } from '@/src/Employee.ts';
import { gPayrollDatabase } from '@/src/PayrollDatabase.ts';
import { Affiliation } from '@/src/affiliation/Affiliation.interface.ts';
import { NoAffiliation } from '@/src/affiliation/noAffiliation/NoAffiliation.ts';
import { UnionAffiliation } from '@/src/affiliation/union/UnionAffiliation.ts';
import { ChangeAffiliationTransaction } from './ChangeAffiliationTransaction.abstract.ts';

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
