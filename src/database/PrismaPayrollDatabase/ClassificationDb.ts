import { PrismaClient } from '@prisma/client';
import { SalariedClassification } from '../../paymentClassification/SalariedClassification.ts';
import { CommissionedClassification } from '../../paymentClassification/commissioned/CommissionedClassification.ts';
import { HourlyClassification } from '../../paymentClassification/hourly/HourlyClassification.ts';
import { Employee } from '../../Employee.ts';
import { PaymentClassification } from '../../paymentClassification/Classification.abstract.ts';

export class ClassificationDb {
  constructor(private prismaClient: PrismaClient) {}

  public async addClassification(empId: number, employee: Employee) {
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

  async getClassification(
    empId: number,
    classificationType: ClassificationType,
  ): Promise<PaymentClassification> {
    if (classificationType === 'hourly') {
      const hourlyClassificationModel = await this.prismaClient.hourlyClassification.findUnique({
        where: {
          empId,
        },
      });
      return new HourlyClassification(hourlyClassificationModel!.rate);
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
      const commissionedClassificationModel =
        await this.prismaClient.commissionedClassification.findUnique({
          where: {
            empId,
          },
        });
      return new CommissionedClassification(
        commissionedClassificationModel!.salary,
        commissionedClassificationModel!.commissionRate,
      );
    }

    throw new Error('Invalid classification');
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
