import { Reader } from './Reader.ts';
import { TransactionSource } from './TransactionSource.interface.ts';
import { PayrollDatabase } from './database/index.ts';
import { Transaction } from './transaction/Transaction.interface.ts';
import * as Transactions from './transaction/index.ts';

export class TextParserTransactionSource implements TransactionSource {
  private reader: Reader = new Reader();

  constructor(private db: PayrollDatabase) {}

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
        return new Transactions.ChangeEmployeeNameTransaction(this.db, empId, name);
      case 'Address':
        const address = parts[3];
        return new Transactions.ChangeEmployeeAddressTransaction(this.db, empId, address);
      case 'Hourly':
        const hourlyRate = parseFloat(parts[3]);
        return new Transactions.ChangeHourlyTransaction(this.db, empId, hourlyRate);
      case 'Salaried': {
        const monthlySalary = parseFloat(parts[3]);
        return new Transactions.ChangeSalariedTransaction(this.db, empId, monthlySalary);
      }
      case 'Commissioned':
        const monthlySalary = parseFloat(parts[3]);
        const commissionRate = parseFloat(parts[4]);
        return new Transactions.ChangeCommissionedTransaction(
          this.db,
          empId,
          monthlySalary,
          commissionRate,
        );
      case 'Hold':
        return new Transactions.ChangeHoldTransaction(this.db, empId);
      case 'Direct':
        const bank = parts[3];
        const account = parts[4];
        return new Transactions.ChangeDirectTransaction(this.db, empId, bank, account);
      case 'Mail': {
        const address = parts[3];
        return new Transactions.ChangeMailTransaction(this.db, empId, address);
      }
      case 'Member':
        const memberId = parseInt(parts[3]);
        const dues = parseFloat(parts[5]);
        return new Transactions.ChangeMemberTransaction(this.db, empId, memberId, dues);
      case 'NoMember':
        return new Transactions.ChangeUnaffiliatedTransaction(this.db, empId);
      default:
        throw new Error('Invalid change employee type');
    }
  }

  private createPaydayTransaction(parts: string[]): Transaction {
    const date = parseYyyymmdd(parts[1]);
    return new Transactions.PayTransaction(this.db, date);
  }

  private createServiceChargeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const amount = parseFloat(parts[3]);
    return new Transactions.AddServiceChargeTransaction(this.db, empId, date, amount);
  }

  private createSalesReceiptTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const amount = parseFloat(parts[3]);
    return new Transactions.SalesReceiptTransaction(this.db, empId, date, amount);
  }

  private createTimeCardTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const hours = parseFloat(parts[3]);
    return new Transactions.AddTimeCardTransaction(this.db, empId, date, hours);
  }

  private createAddEmployeeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const name = parts[2];
    const address = parts[3];
    const type = parts[4];

    switch (type) {
      case 'H': {
        const hourlyRate = parseFloat(parts[5]);
        return new Transactions.AddHourlyEmployeeTransaction(
          this.db,
          empId,
          name,
          address,
          hourlyRate,
        );
      }
      case 'S': {
        const monthlySalary = parseFloat(parts[5]);
        return new Transactions.AddSalariedEmployeeTransaction(
          this.db,
          empId,
          name,
          address,
          monthlySalary,
        );
      }
      case 'C': {
        const monthlySalary = parseFloat(parts[5]);
        if (!parts[6]) {
          throw new Error('Commission rate must be provided for commissioned employee');
        }
        const commissionRate = parseFloat(parts[6]);
        return new Transactions.AddCommissionedEmployeeTransaction(
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
    return new Transactions.DeleteEmployeeTransaction(this.db, empId);
  }
}

const parseYyyymmdd = (date: string): Date => {
  const parts = date.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
};
