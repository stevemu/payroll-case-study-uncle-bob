import { UnionAffiliation } from '../src/domain/impl/UnionAffiliation.ts';
import { MapPayrollDatabase } from '../src/payrollDatabase/MapPayrollDatabase.ts';
import { AddHourlyEmployeeTransaction } from '../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeMemberTransaction } from '../src/transactions/ChangeMemberTransaction.ts';
import { PayrollFactoryImpl } from '../src/domain/impl/factoryImpl/PayrollFactoryImpl.ts';

describe('ChangeMemberTransaction', () => {
  test('changeMember', async () => {
    const db = new MapPayrollDatabase();
    const payrollFactory = new PayrollFactoryImpl();
    const empId = 2;
    const memberId = 7734;

    const addHourlyEmployee = new AddHourlyEmployeeTransaction(
      db,
      payrollFactory,
      empId,
      'Bill',
      'Home',
      15.25,
    );
    await addHourlyEmployee.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(
      db,
      payrollFactory,
      empId,
      memberId,
      99.42,
    );
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
