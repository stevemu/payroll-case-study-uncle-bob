import { gPayrollDatabase } from '../database/index.ts';
import { CommissionedClassification } from '../paymentClassification/commissioned/CommissionedClassification.ts';
import { SalesReceiptTransaction } from './SalesReceiptTransaction.ts';
import { AddCommissionedEmployeeTransaction } from './addEmployee/AddCommissionedEmployeeTransaction.ts';

describe('SalesReceiptTransaction', () => {
  it('should create a sales receipt', async () => {
    const addEmployeeTransaction = new AddCommissionedEmployeeTransaction(
      1,
      'Bob',
      'Home',
      1000,
      0.1,
    );
    await addEmployeeTransaction.execute();

    const date = new Date(2022, 0, 1);
    const transaction = new SalesReceiptTransaction(1, date, 100);
    await transaction.execute();

    const employee = await gPayrollDatabase.getEmployee(1)!;
    const cc = employee!.classification as CommissionedClassification;

    const receipt = cc.getSalesReceipt(date);
    expect(receipt).toBeDefined();
    expect(receipt!.amount).toBe(100);
  });
});
