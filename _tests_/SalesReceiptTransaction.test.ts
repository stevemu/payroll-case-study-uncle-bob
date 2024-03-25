import { MapPayrollDatabase } from '../src/payrollDatabaseImpl/MapPayrollDatabase.ts';
import { CommissionedClassification } from '../src/payrollImpl/CommissionedClassification.ts';
import { SalesReceiptTransaction } from '../src/transactionImpl/SalesReceiptTransaction.ts';
import { AddCommissionedEmployeeTransaction } from '../src/transactionImpl/AddCommissionedEmployeeTransaction.ts';
import { PayrollFactoryImpl } from '../src/payrollImpl/factoryImpl/PayrollFactoryImpl.ts';

describe('SalesReceiptTransaction', () => {
  it('should create a sales receipt', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
    const addEmployeeTransaction = new AddCommissionedEmployeeTransaction(
      db,
      payrollFactory,
      1,
      'Bob',
      'Home',
      1000,
      0.1,
    );
    await addEmployeeTransaction.execute();

    const date = new Date(2022, 0, 1);
    const transaction = new SalesReceiptTransaction(db, payrollFactory, 1, date, 100);
    await transaction.execute();

    const employee = await db.getEmployee(1)!;
    const cc = employee!.classification as CommissionedClassification;

    const receipt = cc.getSalesReceipt(date);
    expect(receipt).toBeDefined();
    expect(receipt!.amount).toBe(100);
  });
});
