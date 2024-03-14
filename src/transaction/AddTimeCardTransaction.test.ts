import { gPayrollDatabase } from '@/src/PayrollDatabase.ts';
import { AddTimeCardTransaction } from './AddTimeCardTransaction.ts';
import { AddHourlyEmployeeTransaction } from './addEmployee/AddHourlyEmployeeTransaction.ts';
import { HourlyClassification } from '@/src/paymentClassification/hourly/HourlyClassification.ts';

describe('AddTimeCardTransaction', () => {
  it('should add a time card to an employee', () => {
    const hours = 8;

    const employeeId = 1;
    const addEmployeeTransaction = new AddHourlyEmployeeTransaction(
      employeeId,
      'Bob',
      'Home',
      15.25,
    );
    addEmployeeTransaction.execute();

    const date = new Date(2021, 6, 1);
    const addTimeCardTransaction = new AddTimeCardTransaction(employeeId, date, hours);
    addTimeCardTransaction.execute();

    const employee = gPayrollDatabase.getEmployee(employeeId)!;
    const timeCard = (employee.classification as HourlyClassification).getTimeCard(date);
    expect(timeCard).toBeDefined();
    expect(timeCard!.hours).toBe(hours);
  });
});
