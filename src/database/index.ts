import { MapPayrollDatabase } from './MapPayrollDatabase';
import { PrismaPayrollDatabase } from './PrismaPayrollDatabase';
import { Employee } from '../Employee';

export interface PayrollDatabase {
  addEmployee(empId: number, employee: Employee): Promise<void>;
  getEmployee(empId: number): Promise<Employee | undefined>;
  deleteEmployee(empId: number): Promise<void>;
  clear(): Promise<void>;
  getUnionMember(memberId: number): Promise<Employee | undefined>;
  addUnionMember(memberId: number, employee: Employee): Promise<void>;
  deleteUnionMember(memberId: number): Promise<void>;
  getAllEmployees(): Promise<Employee[]>;
}

export const gPayrollDatabase: PayrollDatabase =
  process.env.NODE_ENV === 'test' ? new MapPayrollDatabase() : new PrismaPayrollDatabase();
