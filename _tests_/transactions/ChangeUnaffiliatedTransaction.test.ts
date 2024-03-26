import { NoAffiliation } from '../../src/domain/NoAffiliation.ts';
import { AddHourlyEmployeeTransaction } from '../../src/transactions/AddHourlyEmployeeTransaction.ts';
import { ChangeMemberTransaction } from '../../src/transactions/ChangeMemberTransaction.ts';
import { ChangeUnaffiliatedTransaction } from '../../src/transactions/ChangeUnaffiliatedTransaction.ts';
import { MapPayrollDatabase } from '../../src/payrollDatabase/MapPayrollDatabase.ts';

describe('ChangeUnaffiliatedTransaction', () => {
  test('changeUnaffiliated', async () => {
    const db = new MapPayrollDatabase();

    const empId = 2;
    const memberId = 7734;

    const addHourlyEmployee = new AddHourlyEmployeeTransaction(
      db,

      empId,
      'Bill',
      'Home',
      15.25,
    );
    await addHourlyEmployee.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(
      db,

      empId,
      memberId,
      99.42,
    );
    await changeMemberTransaction.execute();

    const changeUnaffiliatedTransaction = new ChangeUnaffiliatedTransaction(
      db,

      empId,
    );
    await changeUnaffiliatedTransaction.execute();

    const e = await db.getEmployee(empId);
    expect(e).not.toBeUndefined();

    const af = e!.affiliation;
    expect(af).toBeInstanceOf(NoAffiliation);
  });
});