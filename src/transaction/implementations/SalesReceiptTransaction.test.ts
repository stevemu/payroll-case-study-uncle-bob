import { gpayrollDatabase } from '@/src/PayrollDatabase';
import { AddCommissionedEmployeeTransaction } from './addEmployee/implementations/AddCommissionedEmployeeTransaction';
import { SalesReceiptTransaction } from './SalesReceiptTransaction';
import { CommissionedClassification } from '@/src/paymentClassification/implementations/commissioned/CommissionedClassification';

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

    const transaction = new SalesReceiptTransaction(1, '2022-01-01', 100);
    transaction.execute();

    const employee = gpayrollDatabase.getEmployee(1);
    const cc = employee.paymentClassification as CommissionedClassification;

    const receipt = cc.getSalesReceipt('2022-01-01');
    expect(receipt).toBeDefined();
    expect(receipt.amount).toBe(100);
  });
});