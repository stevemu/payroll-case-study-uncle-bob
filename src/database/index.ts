import { Employee } from '../Employee.ts';

export interface PayrollDatabase {
  addEmployee(empId: number, employee: Employee): Promise<void>;
  saveEmployee(employee: Employee): Promise<void>;
  getEmployee(empId: number): Promise<Employee | undefined>;
  deleteEmployee(empId: number): Promise<void>;
  clear(): Promise<void>;
  getUnionMember(memberId: number): Promise<Employee | undefined>;
  addUnionMember(memberId: number, employee: Employee): Promise<void>;
  deleteUnionMember(memberId: number): Promise<void>;
  getAllEmployees(): Promise<Employee[]>;
}

// to be removed. currently used by transaction tests
// export const gPayrollDatabase: PayrollDatabase = new MapPayrollDatabase();
