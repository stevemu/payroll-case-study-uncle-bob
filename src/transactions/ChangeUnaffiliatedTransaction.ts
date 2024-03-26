import { Affiliation } from '../domain/abstracts/Affiliation.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeAffiliationTransaction } from './abstracts/ChangeAffiliationTransaction.ts';
import { NoAffiliation } from '../domain/NoAffiliation.ts';

export class ChangeUnaffiliatedTransaction extends ChangeAffiliationTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  getAffiliation(): Affiliation {
    return new NoAffiliation();
  }
}
