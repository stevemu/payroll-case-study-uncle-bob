import { PrismaClient } from '@prisma/client';
import { Employee } from '../../payrollDomain/Employee.ts';
import { HoldMethod } from '../../methods/HoldMethod.ts';
import { MailMethod } from '../../methods/MailMethod.ts';
import { DirectMethod } from '../../methods/DirectMethod.ts';

export class PaymentMethodDb {
  constructor(private prismaClient: PrismaClient) {}

  public async savePaymentMethod(employee: Employee) {
    const paymentMethodType = getPaymentMethodType(employee);

    await this.prismaClient.employee.update({
      where: {
        empId: employee.empId,
      },
      data: {
        paymentMethod: paymentMethodType,
      },
    });

    if (employee.method instanceof HoldMethod) {
      await this.prismaClient.holdPaymentMethod.upsert({
        where: {
          empId: employee.empId,
        },
        update: {
          address: employee.method.address,
        },
        create: {
          empId: employee.empId,
          address: employee.method.address,
        },
      });
    } else if (employee.method instanceof MailMethod) {
      await this.prismaClient.mailPaymentMethod.upsert({
        where: {
          empId: employee.empId,
        },
        update: {
          address: employee.method.address,
        },
        create: {
          empId: employee.empId,
          address: employee.method.address,
        },
      });
    } else if (employee.method instanceof DirectMethod) {
      await this.prismaClient.directPaymentMethod.upsert({
        where: {
          empId: employee.empId,
        },
        update: {
          bank: employee.method.bank,
          account: employee.method.account,
        },
        create: {
          empId: employee.empId,
          bank: employee.method.bank,
          account: employee.method.account,
        },
      });
    }
  }

  public async getPaymentMethod(empId: number): Promise<HoldMethod | MailMethod | DirectMethod> {
    const employeeModel = await this.prismaClient.employee.findUnique({
      where: {
        empId,
      },
    });
    const paymentMethodType = employeeModel!.paymentMethod;
    if (paymentMethodType === 'hold') {
      const holdMethodModel = await this.prismaClient.holdPaymentMethod.findUnique({
        where: {
          empId,
        },
      });
      return new HoldMethod(holdMethodModel!.address);
    } else if (paymentMethodType === 'mail') {
      const mailMethodModel = await this.prismaClient.mailPaymentMethod.findUnique({
        where: {
          empId,
        },
      });
      return new MailMethod(mailMethodModel!.address);
    } else if (paymentMethodType === 'direct') {
      const directMethodModel = await this.prismaClient.directPaymentMethod.findUnique({
        where: {
          empId,
        },
      });
      return new DirectMethod(directMethodModel!.bank, directMethodModel!.account);
    }

    throw new Error('Invalid payment method');
  }
}

export type PaymentMethodType = 'hold' | 'mail' | 'direct';

export const getPaymentMethodType = (emp: Employee): PaymentMethodType => {
  if (emp.method instanceof HoldMethod) {
    return 'hold';
  } else if (emp.method instanceof MailMethod) {
    return 'mail';
  } else if (emp.method instanceof DirectMethod) {
    return 'direct';
  }

  throw new Error('Invalid classification');
};
