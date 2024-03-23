import { Employee } from '../../payrollDomain/employee/Employee.ts';
import { Affiliation } from '../../payrollDomain/Affiliation.interface.ts';
import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.interface.ts';
import { ChangeEmployeeTransaction } from '../../payrollDomain/employee/transactions/changeEmployee/ChangeEmployeeTransaction.abstract.ts';

export abstract class ChangeAffiliationTransaction extends ChangeEmployeeTransaction {
  constructor(db: PayrollDatabase, empId: number) {
    super(db, empId);
  }

  abstract recordMembership(employee: Employee): Promise<void>;

  abstract getAffiliation(): Affiliation;

  async change(employee: Employee): Promise<void> {
    await this.recordMembership(employee);
    employee.affiliation = this.getAffiliation();
    await this.db.saveEmployee(employee);
  }
}
