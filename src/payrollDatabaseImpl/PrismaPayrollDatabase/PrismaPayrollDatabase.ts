import { PrismaClient } from '@prisma/client';
import { Employee } from '../../payrollDomain/Employee.ts';
import { ClassificationDb, getClassificationType } from './ClassificationDb.ts';
import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.interface.ts';
import { UnionAffiliation } from '../../affiliation/union/UnionAffiliation.ts';
import { NoAffiliation } from '../../affiliation/noAffiliation/NoAffiliation.ts';
import { ServiceCharge } from '../../affiliation/union/ServiceCharge.ts';
import { PaymentMethodDb } from './PaymentMethodDb.ts';
import { BiweeklySchedule } from '../../schedules/BiweeklySchedule.ts';
import { MonthlySchedule } from '../../schedules/MonthlySchedule.ts';
import { WeeklySchedule } from '../../schedules/WeeklySchedule.ts';

/**
 * used by unit tests for PrismaPayrollDatabase and production code
 */

export class PrismaPayrollDatabase implements PayrollDatabase {
  private classificationDb: ClassificationDb;
  private paymentMethodDb: PaymentMethodDb;

  constructor(private prismaClient: PrismaClient) {
    this.classificationDb = new ClassificationDb(prismaClient);
    this.paymentMethodDb = new PaymentMethodDb(prismaClient);
  }

  async addEmployee(empId: number, employee: Employee): Promise<void> {
    await this.prismaClient.employee.create({
      data: {
        empId,
        name: employee.name,
        address: employee.address,
        classification: getClassificationType(employee),
        paymentSchedule: getPaymentScheduleType(employee),
      },
    });

    await this.classificationDb.saveClassification(empId, employee);
    await this.saveUnionMembership(employee);
    await this.paymentMethodDb.savePaymentMethod(employee);
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
        paymentSchedule: getPaymentScheduleType(employee),
      },
    });

    await this.classificationDb.saveClassification(employee.empId, employee);
    await this.saveUnionMembership(employee);
    await this.paymentMethodDb.savePaymentMethod(employee);
  }

  async saveUnionMembership(employee: Employee) {
    if (!(employee.affiliation instanceof UnionAffiliation)) {
      await this.prismaClient.unionMembership.deleteMany({
        where: {
          empId: employee.empId,
        },
      });
      return;
    }

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

    employee.method = await this.paymentMethodDb.getPaymentMethod(empId);

    employee.schedule = await this.getSchedule(empId);

    return employee;
  }

  private async getSchedule(empId: number) {
    const employeeModel = await this.prismaClient.employee.findUnique({
      where: {
        empId,
      },
    });

    if (!employeeModel) throw new Error('Employee not found');

    switch (employeeModel.paymentSchedule) {
      case 'monthly':
        return new MonthlySchedule();
      case 'weekly':
        return new WeeklySchedule();
      case 'biweekly':
        return new BiweeklySchedule();
      default:
        throw new Error('Invalid payment schedule');
    }
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
    await this.prismaClient.serviceCharge.deleteMany();
    await this.prismaClient.holdPaymentMethod.deleteMany();
    await this.prismaClient.mailPaymentMethod.deleteMany();
    await this.prismaClient.directPaymentMethod.deleteMany();
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
    await this.prismaClient.unionMembership.delete({
      where: {
        memberId,
      },
    });
  }

  async getAllEmployees(): Promise<Employee[]> {
    const employeeModels = (await this.prismaClient.employee.findMany()) || [];
    const employees: Employee[] = [];
    for (const employeeModel of employeeModels) {
      employees.push((await this.getEmployee(employeeModel.empId))!);
    }
    return employees;
  }
}

export type PaymentScheduleType = 'monthly' | 'weekly' | 'biweekly';

const getPaymentScheduleType = (emp: Employee): PaymentScheduleType => {
  if (emp.schedule instanceof MonthlySchedule) {
    return 'monthly';
  } else if (emp.schedule instanceof WeeklySchedule) {
    return 'weekly';
  } else if (emp.schedule instanceof BiweeklySchedule) {
    return 'biweekly';
  }

  throw new Error('Invalid schedule');
};
