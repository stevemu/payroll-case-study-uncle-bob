import { Employee, NullEmployee } from './Employee';

export class PayrollDatabase {
  private employees: Map<number, Employee> = new Map();

  addEmployee(empId: number, employee: Employee): void {
    this.employees.set(empId, employee);
  }

  getEmployee(empId: number): Employee {
    return this.employees.get(empId) || new NullEmployee();
  }

  deleteEmployee(empId: number): void {
    this.employees.delete(empId);
  }

  clear() {
    this.employees.clear();
  }
}

export const gpayrollDatabase = new PayrollDatabase();
