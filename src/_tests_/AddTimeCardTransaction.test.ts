import { MapPayrollDatabase } from '../payrollDatabaseImpl/MapPayrollDatabase.ts';
import { HourlyClassification } from '../payrollImpl/HourlyClassification.ts';
import { AddTimeCardTransaction } from '../transactionImpl/TimeCardTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../transactionImpl/AddHourlyEmployeeTransaction.ts';

describe('AddTimeCardTransaction', () => {
  it('should add a time card to an employee', async () => {
    const db = new MapPayrollDatabase();
    const hours = 8;

    const employeeId = 1;
    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      db,
      employeeId,
      'Bob',
      'Home',
      15.25,
    );
    await addEmployeeTransaction.execute();

    const date = new Date(2021, 6, 1);
    const addTimeCardTransaction = new AddTimeCardTransaction(db, employeeId, date, hours);
    await addTimeCardTransaction.execute();

    const employee = await db.getEmployee(employeeId);
    const timeCard = (employee!.classification as HourlyClassification).getTimeCard(date);
    expect(timeCard).toBeDefined();
    expect(timeCard!.hours).toBe(hours);
  });
});
