import { UnionAffiliation } from '../../src/domain/UnionAffiliation.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeMemberTransaction } from '../../src/transactions/ChangeMemberTransaction.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';

describe('ChangeMemberTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  test('changeMember', async () => {
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
    expect(member).toEqual(e);
  });
});
