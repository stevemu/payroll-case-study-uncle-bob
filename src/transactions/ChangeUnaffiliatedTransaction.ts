import { Employee } from '../domain/Employee.ts';
import { Affiliation } from '../domain/Affiliation.ts';
import { UnionAffiliation } from '../domain/impl/UnionAffiliation.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.ts';
import { ChangeAffiliationTransaction } from './abstractTransactions/ChangeAffiliationTransaction.ts';
import { PayrollFactory } from '../domain/impl/factoryImpl/PayrollFactory.ts';

export class ChangeUnaffiliatedTransaction extends ChangeAffiliationTransaction {
  constructor(
    db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
    empId: number,
  ) {
    super(db, empId);
  }

  async recordMembership(employee: Employee): Promise<void> {
    if (employee.affiliation instanceof UnionAffiliation) {
      await this.db.deleteUnionMember(employee.affiliation.memberId);
    }
  }

  getAffiliation(): Affiliation {
    return this.payrollFactory.makeNoAffiliation();
  }
}
