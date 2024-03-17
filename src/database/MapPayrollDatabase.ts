import { Employee } from '../Employee.js';

export class MapPayrollDatabase {
  private employees: Map<number, Employee> = new Map();
  private unionMembers: Map<number, Employee> = new Map();

  async addEmployee(empId: number, employee: Employee): Promise<void> {
    this.employees.set(empId, employee);
  }

  async getEmployee(empId: number): Promise<Employee | undefined> {
    return this.employees.get(empId);
  }

  async deleteEmployee(empId: number): Promise<void> {
    this.employees.delete(empId);
  }

  async clear() {
    this.employees.clear();
  }

  async getUnionMember(memberId: number): Promise<Employee | undefined> {
    return this.unionMembers.get(memberId);
  }

  async addUnionMember(memberId: number, employee: Employee) {
    this.unionMembers.set(memberId, employee);
  }

  async deleteUnionMember(memberId: number) {
    this.unionMembers.delete(memberId);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }
}
