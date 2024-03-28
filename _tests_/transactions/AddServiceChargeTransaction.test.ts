import { UnionAffiliation } from '../../src/domain/UnionAffiliation.ts';
import { AddServiceChargeTransaction } from '../../src/transactions/AddServiceChargeTransaction.ts';
import { PrismaPayrollDatabase } from '../../src/PrismaPayrollDatabase/PrismaPayrollDatabase.ts';
import { testPrismaClient } from '../_utils/prismaUtil.ts';
import { NoAffiliation } from '../../src/domain/NoAffiliation.ts';
import { AddSalariedEmployeeTransaction } from '../../src/transactions/AddSalariedEmployeeTransaction.ts';
import { ChangeMemberTransaction } from '../../src/transactions/ChangeMemberTransaction.ts';
import { ChangeUnaffiliatedTransaction } from '../../src/transactions/ChangeUnaffiliatedTransaction.ts';

describe('AddServiceChargeTransaction', () => {
  const db = new PrismaPayrollDatabase(testPrismaClient);

  beforeEach(async () => {
    await db.clear();
  });

  it('should add service charge to the membership', async () => {
    const empId = 1;
    const memberId = 100;
    const salary = 2000;

    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', salary);
    await t.execute();

    const memberTransaction = new ChangeMemberTransaction(db, empId, memberId, 20);
    await memberTransaction.execute();

    const serviceChargeTransaction = new AddServiceChargeTransaction(
      db,
      memberId,
      new Date(2021, 1, 1),
      10,
    );
    await serviceChargeTransaction.execute();

    const serviceChargeTransaction2 = new AddServiceChargeTransaction(
      db,
      memberId,
      new Date(2021, 1, 2),
      20,
    );
    await serviceChargeTransaction2.execute();

    const e = (await db.getEmployee(empId))!;
    const a = e.affiliation as UnionAffiliation;
    expect(a).toBeInstanceOf(UnionAffiliation);
    expect(a.memberId).toBe(memberId);
    expect(a.dues).toBe(20);

    expect(a.getServiceCharge(new Date(2021, 1, 1))!.amount).toBe(10);
    expect(a.getServiceCharge(new Date(2021, 1, 2))!.amount).toBe(20);

    const noMemberTransaction = new ChangeUnaffiliatedTransaction(db, empId);
    await noMemberTransaction.execute();

    const e2 = (await db.getEmployee(empId))!;
    expect(e2.affiliation).toBeInstanceOf(NoAffiliation);
  });
});
