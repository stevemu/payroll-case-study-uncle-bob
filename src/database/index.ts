import { TestPayrollDatabase } from './TestPayrollDatabase';
import { PayrollDatabase } from './PayrollDatabase';
import { Employee } from '../Employee';

interface TPayrollDatabase {
  addEmployee(empId: number, employee: Employee): Promise<void>;
  getEmployee(empId: number): Promise<Employee | undefined>;
  deleteEmployee(empId: number): Promise<void>;
  clear(): Promise<void>;
  getUnionMember(memberId: number): Promise<Employee | undefined>;
  addUnionMember(memberId: number, employee: Employee): Promise<void>;
  deleteUnionMember(memberId: number): Promise<void>;
  getAllEmployees(): Promise<Employee[]>;
}

export const gPayrollDatabase: TPayrollDatabase =
  process.env.NODE_ENV === 'test' ? new TestPayrollDatabase() : new PayrollDatabase();
