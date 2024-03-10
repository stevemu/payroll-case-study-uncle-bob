import { gpayrollDatabase } from '@/src/PayrollDatabase';
import { MailMethod } from '@/src/method/MailMethod';
import { AddHourlyEmployeeTransaction } from '../../addEmployee/implementations/AddHourlyEmployeeTransaction';
import { ChangeMailTransaction } from './ChangeMailTransaction';

describe('ChangeMailTransaction', () => {
  it('should change to mail method', () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 27.52);
    addEmp.execute();

    const changeMail = new ChangeMailTransaction(empId, 'Mail');
    changeMail.execute();

    const employee = gpayrollDatabase.getEmployee(empId);
    expect(employee.method).toBeInstanceOf(MailMethod);
    expect((employee.method as MailMethod).address).toBe('Mail');
  });
});
