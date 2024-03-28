import { CommissionedClassification } from '../../src/domain/CommissionedClassification.ts';
import { SalesReceiptTransaction } from '../../src/transactions/SalesReceiptTransaction.ts';
import { AddCommissionedEmployeeTransaction } from '../../src/transactions/AddCommissionedEmployeeTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';
import { Employee } from '../../src/domain/Employee.ts';

describe('SalesReceiptTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should create a sales receipt', async () => {
    const empId = 1;
    const salary = 2000;
    const commissionRate = 0.1;
    const t = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bob',
      'Home',
      salary,
      commissionRate,
    );
    await t.execute();

    const addSalesReceiptTransaction = new SalesReceiptTransaction(
      db,
      empId,
      new Date(2021, 1, 1),
      100,
    );
    await addSalesReceiptTransaction.execute();

    const addSalesReceiptTransaction2 = new SalesReceiptTransaction(
      db,
      empId,
      new Date(2021, 1, 2),
      200,
    );
    await addSalesReceiptTransaction2.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e).toBeInstanceOf(Employee);
    expect(e.name).toBe('Bob');
    expect(e.address).toBe('Home');

    const c = e.classification as CommissionedClassification;
    expect(c).toBeInstanceOf(CommissionedClassification);
    expect(c.salary).toBe(salary);
    expect(c.commissionRate).toBe(commissionRate);
    expect(c.getSalesReceipt(new Date(2021, 1, 1))!.amount).toBe(100);
    expect(c.getSalesReceipt(new Date(2021, 1, 2))!.amount).toBe(200);
  });
});
