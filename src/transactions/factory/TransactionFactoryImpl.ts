import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.ts';
import { TransactionFactory } from './TransactionFactory.ts';
import { AddCommissionedEmployeeTransaction } from '../AddCommissionedEmployeeTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../AddHourlyEmployeeTransaction.ts';
import { AddSalariedEmployeeTransaction } from '../AddSalariedEmployeeTransaction.ts';
import { AddServiceChargeTransaction } from '../AddServiceChargeTransaction.ts';
import { ChangeAddressTransaction } from '../ChangeAddressTransaction.ts';
import { ChangeCommissionedTransaction } from '../ChangeCommissionedTransaction.ts';
import { ChangeDirectTransaction } from '../ChangeDirectTransaction.ts';
import { ChangeHoldTransaction } from '../ChangeHoldTransaction.ts';
import { ChangeHourlyTransaction } from '../ChangeHourlyTransaction.ts';
import { ChangeMailTransaction } from '../ChangeMailTransaction.ts';
import { ChangeMemberTransaction } from '../ChangeMemberTransaction.ts';
import { ChangeNameTransaction } from '../ChangeNameTransaction.ts';
import { ChangeSalariedTransaction } from '../ChangeSalariedTransaction.ts';
import { ChangeUnaffiliatedTransaction } from '../ChangeUnaffiliatedTransaction.ts';
import { DeleteEmployeeTransaction } from '../DeleteEmployeeTransaction.ts';
import { PaydayTransaction } from '../PaydayTransaction.ts';
import { SalesReceiptTransaction } from '../SalesReceiptTransaction.ts';
import { AddTimeCardTransaction } from '../TimeCardTransaction.ts';

export class TransactionFactoryImpl implements TransactionFactory {
  constructor(private db: PayrollDatabase) {}

  makeAddCommissionedEmployeeTransaction(
    empId: number,
    name: string,
    address: string,
    salary: number,
    commissionRate: number,
  ) {
    return new AddCommissionedEmployeeTransaction(
      this.db,
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
    return new AddHourlyEmployeeTransaction(this.db, empId, name, address, hourlyRate);
  }

  makeAddSalariedEmployeeTransaction(empId: number, name: string, address: string, salary: number) {
    return new AddSalariedEmployeeTransaction(this.db, empId, name, address, salary);
  }

  makeServiceChargeTransaction(memberId: number, date: Date, amount: number) {
    return new AddServiceChargeTransaction(this.db, memberId, date, amount);
  }

  makeChangeAddressTransaction(empId: number, newAddress: string) {
    return new ChangeAddressTransaction(this.db, empId, newAddress);
  }

  makeChangeCommissionedTransaction(empId: number, salary: number, commissionRate: number) {
    return new ChangeCommissionedTransaction(this.db, empId, salary, commissionRate);
  }

  makeChangeDirectTransaction(empId: number, bank: string, account: string) {
    return new ChangeDirectTransaction(this.db, empId, bank, account);
  }

  makeChangeHoldTransaction(empId: number, address: string) {
    return new ChangeHoldTransaction(this.db, empId, address);
  }

  makeChangeHourlyTransaction(empId: number, hourlyRate: number) {
    return new ChangeHourlyTransaction(this.db, empId, hourlyRate);
  }

  makeChangeMailTransaction(empId: number, address: string) {
    return new ChangeMailTransaction(this.db, empId, address);
  }

  makeChangeMemberTransaction(empId: number, memberId: number, dues: number) {
    return new ChangeMemberTransaction(this.db, empId, memberId, dues);
  }

  makeChangeNameTransaction(empId: number, newName: string) {
    return new ChangeNameTransaction(this.db, empId, newName);
  }

  makeChangeSalariedTransaction(empId: number, salary: number) {
    return new ChangeSalariedTransaction(this.db, empId, salary);
  }

  makeChangeUnaffiliatedTransaction(empId: number) {
    return new ChangeUnaffiliatedTransaction(this.db, empId);
  }

  makeDeleteEmployeeTransaction(empId: number) {
    return new DeleteEmployeeTransaction(this.db, empId);
  }

  makePaydayTransaction(date: Date) {
    return new PaydayTransaction(this.db, date);
  }

  makeSalesReceiptTransaction(empId: number, date: Date, amount: number) {
    return new SalesReceiptTransaction(this.db, empId, date, amount);
  }

  makeTimeCardTransaction(empId: number, date: Date, hours: number) {
    return new AddTimeCardTransaction(this.db, empId, date, hours);
  }
}
