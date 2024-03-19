import { PrismaClient } from '@prisma/client';
import { Employee } from '../../Employee.ts';
import { ClassificationDb, getClassificationType } from './ClassificationDb.ts';
import { PayrollDatabase } from '../index.ts';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation.ts';
import { NoAffiliation } from '../../affiliation/noAffiliation/NoAffiliation.ts';
import { ServiceCharge } from '../../affiliation/union/ServiceCharge.ts';

/**
 * used by unit tests for PrismaPayrollDatabase and production code
 */

export class PrismaPayrollDatabase implements PayrollDatabase {
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

    await this.classificationDb.saveClassification(empId, employee);
    await this.saveUnionMembership(employee);
  }

  async saveEmployee(employee: Employee): Promise<void> {
    await this.prismaClient.employee.update({
      where: {
        empId: employee.empId,
      },
      data: {
        name: employee.name,
        address: employee.address,
        classification: getClassificationType(employee),
      },
    });

    await this.classificationDb.saveClassification(employee.empId, employee);
    await this.saveUnionMembership(employee);
  }

  async saveUnionMembership(employee: Employee) {
    if (!(employee.affiliation instanceof UnionAffiliation)) return;

    await this.prismaClient.unionMembership.upsert({
      where: {
        memberId: employee.affiliation.memberId,
      },
      update: {
        empId: employee.empId,
        dues: employee.affiliation.dues,
      },
      create: {
        memberId: employee.affiliation.memberId,
        empId: employee.empId,
        dues: employee.affiliation.dues,
      },
    });

    await this.saveServiceCharges(employee);
  }

  private async saveServiceCharges(employee: Employee) {
    if (!(employee.affiliation instanceof UnionAffiliation)) return;

    const serviceCharges = employee.affiliation.getServiceCharges();
    for (const serviceCharge of serviceCharges) {
      await this.prismaClient.serviceCharge.upsert({
        where: {
          memberId_date: {
            date: serviceCharge.date,
            memberId: employee.affiliation.memberId,
          },
        },
        update: {
          amount: serviceCharge.amount,
        },
        create: {
          date: serviceCharge.date,
          memberId: employee.affiliation.memberId,
          amount: serviceCharge.amount,
        },
      });
    }
  }

  async getEmployee(empId: number): Promise<Employee | undefined> {
    const employeModel = await this.prismaClient.employee.findUnique({
      where: {
        empId,
      },
    });

    if (!employeModel) return undefined;

    const employee = new Employee(employeModel.empId, employeModel.name, employeModel.address);

    employee.classification = await this.classificationDb.getClassification(empId);

    employee.affiliation = await this.getAffiliation(employee);

    return employee;
  }

  private async getAffiliation(employee: Employee) {
    const unionMembershipModel = await this.prismaClient.unionMembership.findFirst({
      where: {
        empId: employee.empId,
      },
    });
    if (unionMembershipModel) {
      const unionAffiliation = new UnionAffiliation(
        unionMembershipModel.memberId,
        unionMembershipModel.dues,
      );
      unionAffiliation.addServiceCharges(
        await this.getServiceCharges(unionMembershipModel.memberId),
      );
      return unionAffiliation;
    }
    return new NoAffiliation();
  }

  private async getServiceCharges(memberId: number) {
    const serviceCharges = await this.prismaClient.serviceCharge.findMany({
      where: {
        memberId,
      },
    });
    return serviceCharges.map(
      (serviceCharge) => new ServiceCharge(serviceCharge.date, serviceCharge.amount),
    );
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
    await this.prismaClient.salesReceipt.deleteMany();
    await this.prismaClient.unionMembership.deleteMany();
  }

  async getUnionMember(memberId: number): Promise<Employee | undefined> {
    const unionMembershipModel = await this.prismaClient.unionMembership.findFirst({
      where: {
        memberId,
      },
    });
    if (!unionMembershipModel) return undefined;
    return await this.getEmployee(unionMembershipModel.empId);
  }

  async addUnionMember(memberId: number, employee: Employee) {
    await this.saveUnionMembership(employee);
  }

  async deleteUnionMember(memberId: number) {
    this.unionMembers.delete(memberId);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }
}
