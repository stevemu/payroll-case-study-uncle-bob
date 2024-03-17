import { PrismaClient } from '@prisma/client';
import { Employee } from '../Employee.ts';
import { HourlyClassification } from '../paymentClassification/hourly/HourlyClassification.ts';
import { SalariedClassification } from '../paymentClassification/SalariedClassification.ts';
import { CommissionedClassification } from '../paymentClassification/commissioned/CommissionedClassification.ts';

/**
 * used by unit tests for PrismaPayrollDatabase and production code
 */

const getClassificationString = (emp: Employee) => {
  if (emp.classification instanceof HourlyClassification) {
    return 'hourly';
  } else if (emp.classification instanceof SalariedClassification) {
    return 'salaried';
  } else if (emp.classification instanceof CommissionedClassification) {
    return 'commissioned';
  }
  throw new Error('Invalid classification');
};

export class PrismaPayrollDatabase {
  private employees: Map<number, Employee> = new Map();
  private unionMembers: Map<number, Employee> = new Map();

  constructor(private prismaClient: PrismaClient) {}

  async addEmployee(empId: number, employee: Employee): Promise<void> {
    await this.prismaClient.employee.create({
      data: {
        empId,
        name: employee.name,
        address: employee.address,
        classification: getClassificationString(employee),
      },
    });

    if (employee.classification instanceof HourlyClassification) {
      await this.prismaClient.hourlyClassification.create({
        data: {
          empId,
          rate: employee.classification.hourlyRate,
        },
      });
    }

    if (employee.classification instanceof SalariedClassification) {
      await this.prismaClient.salariedClassification.create({
        data: {
          empId,
          salary: employee.classification.salary,
        },
      });
    }

    if (employee.classification instanceof CommissionedClassification) {
      await this.prismaClient.commissionedClassification.create({
        data: {
          empId,
          salary: employee.classification.salary,
          commissionRate: employee.classification.commissionRate,
        },
      });
    }
  }

  async getEmployee(empId: number): Promise<Employee | undefined> {
    const employeRow = await this.prismaClient.employee.findUnique({
      where: {
        empId,
      },
    });

    if (!employeRow) return undefined;

    const employee = new Employee(employeRow.empId, employeRow.name, employeRow.address);

    if (employeRow.classification === 'hourly') {
      const hourlyClassificationRow = await this.prismaClient.hourlyClassification.findUnique({
        where: {
          empId,
        },
      });
      employee.classification = new HourlyClassification(hourlyClassificationRow!.rate);
    }

    if (employeRow.classification === 'salaried') {
      const salariedClassificationRow = await this.prismaClient.salariedClassification.findUnique({
        where: {
          empId,
        },
      });
      employee.classification = new SalariedClassification(salariedClassificationRow!.salary);
    }

    if (employeRow.classification === 'commissioned') {
      const commissionedClassificationRow =
        await this.prismaClient.commissionedClassification.findUnique({
          where: {
            empId,
          },
        });
      employee.classification = new CommissionedClassification(
        commissionedClassificationRow!.salary,
        commissionedClassificationRow!.commissionRate,
      );
    }

    return employee;
  }

  async deleteEmployee(empId: number): Promise<void> {
    this.employees.delete(empId);
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
