import { gPayrollDatabase } from '../database/PayrollDatabase.ts';
import { CommissionedClassification } from '../paymentClassification/commissioned/CommissionedClassification.ts';
import { SalesReceiptTransaction } from './SalesReceiptTransaction.ts';
import { AddCommissionedEmployeeTransaction } from './addEmployee/AddCommissionedEmployeeTransaction.ts';

describe('SalesReceiptTransaction', () => {
  it('should create a sales receipt', () => {
    const addEmployeeTransaction = new AddCommissionedEmployeeTransaction(
      1,
      'Bob',
      'Home',
      1000,
      0.1,
    );
    addEmployeeTransaction.execute();

    const date = new Date(2022, 0, 1);
    const transaction = new SalesReceiptTransaction(1, date, 100);
    transaction.execute();

    const employee = gPayrollDatabase.getEmployee(1)!;
    const cc = employee.classification as CommissionedClassification;

    const receipt = cc.getSalesReceipt(date);
    expect(receipt).toBeDefined();
    expect(receipt!.amount).toBe(100);
  });
});
