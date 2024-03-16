import { gPayrollDatabase } from '../../database/index.ts';
import { NoAffiliation } from '../../affiliation/noAffiliation/NoAffiliation.ts';
import { AddHourlyEmployeeTransaction } from '../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeMemberTransaction } from './ChangeMemberTransaction.ts';
import { ChangeUnaffiliatedTransaction } from './ChangeUnaffiliatedTransaction.ts';

describe('ChangeUnaffiliatedTransaction', () => {
  test('changeUnaffiliated', async () => {
    const empId = 2;
    const memberId = 7734;

    const addHourlyEmployee = new AddHourlyEmployeeTransaction(empId, 'Bill', 'Home', 15.25);
    await addHourlyEmployee.execute();

    const changeMemberTransaction = new ChangeMemberTransaction(empId, memberId, 99.42);
    await changeMemberTransaction.execute();

    const changeUnaffiliatedTransaction = new ChangeUnaffiliatedTransaction(empId);
    await changeUnaffiliatedTransaction.execute();

    const e = await gPayrollDatabase.getEmployee(empId);
    expect(e).not.toBeUndefined();

    const af = e!.affiliation;
    expect(af).toBeInstanceOf(NoAffiliation);
  });
});
