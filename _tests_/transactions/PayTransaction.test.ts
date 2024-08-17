import { AddServiceChargeTransaction } from '../../src/transactions/AddServiceChargeTransaction.ts';
import { AddTimeCardTransaction } from '../../src/transactions/TimeCardTransaction.ts';
import { PaydayTransaction } from '../../src/transactions/PaydayTransaction.ts';
import { SalesReceiptTransaction } from '../../src/transactions/SalesReceiptTransaction.ts';
import { AddCommissionedEmployeeTransaction } from '../../src/transactions/AddCommissionedEmployeeTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { AddSalariedEmployeeTransaction } from '../../src/transactions/AddSalariedEmployeeTransaction.ts';
import { ChangeMemberTransaction } from '../../src/transactions/ChangeMemberTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('PayTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  describe('given single salaried employee', () => {
    let empId: number;

    beforeEach(async () => {
      empId = 2;
      const transaction = new AddSalariedEmployeeTransaction(db, empId, 'Bill', 'Home', 1000);
      await transaction.execute();
    });

    test('when not doing payday which is last day of month, should get no paycheck', async () => {
      const payDate = new Date(2001, 10, 29); // not last day of month
      const payTransaction = new PaydayTransaction(db, payDate);
      await payTransaction.execute();

      const e = await db.getEmployee(empId);
      expect(e).not.toBeUndefined();

      const pc = payTransaction.getPayCheck(empId);
      expect(pc).toBeNull();
    });

    describe('given pay date is last day of month', () => {
      let payDate: Date;

      beforeEach(async () => {
        payDate = new Date(2001, 10, 30); // last day of month
      });

      test('when doing payday, should pay salaried employee the salary', async () => {
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();

        validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 1000);
      });
    });

    describe('given the employee is union member', () => {
      let memberId: number;

      beforeEach(async () => {
        memberId = 7734;
        const transaction2 = new ChangeMemberTransaction(db, empId, memberId, 9.42);
        await transaction2.execute();
      });

      test('when doing payday, gross pay should be salary, deduction should be number of fridays * union dues, net pay should be gross pay - deduction', async () => {
        const payDate = new Date(2001, 10, 30); // last day of month
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();

        const e = await db.getEmployee(empId);
        expect(e).not.toBeUndefined();

        const pc = pt.getPayCheck(empId);
        expect(pc).not.toBeNull();
        expect(pc!.grossPay).toBe(1000);
        expect(pc!.deductions).toBe(5 * 9.42);
        expect(pc!.netPay).toBe(1000 - 5 * 9.42);
      });
    });
  });

  describe('given single hourly employee', () => {
    let empId: number;

    beforeEach(async () => {
      empId = 2;
      const transaction = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
      await transaction.execute();
    });

    test('given no time cards, when doing payday, should pay zero', async () => {
      const payDate = new Date(2001, 10, 9); // Friday
      const pt = new PaydayTransaction(db, payDate);
      await pt.execute();

      validatePaycheck(pt, empId, new Date(2001, 10, 3), payDate, 0);
    });

    test('when today is not payday, doing pay day would not pay anything', async () => {
      const pt = new PaydayTransaction(db, new Date(2001, 10, 10));
      await pt.execute();
      expect(pt.getPayCheck(empId)).toBeNull();
    });

    describe('given one time card', () => {
      beforeEach(async () => {
        const transaction = new AddTimeCardTransaction(db, empId, new Date(2001, 10, 9), 2.0);
        await transaction.execute();
      });

      test('given today is payday, should pay hourly rate * time card hours', async () => {
        const payDate = new Date(2001, 10, 9); // Friday
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();
        validatePaycheck(pt, empId, new Date(2001, 10, 3), payDate, 15.25 * 2);
      });

      describe('given the employy is union member', () => {
        let memberId: number;
        beforeEach(async () => {
          memberId = 7734;
          const transaction = new ChangeMemberTransaction(db, empId, memberId, 9.42);
          await transaction.execute();
        });

        describe('given has one service charge', () => {
          beforeEach(async () => {
            const addServiceChargeTransaction = new AddServiceChargeTransaction(
              db,
              7734,
              new Date(2001, 10, 9),
              19.42,
            );
            await addServiceChargeTransaction.execute();
          });

          test('when today is payday and doing pay, should pay the deductions', async () => {
            const payDate = new Date(2001, 10, 9); // Friday
            const pt = new PaydayTransaction(db, payDate);
            await pt.execute();
            const paycheck = pt.getPayCheck(empId);
            expect(paycheck).not.toBeNull();
            expect(paycheck!.grossPay).toBe(2 * 15.25);
            expect(paycheck!.deductions).toBe(9.42 + 19.42);
            expect(paycheck!.netPay).toBe(2 * 15.25 - (9.42 + 19.42));
            expect(paycheck!.disposition).toBe('Hold');
          });
        });

        describe('given one service charge in current pay period', () => {
          beforeEach(async () => {
            const addServiceChargeTransaction = new AddServiceChargeTransaction(
              db,
              7734,
              new Date(2001, 10, 9),
              19.42,
            );
            await addServiceChargeTransaction.execute();
          });

          describe('given one service charge before the current pay period', () => {
            beforeEach(async () => {
              const addServiceChargeTransactionEarly = new AddServiceChargeTransaction(
                db,
                7734,
                new Date(2001, 10, 2),
                19.42,
              );
              await addServiceChargeTransactionEarly.execute();
            });

            describe('given one service charge after the current pay period', () => {
              beforeEach(async () => {
                const addServiceChargeTransactionLate = new AddServiceChargeTransaction(
                  db,
                  7734,
                  new Date(2001, 10, 16),
                  19.42,
                );
                await addServiceChargeTransactionLate.execute();
              });

              test('when today is payday, should pay base salary + commission rate * sales receipt amount of the current pay period', async () => {
                const payDate = new Date(2001, 10, 9); // Friday

                const pt = new PaydayTransaction(db, payDate);
                await pt.execute();

                const paycheck = pt.getPayCheck(empId);
                expect(paycheck).not.toBeNull();
                expect(paycheck!.grossPay).toBe(2 * 15.25);
                expect(paycheck!.deductions).toBe(9.42 + 19.42);
                expect(paycheck!.netPay).toBe(2 * 15.25 - (9.42 + 19.42));
                expect(paycheck!.disposition).toBe('Hold');
              });
            });
          });
        });
      });
    });

    describe('given 2 time card', () => {
      beforeEach(async () => {
        const timeCardTransaction = new AddTimeCardTransaction(
          db,
          empId,
          new Date(2024, 2, 22),
          2.0,
        );
        await timeCardTransaction.execute();
        const timeCardTransaction2 = new AddTimeCardTransaction(
          db,
          empId,
          new Date(2024, 2, 16),
          5.0,
        );
        await timeCardTransaction2.execute();
      });

      test('when today is payday, should pay hourly rate * time card hours', async () => {
        const payDate = new Date(2024, 2, 22); // Friday
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();
        validatePaycheck(pt, empId, new Date(2024, 2, 16), payDate, 7 * 15.25);
      });
    });

    describe('given 2 time card spanning two pay periods', () => {
      beforeEach(async () => {
        const timeCardTransaction = new AddTimeCardTransaction(
          db,
          empId,
          new Date(2001, 10, 9),
          2.0,
        );
        await timeCardTransaction.execute();

        const timeCardTransaction2 = new AddTimeCardTransaction(
          db,
          empId,
          new Date(2001, 10, 2),
          5.0,
        );
        await timeCardTransaction2.execute();
      });

      test('when today is payday, should pay hourly rate * time card hours of this week', async () => {
        const payDate = new Date(2001, 10, 9); // Friday
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();
        validatePaycheck(pt, empId, new Date(2001, 10, 3), payDate, 2 * 15.25);
      });
    });
  });

  describe('given single commission employee', () => {
    let empId: number;
    beforeEach(async () => {
      empId = 2;
      const transaction = new AddCommissionedEmployeeTransaction(
        db,
        empId,
        'Bill',
        'Home',
        1000,
        0.1,
      );
      await transaction.execute();
    });

    describe('given no sales', () => {
      test('when today is payday, should pay half of salary', async () => {
        const payDate = new Date(2001, 10, 15); // second Friday
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();
        validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500);
      });

      test('when today is last day of month, doing pay day pays half of salary', async () => {
        const payDate = new Date(2001, 10, 30); // second Friday
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();
        validatePaycheck(pt, empId, new Date(2001, 10, 16), payDate, 500);
      });
    });

    describe('given one sales receipt', () => {
      beforeEach(async () => {
        const transaction = new SalesReceiptTransaction(db, empId, new Date(2001, 10, 15), 100);
        await transaction.execute();
      });

      test('when today is payday, should pay base salary + commission rate * sales receipt amount', async () => {
        const payDate = new Date(2001, 10, 15); // second Friday
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();
        validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500 + 100 * 0.1);
      });
    });

    describe('given two sales receipt spanning two pay periods', () => {
      beforeEach(async () => {
        const transaction = new SalesReceiptTransaction(db, empId, new Date(2001, 10, 15), 100);
        await transaction.execute();
        const transaction2 = new SalesReceiptTransaction(db, empId, new Date(2001, 9, 30), 100);
        await transaction2.execute();
      });

      test('when today is payday, should pay base salary + commission rate * sales receipt amount of the current pay period', async () => {
        const payDate = new Date(2001, 10, 15);
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();
        validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500 + 100 * 0.1);
      });
    });

    describe('given two sales receipt', () => {
      beforeEach(async () => {
        const transaction = new SalesReceiptTransaction(db, empId, new Date(2001, 10, 15), 100);
        await transaction.execute();
        const transaction2 = new SalesReceiptTransaction(db, empId, new Date(2001, 10, 2), 200);
        await transaction2.execute();
      });

      test('when today is payday, should pay base salary + commission rate * sales receipt amount', async () => {
        const payDate = new Date(2001, 10, 15);
        const pt = new PaydayTransaction(db, payDate);
        await pt.execute();
        validatePaycheck(pt, empId, new Date(2001, 10, 1), payDate, 500 + 300 * 0.1);
      });
    });

    test('when today is not payday, doing pay day would not pay anything', async () => {
      const pt = new PaydayTransaction(db, new Date(2001, 10, 8));
      await pt.execute();
      expect(pt.getPayCheck(empId)).toBeNull();
    });
  });
});

function validatePaycheck(
  pt: PaydayTransaction,
  empId: number,
  payPeriodStartDate: Date,
  payDate: Date,
  pay: number,
) {
  const pc = pt.getPayCheck(empId);
  expect(pc).not.toBeNull();
  expect(pc!.payPeriodStartDate).toEqual(payPeriodStartDate);
  expect(pc!.payPeriodEndDate).toEqual(payDate);
  expect(pc!.grossPay).toBe(pay);
  expect(pc!.disposition).toBe('Hold');
  expect(pc!.deductions).toBe(0);
  expect(pc!.netPay).toBe(pay);
}
