import { gPayrollDatabase } from '@/src/PayrollDatabase';
import { AddServiceChargeTransaction } from './AddServiceChargeTransaction';
import { UnionAffiliation } from '@/src/affiliation/union/UnionAffiliation';
import { AddHourlyEmployeeTransaction } from './addEmployee/implementations/AddHourlyEmployeeTransaction';

describe('AddServiceChargeTransaction', () => {
  it('should add service charge to the membership', () => {
    const empId = 2;
    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    addHourlyEmployee.execute();

    const e = gPayrollDatabase.getEmployee(empId);
    const af = new UnionAffiliation(12.5);
    e.affiliation = af;

    const memberId = 86;
    gPayrollDatabase.addUnionMember(memberId, e);

    const date = '2021-01-01';
    const amount = 100;
    const transaction = new AddServiceChargeTransaction(memberId, date, amount);
    transaction.execute();

    const member = gPayrollDatabase.getUnionMember(memberId);
    const ua = member.affiliation as UnionAffiliation;

    expect(ua).toBeInstanceOf(UnionAffiliation);
    expect(ua.getServiceCharge(date).amount).toBe(amount);
    expect(ua.getServiceCharge(date).date).toBe(date);
  });
});
