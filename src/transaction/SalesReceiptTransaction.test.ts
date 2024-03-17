import { MapPayrollDatabase } from '../database/MapPayrollDatabase.ts';
import { CommissionedClassification } from '../paymentClassification/commissioned/CommissionedClassification.ts';
import { SalesReceiptTransaction } from './SalesReceiptTransaction.ts';
import { AddCommissionedEmployeeTransaction } from './addEmployee/AddCommissionedEmployeeTransaction.ts';

describe('SalesReceiptTransaction', () => {
  it('should create a sales receipt', async () => {
    const db = new MapPayrollDatabase();
    const addEmployeeTransaction = new AddCommissionedEmployeeTransaction(
      db,
      1,
      'Bob',
      'Home',
      1000,
      0.1,
    );
    await addEmployeeTransaction.execute();

    const date = new Date(2022, 0, 1);
    const transaction = new SalesReceiptTransaction(db, 1, date, 100);
    await transaction.execute();

    const employee = await db.getEmployee(1)!;
    const cc = employee!.classification as CommissionedClassification;

    const receipt = cc.getSalesReceipt(date);
    expect(receipt).toBeDefined();
    expect(receipt!.amount).toBe(100);
  });
});
