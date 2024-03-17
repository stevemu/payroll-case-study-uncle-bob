import { PrismaClient } from '@prisma/client';
import { Employee } from '../Employee.ts';
import { HourlyClassification } from '../paymentClassification/hourly/HourlyClassification.ts';
import { SalariedClassification } from '../paymentClassification/SalariedClassification.ts';

const prisma = new PrismaClient();

const getClassificationString = (emp: Employee) => {
  if (emp.classification instanceof HourlyClassification) {
    return 'hourly';
  }
  return 'salaried';
};

export class PrismaPayrollDatabase {
  private employees: Map<number, Employee> = new Map();
  private unionMembers: Map<number, Employee> = new Map();

  async addEmployee(empId: number, employee: Employee): Promise<void> {
    await prisma.employee.create({
      data: {
        empId,
        name: employee.name,
        address: employee.address,
        classification: getClassificationString(employee),
      },
    });

    if (employee.classification instanceof HourlyClassification) {
      await prisma.hourlyClassification.create({
        data: {
          empId,
          rate: employee.classification.hourlyRate,
        },
      });
    }

    if (employee.classification instanceof SalariedClassification) {
      await prisma.salariedClassification.create({
        data: {
          empId,
          salary: employee.classification.salary,
        },
      });
    }
  }

  async getEmployee(empId: number): Promise<Employee | undefined> {
    const employeRow = await prisma.employee.findUnique({
      where: {
        empId,
      },
    });

    if (!employeRow) return undefined;

    const employee = new Employee(employeRow.empId, employeRow.name, employeRow.address);

    if (employeRow.classification === 'hourly') {
      const hourlyClassificationRow = await prisma.hourlyClassification.findUnique({
        where: {
          empId,
        },
      });
      employee.classification = new HourlyClassification(hourlyClassificationRow!.rate);
    }

    if (employeRow.classification === 'salaried') {
      const salariedClassificationRow = await prisma.salariedClassification.findUnique({
        where: {
          empId,
        },
      });
      employee.classification = new SalariedClassification(salariedClassificationRow!.salary);
    }

    return employee;
  }

  async deleteEmployee(empId: number): Promise<void> {
    this.employees.delete(empId);
  }

  async clear() {
    await prisma.employee.deleteMany();
    await prisma.timeCard.deleteMany();
    await prisma.hourlyClassification.deleteMany();
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
