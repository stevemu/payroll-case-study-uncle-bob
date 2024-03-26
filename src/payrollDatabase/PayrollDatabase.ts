import { Employee } from '../domain/Employee.ts';

export interface PayrollDatabase {
  addEmployee(empId: number, employee: Employee): Promise<void>;
  saveEmployee(employee: Employee): Promise<void>;
  getEmployee(empId: number): Promise<Employee | undefined>;
  deleteEmployee(empId: number): Promise<void>;
  clear(): Promise<void>;
  getUnionMember(memberId: number): Promise<Employee | undefined>;
  getAllEmployees(): Promise<Employee[]>;
}
