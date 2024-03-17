import { PrismaClient } from '@prisma/client';
import { Employee } from '../../Employee.ts';
import { ClassificationDb, ClassificationType, getClassificationType } from './ClassificationDb.ts';

/**
 * used by unit tests for PrismaPayrollDatabase and production code
 */

export class PrismaPayrollDatabase {
  private employees: Map<number, Employee> = new Map();
  private unionMembers: Map<number, Employee> = new Map();
  private classificationDb: ClassificationDb;

  constructor(private prismaClient: PrismaClient) {
    this.classificationDb = new ClassificationDb(prismaClient);
  }

  async addEmployee(empId: number, employee: Employee): Promise<void> {
    await this.prismaClient.employee.create({
      data: {
        empId,
        name: employee.name,
        address: employee.address,
        classification: getClassificationType(employee),
      },
    });

    await this.classificationDb.addClassification(empId, employee);
  }

  async getEmployee(empId: number): Promise<Employee | undefined> {
    const employeModel = await this.prismaClient.employee.findUnique({
      where: {
        empId,
      },
    });

    if (!employeModel) return undefined;

    const employee = new Employee(employeModel.empId, employeModel.name, employeModel.address);

    employee.classification = await this.classificationDb.getClassification(
      empId,
      employeModel.classification as ClassificationType,
    );

    return employee;
  }

  async deleteEmployee(empId: number): Promise<void> {
    await this.prismaClient.employee.delete({
      where: {
        empId,
      },
    });
  }

  async clear() {
    await this.prismaClient.employee.deleteMany();
    await this.prismaClient.timeCard.deleteMany();
    await this.prismaClient.hourlyClassification.deleteMany();
    await this.prismaClient.commissionedClassification.deleteMany();
    await this.prismaClient.salariedClassification.deleteMany();
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
