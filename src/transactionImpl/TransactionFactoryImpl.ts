import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase';
import { PayrollFactory } from '../payrollFactory/PayrollFactory';
import { AddCommissionedEmployeeTransaction } from './AddCommissionedEmployeeTransaction';
import { AddHourlyEmployeeTransaction } from './AddHourlyEmployeeTransaction';
import { AddSalariedEmployeeTransaction } from './AddSalariedEmployeeTransaction';
import { AddServiceChargeTransaction } from './AddServiceChargeTransaction';
import { ChangeAddressTransaction } from './ChangeAddressTransaction';
import { ChangeCommissionedTransaction } from './ChangeCommissionedTransaction';
import { ChangeDirectTransaction } from './ChangeDirectTransaction';
import { ChangeHoldTransaction } from './ChangeHoldTransaction';
import { ChangeHourlyTransaction } from './ChangeHourlyTransaction';
import { ChangeMailTransaction } from './ChangeMailTransaction';
import { ChangeMemberTransaction } from './ChangeMemberTransaction';
import { ChangeNameTransaction } from './ChangeNameTransaction';
import { ChangeSalariedTransaction } from './ChangeSalariedTransaction';
import { ChangeUnaffiliatedTransaction } from './ChangeUnaffiliatedTransaction';
import { DeleteEmployeeTransaction } from './DeleteEmployeeTransaction';
import { PaydayTransaction } from './PaydayTransaction';
import { SalesReceiptTransaction } from './SalesReceiptTransaction';
import { AddTimeCardTransaction } from './TimeCardTransaction';

export class TransactionFactoryImpl {
  constructor(
    private db: PayrollDatabase,
    private payrollFactory: PayrollFactory,
  ) {}

  makeAddCommissionedEmployeeTransaction(
    empId: number,
    name: string,
    address: string,
    salary: number,
    commissionRate: number,
  ) {
    return new AddCommissionedEmployeeTransaction(
      this.db,
      this.payrollFactory,
      empId,
      name,
      address,
      salary,
      commissionRate,
    );
  }

  makeAddHourlyEmployeeTransaction(
    empId: number,
    name: string,
    address: string,
    hourlyRate: number,
  ) {
    return new AddHourlyEmployeeTransaction(
      this.db,
      this.payrollFactory,
      empId,
      name,
      address,
      hourlyRate,
    );
  }

  makeAddSalariedEmployeeTransaction(empId: number, name: string, address: string, salary: number) {
    return new AddSalariedEmployeeTransaction(
      this.db,
      this.payrollFactory,
      empId,
      name,
      address,
      salary,
    );
  }

  makeServiceChargeTransaction(memberId: number, date: Date, amount: number) {
    return new AddServiceChargeTransaction(this.db, this.payrollFactory, memberId, date, amount);
  }

  makeChangeAddressTransaction(empId: number, newAddress: string) {
    return new ChangeAddressTransaction(this.db, empId, newAddress);
  }

  makeChangeCommissionedTransaction(empId: number, salary: number, commissionRate: number) {
    return new ChangeCommissionedTransaction(
      this.db,
      this.payrollFactory,
      empId,
      salary,
      commissionRate,
    );
  }

  makeChangeDirectTransaction(empId: number, bank: string, account: string) {
    return new ChangeDirectTransaction(this.db, this.payrollFactory, empId, bank, account);
  }

  makeChangeHoldTransaction(empId: number, address: string) {
    return new ChangeHoldTransaction(this.db, this.payrollFactory, empId, address);
  }

  makeChangeHourlyTransaction(empId: number, hourlyRate: number) {
    return new ChangeHourlyTransaction(this.db, this.payrollFactory, empId, hourlyRate);
  }

  makeChangeMailTransaction(empId: number, address: string) {
    return new ChangeMailTransaction(this.db, this.payrollFactory, empId, address);
  }

  makeChangeMemberTransaction(empId: number, memberId: number, dues: number) {
    return new ChangeMemberTransaction(this.db, this.payrollFactory, empId, memberId, dues);
  }

  makeChangeNameTransaction(empId: number, newName: string) {
    return new ChangeNameTransaction(this.db, empId, newName);
  }

  makeChangeSalariedTransaction(empId: number, salary: number) {
    return new ChangeSalariedTransaction(this.db, this.payrollFactory, empId, salary);
  }

  makeChangeUnaffiliatedTransaction(empId: number) {
    return new ChangeUnaffiliatedTransaction(this.db, this.payrollFactory, empId);
  }

  makeDeleteEmployeeTransaction(empId: number) {
    return new DeleteEmployeeTransaction(this.db, empId);
  }

  makePaydayTransaction(date: Date) {
    return new PaydayTransaction(this.db, date);
  }

  makeSalesReceiptTransaction(empId: number, date: Date, amount: number) {
    return new SalesReceiptTransaction(this.db, this.payrollFactory, empId, date, amount);
  }

  makeTimeCardTransaction(empId: number, date: Date, hours: number) {
    return new AddTimeCardTransaction(this.db, this.payrollFactory, empId, date, hours);
  }
}
