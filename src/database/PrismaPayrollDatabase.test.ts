import { execSync } from 'child_process';
import { PrismaPayrollDatabase } from './PrismaPayrollDatabase';
import { Employee } from '../Employee';
import {
  AddCommissionedEmployeeTransaction,
  AddHourlyEmployeeTransaction,
  AddSalariedEmployeeTransaction,
} from '../transaction';
import { HourlyClassification } from '../paymentClassification/hourly/HourlyClassification';
import { SalariedClassification } from '../paymentClassification/SalariedClassification';
import { CommissionedClassification } from '../paymentClassification/commissioned/CommissionedClassification';

async function resetDbAndApplyMigrationsToDb() {
  console.log('Applying migrations...');
  const databaseUrl = process.env.DATABASE_URL;
  execSync(`DATABASE_URL="${databaseUrl}" npx prisma migrate reset --force --skip-generate`, {
    stdio: 'inherit',
  });
  execSync(`DATABASE_URL="${databaseUrl}" npx prisma migrate deploy`, { stdio: 'inherit' });
}

describe('PayrollDatabase', () => {
  let db: PrismaPayrollDatabase;

  beforeAll(async () => {
    await resetDbAndApplyMigrationsToDb();
  });

  beforeEach(async () => {
    db = new PrismaPayrollDatabase();
    await db.clear();
  });

  test('add hourly employee', async () => {
    const empId = 1;
    const hourlyRate = 20;
    const t = new AddHourlyEmployeeTransaction(db, empId, 'Bob', 'Home', hourlyRate);
    await t.execute();

    const e = await db.getEmployee(empId);
    expect(e).toBeInstanceOf(Employee);
    expect(e?.name).toBe('Bob');
    expect(e?.address).toBe('Home');
    expect(e?.classification).toBeInstanceOf(HourlyClassification);
    expect((e?.classification as HourlyClassification).hourlyRate).toBe(hourlyRate);
  });

  test('add salary employee', async () => {
    const empId = 1;
    const salary = 2000;
    const t = new AddSalariedEmployeeTransaction(db, empId, 'Bob', 'Home', salary);
    await t.execute();

    const e = await db.getEmployee(empId);
    expect(e).toBeInstanceOf(Employee);
    expect(e?.name).toBe('Bob');
    expect(e?.address).toBe('Home');
    expect(e?.classification).toBeInstanceOf(SalariedClassification);
    expect((e?.classification as SalariedClassification).salary).toBe(salary);
  });

  test('add commissioned employee', async () => {
    const empId = 1;
    const salary = 2000;
    const commissionRate = 0.1;
    const t = new AddCommissionedEmployeeTransaction(
      db,
      empId,
      'Bob',
      'Home',
      salary,
      commissionRate,
    );
    await t.execute();

    const e = await db.getEmployee(empId);
    expect(e).toBeInstanceOf(Employee);
    expect(e?.name).toBe('Bob');
    expect(e?.address).toBe('Home');
    expect(e?.classification).toBeInstanceOf(CommissionedClassification);
    expect((e?.classification as CommissionedClassification).salary).toBe(salary);
    expect((e?.classification as CommissionedClassification).commissionRate).toBe(commissionRate);
  });
});
