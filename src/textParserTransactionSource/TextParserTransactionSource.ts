import { Reader } from '../utils/Reader.ts';
import { TransactionSource } from '../transactionApplication/TransactionSource.ts';
import { Transaction } from '../transactionApplication/Transaction.ts';
import { TransactionFactory } from '../transactionFactory/TransactionFactory.ts';

export class TextParserTransactionSource implements TransactionSource {
  private reader: Reader = new Reader();

  constructor(private transactionFactory: TransactionFactory) {}

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
        return this.transactionFactory.makeChangeNameTransaction(empId, name);
      case 'Address':
        const address = parts[3];
        return this.transactionFactory.makeChangeAddressTransaction(empId, address);
      case 'Hourly':
        const hourlyRate = parseFloat(parts[3]);
        return this.transactionFactory.makeChangeHourlyTransaction(empId, hourlyRate);
      case 'Salaried': {
        const monthlySalary = parseFloat(parts[3]);
        return this.transactionFactory.makeChangeSalariedTransaction(empId, monthlySalary);
      }
      case 'Commissioned':
        const monthlySalary = parseFloat(parts[3]);
        const commissionRate = parseFloat(parts[4]);
        return this.transactionFactory.makeChangeCommissionedTransaction(
          empId,
          monthlySalary,
          commissionRate,
        );
      case 'Hold': {
        const address = parts[3];
        return this.transactionFactory.makeChangeHoldTransaction(empId, address);
      }
      case 'Direct':
        const bank = parts[3];
        const account = parts[4];
        return this.transactionFactory.makeChangeDirectTransaction(empId, bank, account);
      case 'Mail': {
        const address = parts[3];
        return this.transactionFactory.makeChangeMailTransaction(empId, address);
      }
      case 'Member':
        const memberId = parseInt(parts[3]);
        const dues = parseFloat(parts[5]);
        return this.transactionFactory.makeChangeMemberTransaction(empId, memberId, dues);
      case 'NoMember':
        return this.transactionFactory.makeChangeUnaffiliatedTransaction(empId);
      default:
        throw new Error('Invalid change employee type');
    }
  }

  private createPaydayTransaction(parts: string[]): Transaction {
    const date = parseYyyymmdd(parts[1]);
    return this.transactionFactory.makePaydayTransaction(date);
  }

  private createServiceChargeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const amount = parseFloat(parts[3]);
    return this.transactionFactory.makeServiceChargeTransaction(empId, date, amount);
  }

  private createSalesReceiptTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const amount = parseFloat(parts[3]);
    return this.transactionFactory.makeSalesReceiptTransaction(empId, date, amount);
  }

  private createTimeCardTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const date = parseYyyymmdd(parts[2]);
    const hours = parseFloat(parts[3]);
    return this.transactionFactory.makeTimeCardTransaction(empId, date, hours);
  }

  private createAddEmployeeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const name = parts[2];
    const address = parts[3];
    const type = parts[4];

    switch (type) {
      case 'H': {
        const hourlyRate = parseFloat(parts[5]);
        return this.transactionFactory.makeAddHourlyEmployeeTransaction(
          empId,
          name,
          address,
          hourlyRate,
        );
      }
      case 'S': {
        const monthlySalary = parseFloat(parts[5]);
        return this.transactionFactory.makeAddSalariedEmployeeTransaction(
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
        return this.transactionFactory.makeAddCommissionedEmployeeTransaction(
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
    return this.transactionFactory.makeDeleteEmployeeTransaction(empId);
  }
}

const parseYyyymmdd = (date: string): Date => {
  const parts = date.split('-');
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
};
