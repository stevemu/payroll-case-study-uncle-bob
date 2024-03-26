import { MapPayrollDatabase } from '../src/payrollDatabase/MapPayrollDatabase.ts';
import { HourlyClassification } from '../src/domain/impl/HourlyClassification.ts';
import { AddTimeCardTransaction } from '../src/transactions/TimeCardTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../src/transactions/AddHourlyEmployeeTransaction.ts';
import { PayrollFactoryImpl } from '../src/domain/impl/factoryImpl/PayrollFactoryImpl.ts';

describe('AddTimeCardTransaction', () => {
  it('should add a time card to an employee', async () => {
    const payrollFactory = new PayrollFactoryImpl();
    const db = new MapPayrollDatabase();
    const hours = 8;

    const employeeId = 1;
    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      db,
      payrollFactory,
      employeeId,
      'Bob',
      'Home',
      15.25,
    );
    await addEmployeeTransaction.execute();

    const date = new Date(2021, 6, 1);
    const addTimeCardTransaction = new AddTimeCardTransaction(
      db,
      payrollFactory,
      employeeId,
      date,
      hours,
    );
    await addTimeCardTransaction.execute();

    const employee = await db.getEmployee(employeeId);
    const timeCard = (employee!.classification as HourlyClassification).getTimeCard(date);
    expect(timeCard).toBeDefined();
    expect(timeCard!.hours).toBe(hours);
  });
});
