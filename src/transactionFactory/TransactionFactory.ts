import { Transaction } from '../transactionApplication/Transaction';

export interface TransactionFactory {
  makeCommissionedEmployeeTransaction(
    empId: number,
    name: string,
    address: string,
    salary: number,
    commissionRate: number,
  ): Transaction;
  makeAddHourlyEmployeeTransaction(
    empId: number,
    name: string,
    address: string,
    hourlyRate: number,
  ): Transaction;
  makeSalariedEmployeeTransaction(
    empId: number,
    name: string,
    address: string,
    salary: number,
  ): Transaction;
  makeServiceChargeTransaction(memberId: number, date: Date, amount: number): Transaction;
  makeChangeAddressTransaction(empId: number, address: string): Transaction;
  makeChangeCommissionedTransaction(
    empId: number,
    salary: number,
    commissionRate: number,
  ): Transaction;
  makeChangeDirectTransaction(empId: number, bank: string, account: string): Transaction;
  makeChangeHoldTransaction(empId: number): Transaction;
  makeChangeHourlyTransaction(empId: number, hourlyRate: number): Transaction;
  makeChangeMailTransaction(empId: number, address: string): Transaction;
  makeChangeMemberTransaction(empId: number, memberId: number, dues: number): Transaction;
  makeChangeNameTransaction(empId: number, name: string): Transaction;
  makeChangeSalariedTransaction(empId: number, salary: number): Transaction;
  makeChangeUnaffiliatedTransaction(empId: number): Transaction;
  makeDeleteEmployeeTransaction(empId: number): Transaction;
  makePaydayTransaction(date: Date): Transaction;
  makeSalesReceiptTransaction(empId: number, date: Date, amount: number): Transaction;
  makeTimeCardTransaction(empId: number, date: Date, hours: number): Transaction;
}
