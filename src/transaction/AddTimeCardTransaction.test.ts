import { gPayrollDatabase } from '../database/index.ts';
import { HourlyClassification } from '../paymentClassification/hourly/HourlyClassification.ts';
import { AddTimeCardTransaction } from './AddTimeCardTransaction.ts';
import { AddHourlyEmployeeTransaction } from './addEmployee/AddHourlyEmployeeTransaction.ts';

describe('AddTimeCardTransaction', () => {
  it('should add a time card to an employee', async () => {
    const hours = 8;

    const employeeId = 1;
    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      employeeId,
      'Bob',
      'Home',
      15.25,
    );
    await addEmployeeTransaction.execute();

    const date = new Date(2021, 6, 1);
    const addTimeCardTransaction = new AddTimeCardTransaction(employeeId, date, hours);
    await addTimeCardTransaction.execute();

    const employee = await gPayrollDatabase.getEmployee(employeeId);
    const timeCard = (employee!.classification as HourlyClassification).getTimeCard(date);
    expect(timeCard).toBeDefined();
    expect(timeCard!.hours).toBe(hours);
  });
});
