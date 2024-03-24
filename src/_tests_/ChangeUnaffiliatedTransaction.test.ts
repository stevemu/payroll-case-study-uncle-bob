import { NoAffiliation } from '../payrollImpl/NoAffiliation.ts';
import { AddHourlyEmployeeTransaction } from '../transactionImpl/AddHourlyEmployeeTransaction.ts';
import { ChangeMemberTransaction } from '../transactionImpl/ChangeMemberTransaction.ts';
import { ChangeUnaffiliatedTransaction } from '../transactionImpl/ChangeUnaffiliatedTransaction.ts';
import { MapPayrollDatabase } from '../payrollDatabaseImpl/MapPayrollDatabase.ts';
import { PayrollFactoryImpl } from '../payrollImpl/factoryImpl/PayrollFactoryImpl.ts';

describe('ChangeUnaffiliatedTransaction', () => {
  test('changeUnaffiliated', async () => {
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

    const changeUnaffiliatedTransaction = new ChangeUnaffiliatedTransaction(
      db,
      payrollFactory,
      empId,
    );
    await changeUnaffiliatedTransaction.execute();

    const e = await db.getEmployee(empId);
    expect(e).not.toBeUndefined();

    const af = e!.affiliation;
    expect(af).toBeInstanceOf(NoAffiliation);
  });
});
