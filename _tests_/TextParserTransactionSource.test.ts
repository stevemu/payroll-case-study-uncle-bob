import { PayrollDatabase } from '../src/payrollDatabase/PayrollDatabase';
import { Reader } from '../src/reader/Reader';
import { TextParserTransactionSource } from '../src/textParserTransactionSource/TextParserTransactionSource';
import { AddHourlyEmployeeTransaction } from '../src/transactions/AddHourlyEmployeeTransaction';

describe('TextParserTransactionSource', () => {
  let db: PayrollDatabase;
  let reader: jest.Mocked<Reader>;
  let source: TextParserTransactionSource;

  beforeEach(() => {
    // Reset mocks before each test
    db = {} as PayrollDatabase;
    reader = {
      readLine: jest.fn(),
      close: jest.fn(),
    };
    source = new TextParserTransactionSource(db, reader);
  });

  it('creates AddHourlyEmployeeTransaction for AddEmp command with type H', async () => {
    reader.readLine.mockResolvedValue('AddEmp 1 John Address H 15.25');
    const transaction = await source.getTransaction();
    expect(transaction).toBeInstanceOf(AddHourlyEmployeeTransaction);
  });

  it('throws error for invalid command', async () => {
    reader.readLine.mockResolvedValue('InvalidCommand');
    await expect(source.getTransaction()).rejects.toThrow('Invalid transaction command');
  });
});
