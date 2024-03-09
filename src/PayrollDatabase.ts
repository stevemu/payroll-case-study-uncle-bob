import { Employee, NullEmployee } from './employee/Employee.base';

export class PayrollDatabase {
  private employees: Map<number, Employee> = new Map();

  addEmployee(empId: number, employee: Employee): void {
    this.employees.set(empId, employee);
  }

  getEmployee(empId: number): Employee {
    return this.employees.get(empId) || new NullEmployee();
  }

  clear() {
    this.employees.clear();
  }
}

export const gpayrollDatabase = new PayrollDatabase();
