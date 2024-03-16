import { gPayrollDatabase } from '../../database/index.ts';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation.ts';
import { AddHourlyEmployeeTransaction } from '../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeMemberTransaction } from './ChangeMemberTransaction.ts';

describe('ChangeMemberTransaction', () => {
  test('changeMember', async () => {
    const empId = 2;
    const memberId = 7734;

    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    addHourlyEmployee.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(empId, memberId, 99.42);
    changeMemberTransaction.execute();

    const e = (await gPayrollDatabase.getEmployee(empId))!;
    expect(e).not.toBeUndefined();

    const af = e!.affiliation;
    expect(af).toBeInstanceOf(UnionAffiliation);
    expect((af as UnionAffiliation).dues).toBe(99.42);

    const member = await gPayrollDatabase.getUnionMember(memberId);
    expect(member).toBe(e);
  });
});
