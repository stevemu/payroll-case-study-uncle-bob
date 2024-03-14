import { Reader } from './Reader';
import { TransactionSource } from './TransactionSource.interface';
import { Transaction } from './transaction/Transaction.interface';
import { AddHourlyEmployeeTransaction } from './transaction/addEmployee/AddHourlyEmployeeTransaction';

export class TextParserTransactionSource implements TransactionSource {
  private reader: Reader = new Reader();

  constructor() {}

  async getTransaction(): Promise<Transaction> {
    const line = await this.reader.readLine('Enter transaction: ');
    // AddEmp <EmpId> "<name>" "<address>" H <hourly-rate>

    const parts = line.split(' ');
    const command = parts[0];

    if (command === 'AddEmp') {
      const empId = parseInt(parts[1]);
      const name = parts[2];
      const address = parts[3];
      const employeeType = parts[5];

      if (employeeType === 'H') {
        const hourlyRate = parseInt(parts[6]);
        const addHourlyEmployeeTransaction = new AddHourlyEmployeeTransaction(
          empId,
          name,
          address,
          hourlyRate,
        );
        return addHourlyEmployeeTransaction;
      }
    }

    throw new Error('Invalid transaction');
  }
}
