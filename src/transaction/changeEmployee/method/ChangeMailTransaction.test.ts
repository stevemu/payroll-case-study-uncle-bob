import { gPayrollDatabase } from '../../../PayrollDatabase.ts';
import { MailMethod } from '../../../method/MailMethod.ts';
import { AddHourlyEmployeeTransaction } from '../../addEmployee/AddHourlyEmployeeTransaction.ts';
import { ChangeMailTransaction } from './ChangeMailTransaction.ts';

describe('ChangeMailTransaction', () => {
  it('should change to mail method', () => {
    const empId = 1;
    const addEmp = new AddHourlyEmployeeTransaction(empId, 'Bob', 'Home', 27.52);
    addEmp.execute();

    const changeMail = new ChangeMailTransaction(empId, 'Mail');
    changeMail.execute();

    const employee = gPayrollDatabase.getEmployee(empId);
    expect(employee!.method).toBeInstanceOf(MailMethod);
    expect((employee!.method as MailMethod).address).toBe('Mail');
  });
});
