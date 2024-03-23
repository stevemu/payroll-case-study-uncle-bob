import { PrismaClient } from '@prisma/client';
import { SalariedClassification } from '../../classifications/SalariedClassification.ts';
import { CommissionedClassification } from '../../classifications/commissioned/CommissionedClassification.ts';
import { HourlyClassification } from '../../classifications/hourly/HourlyClassification.ts';
import { Employee } from '../../payrollDomain/employee/Employee.ts';
import { PaymentClassification } from '../../payrollDomain/Classification.abstract.ts';
import { TimeCard } from '../../classifications/hourly/TimeCard.ts';
import { SalesReceipt } from '../../classifications/commissioned/SalesReceipt.ts';

export class ClassificationDb {
  constructor(private prismaClient: PrismaClient) {}

  public async saveClassification(empId: number, employee: Employee) {
    if (employee.classification instanceof HourlyClassification) {
      await this.saveHourlyClassification(empId, employee);
    }

    if (employee.classification instanceof SalariedClassification) {
      await this.prismaClient.salariedClassification.upsert({
        where: {
          empId,
        },
        update: {
          salary: (employee.classification as SalariedClassification).salary,
        },
        create: {
          empId,
          salary: (employee.classification as SalariedClassification).salary,
        },
      });
    }

    if (employee.classification instanceof CommissionedClassification) {
      await this.saveCommissionedClassification(empId, employee);
    }
  }

  private async saveHourlyClassification(empId: number, employee: Employee) {
    await this.prismaClient.hourlyClassification.upsert({
      where: {
        empId,
      },
      update: {
        rate: (employee.classification as HourlyClassification).hourlyRate,
      },
      create: {
        empId,
        rate: (employee.classification as HourlyClassification).hourlyRate,
      },
    });
    const timeCards = (employee.classification as HourlyClassification).getTimeCards();
    for (const timeCard of timeCards) {
      await this.prismaClient.timeCard.upsert({
        where: {
          empId_date: {
            empId,
            date: timeCard.date,
          },
        },
        update: {
          hours: timeCard.hours,
        },
        create: {
          empId,
          date: timeCard.date,
          hours: timeCard.hours,
        },
      });
    }
  }

  async saveCommissionedClassification(empId: number, employee: Employee) {
    await this.prismaClient.commissionedClassification.upsert({
      where: {
        empId,
      },
      update: {
        salary: (employee.classification as CommissionedClassification).salary,
        commissionRate: (employee.classification as CommissionedClassification).commissionRate,
      },
      create: {
        empId,
        salary: (employee.classification as CommissionedClassification).salary,
        commissionRate: (employee.classification as CommissionedClassification).commissionRate,
      },
    });
    const salesReceipts = (
      employee.classification as CommissionedClassification
    ).getSalesReceipts();
    for (const salesReceipt of salesReceipts) {
      await this.prismaClient.salesReceipt.upsert({
        where: {
          empId_date: {
            empId,
            date: salesReceipt.date,
          },
        },
        update: {
          amount: salesReceipt.amount,
        },
        create: {
          empId,
          date: salesReceipt.date,
          amount: salesReceipt.amount,
        },
      });
    }
  }

  async getClassification(empId: number): Promise<PaymentClassification> {
    const employeModel = await this.prismaClient.employee.findUnique({
      where: {
        empId,
      },
    });
    const classificationType = employeModel!.classification as ClassificationType;

    if (classificationType === 'hourly') {
      return await this.getHourlyClassification(empId);
    }

    if (classificationType === 'salaried') {
      const salariedClassificationModel = await this.prismaClient.salariedClassification.findUnique(
        {
          where: {
            empId,
          },
        },
      );
      return new SalariedClassification(salariedClassificationModel!.salary);
    }

    if (classificationType === 'commissioned') {
      const cc = await this.getCommissionedClassification(empId);
      return cc;
    }

    throw new Error('Invalid classification');
  }

  private async getHourlyClassification(empId: number) {
    const hourlyClassificationModel = await this.prismaClient.hourlyClassification.findUnique({
      where: {
        empId,
      },
    });
    const hourlyClassification = new HourlyClassification(hourlyClassificationModel!.rate);
    const timeCards = await this.prismaClient.timeCard.findMany({
      where: {
        empId,
      },
    });
    for (const timeCard of timeCards) {
      hourlyClassification.addTimeCard(new TimeCard(timeCard.date, timeCard.hours));
    }
    return hourlyClassification;
  }

  private async getCommissionedClassification(empId: number) {
    const commissionedClassificationModel =
      await this.prismaClient.commissionedClassification.findUnique({
        where: {
          empId,
        },
      });
    const cc = new CommissionedClassification(
      commissionedClassificationModel!.salary,
      commissionedClassificationModel!.commissionRate,
    );

    const salesReceipts = await this.prismaClient.salesReceipt.findMany({
      where: {
        empId,
      },
    });
    for (const salesReceipt of salesReceipts) {
      cc.addSalesReceipt(new SalesReceipt(salesReceipt.date, salesReceipt.amount));
    }

    return cc;
  }
}

export type ClassificationType = 'hourly' | 'salaried' | 'commissioned';

export const getClassificationType = (emp: Employee): ClassificationType => {
  if (emp.classification instanceof HourlyClassification) {
    return 'hourly';
  } else if (emp.classification instanceof SalariedClassification) {
    return 'salaried';
  } else if (emp.classification instanceof CommissionedClassification) {
    return 'commissioned';
  }
  throw new Error('Invalid classification');
};
