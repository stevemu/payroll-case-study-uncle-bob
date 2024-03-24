import { UnionAffiliation } from '../payrollImpl/UnionAffiliation.ts';
import { AddServiceChargeTransaction } from '../transactionImpl/AddServiceChargeTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../transactionImpl/AddHourlyEmployeeTransaction.ts';
import { MapPayrollDatabase } from '../payrollDatabaseImpl/MapPayrollDatabase.ts';
import { PayrollFactoryImpl } from '../payrollImpl/PayrollFactoryImpl.ts';

describe('AddServiceChargeTransaction', () => {
  it('should add service charge to the membership', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(
      db,
      payrollFactory,
      empId,
      'Bill',
      'Home',
      15.25,
    );
    await addHourlyEmployee.execute();

    const e = (await db.getEmployee(empId))!;

    const memberId = 86;
    const af = new UnionAffiliation(memberId, 12.5);
    e.affiliation = af;

    await db.addUnionMember(memberId, e);

    const date = new Date(2021, 8, 10);
    const amount = 100;
    const transaction = new AddServiceChargeTransaction(db, payrollFactory, memberId, date, amount);
    await transaction.execute();

    const member = await db.getUnionMember(memberId);
    const ua = member!.affiliation as UnionAffiliation;

    expect(ua).toBeInstanceOf(UnionAffiliation);
    expect(ua.getServiceCharge(date)!.amount).toBe(amount);
    expect(ua.getServiceCharge(date)!.date).toBe(date);
  });
});
