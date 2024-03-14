import { gPayrollDatabase } from '../../PayrollDatabase';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation';
import { AddHourlyEmployeeTransaction } from '../addEmployee/AddHourlyEmployeeTransaction';
import { ChangeMemberTransaction } from './ChangeMemberTransaction';

describe('ChangeMemberTransaction', () => {
  test('changeMember', () => {
    const empId = 2;
    const memberId = 7734;

    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    addHourlyEmployee.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(empId, memberId, 99.42);
    changeMemberTransaction.execute();

    const e = gPayrollDatabase.getEmployee(empId);
    expect(e).not.toBeUndefined();

    const af = e!.affiliation;
    expect(af).toBeInstanceOf(UnionAffiliation);
    expect((af as UnionAffiliation).dues).toBe(99.42);

    const member = gPayrollDatabase.getUnionMember(memberId);
    expect(member).toBe(e);
  });
});
