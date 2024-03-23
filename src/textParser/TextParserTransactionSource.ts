import { Reader } from '../utils/Reader.ts';
import { AddServiceChargeTransaction } from '../affiliation/transactions/AddServiceChargeTransaction.ts';
import { ChangeMemberTransaction } from '../affiliation/transactions/ChangeMemberTransaction.ts';
import { ChangeUnaffiliatedTransaction } from '../affiliation/transactions/ChangeUnaffiliatedTransaction.ts';
import { TransactionSource } from '../payrollApp/TransactionSource.interface.ts';
import { AddTimeCardTransaction } from '../classifications/transactions/AddTimeCardTransaction.ts';
import { ChangeCommissionedTransaction } from '../classifications/transactions/ChangeCommissionedTransaction.ts';
import { ChangeHourlyTransaction } from '../classifications/transactions/ChangeHourlyTransaction.ts';
import { ChangeSalariedTransaction } from '../classifications/transactions/ChangeSalariedTransaction.ts';
import { SalesReceiptTransaction } from '../classifications/transactions/SalesReceiptTransaction.ts';
import { AddCommissionedEmployeeTransaction } from '../classifications/transactions/addEmployee/AddCommissionedEmployeeTransaction.ts';
import { AddHourlyEmployeeTransaction } from '../classifications/transactions/addEmployee/AddHourlyEmployeeTransaction.ts';
import { AddSalariedEmployeeTransaction } from '../classifications/transactions/addEmployee/AddSalariedEmployeeTransaction.ts';
import { PayrollDatabase } from '../payrollDatabase/PayrollDatabase.interface.ts';
import { ChangeDirectTransaction } from '../methods/transactions/ChangeDirectTransaction.ts';
import { ChangeHoldTransaction } from '../methods/transactions/ChangeHoldTransaction.ts';
import { ChangeMailTransaction } from '../methods/transactions/ChangeMailTransaction.ts';
import { Transaction } from '../payrollDomain/Transaction.interface.ts';
import { ChangeEmployeeAddressTransaction } from '../payrollDomain/employee/transactions/changeEmployee/ChangeEmployeeAddressTransaction.ts';
import { ChangeEmployeeNameTransaction } from '../payrollDomain/employee/transactions/changeEmployee/ChangeEmployeeNameTransaction.ts';
import { DeleteEmployeeTransaction } from '../payrollDomain/employee/transactions/DeleteEmployeeTransaction.ts';
import { PayTransaction } from '../payrollDomain/employee/transactions/PayTransaction.ts';

export class TextParserTransactionSource extends PayrollApplication implements TransactionSource {
  private reader: Reader = new Reader();

  constructor(private db: PayrollDatabase) {
    super();
  }

  async getTransaction(): Promise<Transaction> {
    const line = await this.reader.readLine('Enter transaction: ');
    const parts = line.split(' ');
    const command = parts[0];

    switch (command) {
      case 'AddEmp':
        return this.createAddEmployeeTransaction(parts);
      case 'DelEmp':
        return this.createDeleteEmployeeTransaction(parts);
      case 'TimeCard':
        return this.createTimeCardTransaction(parts);
      case 'SalesReceipt':
        return this.createSalesReceiptTransaction(parts);
      case 'ServiceCharge':
        return this.createServiceChargeTransaction(parts);
      case 'ChgEmp':
        return this.createChangeEmployeeTransaction(parts);
      case 'Payday':
        return this.createPaydayTransaction(parts);
      default:
        throw new Error('Invalid transaction command');
    }
  }

  private createChangeEmployeeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const type = parts[2];

    switch (type) {
      case 'Name':
        const name = parts[3];
        return new ChangeEmployeeNameTransaction(this.db, empId, name);
      case 'Address':
        const address = parts[3];
        return new ChangeEmployeeAddressTransaction(this.db, empId, address);
      case 'Hourly':
        const hourlyRate = parseFloat(parts[3]);
        return new ChangeHourlyTransaction(this.db, empId, hourlyRate);
      case 'Salaried': {
        const monthlySalary = parseFloat(parts[3]);
        return new ChangeSalariedTransaction(this.db, empId, monthlySalary);
      }
      case 'Commissioned':
        const monthlySalary = parseFloat(parts[3]);
        const commissionRate = parseFloat(parts[4]);
        return new ChangeCommissionedTransaction(this.db, empId, monthlySalary, commissionRate);
      case 'Hold': {
        const address = parts[3];
        return new ChangeHoldTransaction(this.db, empId, address);
      }
      case 'Direct':
        const bank = parts[3];
        const account = parts[4];
        return new ChangeDirectTransaction(this.db, empId, bank, account);
      case 'Mail': {
        const address = parts[3];
        return new ChangeMailTransaction(this.db, empId, address);
      }
      case 'Member':
        const memberId = parseInt(parts[3]);
        const dues = parseFloat(parts[5]);
        return new ChangeMemberTransaction(this.db, empId, memberId, dues);
      case 'NoMember':
        return new ChangeUnaffiliatedTransaction(this.db, empId);
      default:
        throw new Error('Invalid change employee type');
    }
  }

  private createPaydayTransaction(parts: string[]): Transaction {
    const date = parseYyyymmdd(parts[1]);
    return new PayTransaction(this.db, date);
  }

  private createServiceChargeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const amount = parseFloat(parts[3]);
    return new AddServiceChargeTransaction(this.db, empId, date, amount);
  }

  private createSalesReceiptTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const amount = parseFloat(parts[3]);
    return new SalesReceiptTransaction(this.db, empId, date, amount);
  }

  private createTimeCardTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const hours = parseFloat(parts[3]);
    return new AddTimeCardTransaction(this.db, empId, date, hours);
  }

  private createAddEmployeeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const name = parts[2];
    const address = parts[3];
    const type = parts[4];

    switch (type) {
      case 'H': {
        const hourlyRate = parseFloat(parts[5]);
        return new AddHourlyEmployeeTransaction(this.db, empId, name, address, hourlyRate);
      }
      case 'S': {
        const monthlySalary = parseFloat(parts[5]);
        return new AddSalariedEmployeeTransaction(this.db, empId, name, address, monthlySalary);
      }
      case 'C': {
        const monthlySalary = parseFloat(parts[5]);
        if (!parts[6]) {
          throw new Error('Commission rate must be provided for commissioned employee');
        }
        const commissionRate = parseFloat(parts[6]);
        return new AddCommissionedEmployeeTransaction(
          this.db,
          empId,
          name,
          address,
          monthlySalary,
          commissionRate,
        );
      }
      default:
        throw new Error('Invalid employee type');
    }
  }

  private createDeleteEmployeeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    return new DeleteEmployeeTransaction(this.db, empId);
  }
}

const parseYyyymmdd = (date: string): Date => {
  const parts = date.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
};

import { PrismaClient } from '@prisma/client';
import { PrismaPayrollDatabase } from '../payrollDatabaseImpl/PrismaPayrollDatabase/index.ts';
import { config } from '../../configs/prod.config.ts';
import { PayrollApplication } from '../payrollApp/PayrollApplication.abstract.ts';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });
const db: PayrollDatabase = new PrismaPayrollDatabase(prisma);

const source = new TextParserTransactionSource(db);
source.run();
