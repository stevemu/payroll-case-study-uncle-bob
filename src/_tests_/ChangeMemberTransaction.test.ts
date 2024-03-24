import { UnionAffiliation } from '../payrollImpl/UnionAffiliation.ts';
import { MapPayrollDatabase } from '../payrollDatabaseImpl/MapPayrollDatabase.ts';
import { AddHourlyEmployeeTransaction } from '../transactionImpl/AddHourlyEmployeeTransaction.ts';
import { ChangeMemberTransaction } from '../transactionImpl/ChangeMemberTransaction.ts';

describe('ChangeMemberTransaction', () => {
  test('changeMember', async () => {
    const db = new MapPayrollDatabase();
    const empId = 2;
    const memberId = 7734;

    const addHourlyEmployee = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(db, empId, memberId, 99.42);
    await changeMemberTransaction.execute();

    const e = (await db.getEmployee(empId))!;
    expect(e).not.toBeUndefined();

    const af = e!.affiliation;
    expect(af).toBeInstanceOf(UnionAffiliation);
    expect((af as UnionAffiliation).dues).toBe(99.42);

    const member = await db.getUnionMember(memberId);
    expect(member).toBe(e);
  });
});
