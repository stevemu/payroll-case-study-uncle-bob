import { Reader } from './Reader.ts';
import { TransactionSource } from './TransactionSource.interface.ts';
import { Transaction } from './transaction/Transaction.interface.ts';
import * as Transactions from './transaction/index.ts'; // Assuming all transaction classes are exported from an index.ts file in the transaction folder

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
      default:
        throw new Error('Invalid transaction command');
    }
  }

  private createAddEmployeeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    const name = parts[2];
    const address = parts[3];
    const type = parts[4];
    const payRate = parseFloat(parts[5]);
    const commissionRate = type === 'C' ? parseFloat(parts[6]) : undefined;

    switch (type) {
      case 'H':
        // Here, payRate is interpreted as an hourly rate
        return new Transactions.AddHourlyEmployeeTransaction(empId, name, address, payRate);
      case 'S':
        // Here, payRate is interpreted as a monthly salary
        return new Transactions.AddSalariedEmployeeTransaction(empId, name, address, payRate);
      case 'C':
        // For commissioned employees, payRate is a monthly salary, and commissionRate is required
        if (commissionRate === undefined) {
          throw new Error('Commission rate must be provided for commissioned employee');
        }
        return new Transactions.AddCommissionedEmployeeTransaction(
          empId,
          name,
          address,
          payRate,
          commissionRate,
        );
      default:
        throw new Error('Invalid employee type');
    }
  }

  private createDeleteEmployeeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    return new Transactions.DeleteEmployeeTransaction(empId);
  }
}
