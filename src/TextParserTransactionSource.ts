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
    const name = parts[2].replace(/"/g, ''); // Assuming name is enclosed in quotes
    const address = parts[3].replace(/"/g, ''); // Assuming address is enclosed in quotes
    const type = parts[4];
    const salary = parseFloat(parts[5]);
    const commissionRate = type === 'C' ? parseFloat(parts[6]) : undefined;

    switch (type) {
      case 'H':
        return new Transactions.AddHourlyEmployeeTransaction(empId, name, address, salary);
      case 'S':
        return new Transactions.AddSalariedEmployeeTransaction(empId, name, address, salary);
      case 'C':
        if (commissionRate === undefined) {
          throw new Error('Commission rate must be provided for commissioned employee');
        }
        return new Transactions.AddCommissionedEmployeeTransaction(empId, name, address, salary, commissionRate);
      default:
        throw new Error('Invalid employee type');
    }
  }

  private createDeleteEmployeeTransaction(parts: string[]): Transaction {
    const empId = parseInt(parts[1]);
    return new Transactions.DeleteEmployeeTransaction(empId);
  }
}
