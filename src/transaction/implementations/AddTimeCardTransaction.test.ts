import { gpayrollDatabase } from '@/src/PayrollDatabase';
import { AddTimeCardTransaction } from './AddTimeCardTransaction';
import { AddHourlyEmployeeTransaction } from './addEmployee/implementations/AddHourlyEmployeeTransaction';
import { HourlyClassification } from '@/src/classification/implementations/hourly/HourlyClassification';

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

    const addTimeCardTransaction = new AddTimeCardTransaction(employeeId, '2021-07-01', hours);
    addTimeCardTransaction.execute();

    const employee = gpayrollDatabase.getEmployee(employeeId);
    const timeCard = (employee.classification as HourlyClassification).getTimeCard('2021-07-01');
    expect(timeCard).toBeDefined();
    expect(timeCard.hours).toBe(hours);
  });
});
