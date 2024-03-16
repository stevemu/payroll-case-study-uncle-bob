import { Employee } from '../Employee.ts';

export class PayrollDatabase {
  private employees: Map<number, Employee> = new Map();
  private unionMembers: Map<number, Employee> = new Map();

  addEmployee(empId: number, employee: Employee): void {
    this.employees.set(empId, employee);
  }

  getEmployee(empId: number): Employee | undefined {
    return this.employees.get(empId);
  }

  deleteEmployee(empId: number): void {
    this.employees.delete(empId);
  }

  clear() {
    this.employees.clear();
  }

  getUnionMember(memberId: number): Employee | undefined {
    return this.unionMembers.get(memberId);
  }

  addUnionMember(memberId: number, employee: Employee) {
    this.unionMembers.set(memberId, employee);
  }

  deleteUnionMember(memberId: number) {
    this.unionMembers.delete(memberId);
  }

  getAllEmployees(): Employee[] {
    return Array.from(this.employees.values());
  }
}

export const gPayrollDatabase = new PayrollDatabase();
