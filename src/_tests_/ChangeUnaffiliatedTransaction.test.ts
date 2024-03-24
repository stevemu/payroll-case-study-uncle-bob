import { NoAffiliation } from '../affiliations/noAffiliation/NoAffiliation.ts';
import { AddHourlyEmployeeTransaction } from '../generalTransactions/AddHourlyEmployeeTransaction.ts';
import { ChangeMemberTransaction } from '../affiliationTransactions/ChangeMemberTransaction.ts';
import { ChangeUnaffiliatedTransaction } from '../affiliationTransactions/ChangeUnaffiliatedTransaction.ts';
import { MapPayrollDatabase } from '../payrollDatabaseImpl/MapPayrollDatabase.ts';

describe('ChangeUnaffiliatedTransaction', () => {
  test('changeUnaffiliated', async () => {
    const db = new MapPayrollDatabase();
    const empId = 2;
    const memberId = 7734;

    const addHourlyEmployee = new AddHourlyEmployeeTransaction(db, empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(db, empId, memberId, 99.42);
    await changeMemberTransaction.execute();

    const changeUnaffiliatedTransaction = new ChangeUnaffiliatedTransaction(db, empId);
    await changeUnaffiliatedTransaction.execute();

    const e = await db.getEmployee(empId);
    expect(e).not.toBeUndefined();

    const af = e!.affiliation;
    expect(af).toBeInstanceOf(NoAffiliation);
  });
});