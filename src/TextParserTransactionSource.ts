import { Reader } from './Reader.ts';
import { TransactionSource } from './TransactionSource.interface.ts';
import { Transaction } from './transaction/Transaction.interface.ts';
import * as Transactions from './transaction/index.ts';

export class TextParserTransactionSource implements TransactionSource {
  private reader: Reader = new Reader();

  constructor() {}

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
        return new Transactions.ChangeEmployeeNameTransaction(empId, name);
      case 'Address':
        const address = parts[3];
        return new Transactions.ChangeEmployeeAddressTransaction(empId, address);
      case 'Hourly':
        const hourlyRate = parseFloat(parts[3]);
        return new Transactions.ChangeHourlyTransaction(empId, hourlyRate);
      case 'Salaried': {
        const monthlySalary = parseFloat(parts[3]);
        return new Transactions.ChangeSalariedTransaction(empId, monthlySalary);
      }
      case 'Commissioned':
        const monthlySalary = parseFloat(parts[3]);
        const commissionRate = parseFloat(parts[4]);
        return new Transactions.ChangeCommissionedTransaction(empId, monthlySalary, commissionRate);
      case 'Hold':
        return new Transactions.ChangeHoldTransaction(empId);
      case 'Direct':
        const bank = parts[3];
        const account = parts[4];
        return new Transactions.ChangeDirectTransaction(empId, bank, account);
      case 'Mail': {
        const address = parts[3];
        return new Transactions.ChangeMailTransaction(empId, address);
      }
      case 'Member':
        const memberId = parseInt(parts[3]);
        const dues = parseFloat(parts[4]);
        return new Transactions.ChangeMemberTransaction(empId, memberId, dues);
      case 'NoMember':
        return new Transactions.ChangeUnaffiliatedTransaction(empId);
      default:
        throw new Error('Invalid change employee type');
    }
  }

  private createPaydayTransaction(parts: string[]): Transaction {
    const date = parseYyyymmdd(parts[1]);
    return new Transactions.PayTransaction(date);
  }

  private createServiceChargeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const amount = parseFloat(parts[3]);
    return new Transactions.AddServiceChargeTransaction(empId, date, amount);
  }

  private createSalesReceiptTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const amount = parseFloat(parts[3]);
    return new Transactions.SalesReceiptTransaction(empId, date, amount);
  }

  private createTimeCardTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const hours = parseFloat(parts[3]);
    return new Transactions.AddTimeCardTransaction(empId, date, hours);
  }

  private createAddEmployeeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const name = parts[2];
    const address = parts[3];
    const type = parts[4];

    switch (type) {
      case 'H': {
        const hourlyRate = parseFloat(parts[5]);
        return new Transactions.AddHourlyEmployeeTransaction(empId, name, address, hourlyRate);
      }
      case 'S': {
        const monthlySalary = parseFloat(parts[5]);
        return new Transactions.AddSalariedEmployeeTransaction(empId, name, address, monthlySalary);
      }
      case 'C': {
        const monthlySalary = parseFloat(parts[5]);
        if (!parts[6]) {
          throw new Error('Commission rate must be provided for commissioned employee');
        }
        const commissionRate = parseFloat(parts[6]);
        return new Transactions.AddCommissionedEmployeeTransaction(
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
    return new Transactions.DeleteEmployeeTransaction(empId);
  }
}

const parseYyyymmdd = (date: string): Date => {
  const parts = date.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
};
