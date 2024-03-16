import { gPayrollDatabase } from '../database/index.ts';
import { UnionAffiliation } from '../affiliation/union/UnionAffiliation.ts';
import { AddServiceChargeTransaction } from './AddServiceChargeTransaction.ts';
import { AddHourlyEmployeeTransaction } from './addEmployee/AddHourlyEmployeeTransaction.ts';

describe('AddServiceChargeTransaction', () => {
  it('should add service charge to the membership', async () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    addHourlyEmployee.execute();

    const e = (await gPayrollDatabase.getEmployee(empId))!;

    const memberId = 86;
    const af = new UnionAffiliation(memberId, 12.5);
    e.affiliation = af;

    await gPayrollDatabase.addUnionMember(memberId, e);

    const date = new Date(2021, 8, 10);
    const amount = 100;
    const transaction = new AddServiceChargeTransaction(memberId, date, amount);
    transaction.execute();

    const member = await gPayrollDatabase.getUnionMember(memberId);
    const ua = member!.affiliation as UnionAffiliation;

    expect(ua).toBeInstanceOf(UnionAffiliation);
    expect(ua.getServiceCharge(date)!.amount).toBe(amount);
    expect(ua.getServiceCharge(date)!.date).toBe(date);
  });
});
