import { execSync } from 'child_process';
import { PrismaPayrollDatabase } from './PrismaPayrollDatabase';
import { Employee } from '../Employee';
import { AddHourlyEmployeeTransaction } from '../transaction';
import { HourlyClassification } from '../paymentClassification/hourly/HourlyClassification';

async function resetDbAndDeploySchema() {
  console.log('Applying migrations...');
  const databaseUrl = process.env.DATABASE_URL;
  execSync(`DATABASE_URL="${databaseUrl}" npx prisma migrate reset --force --skip-generate`, {
    stdio: 'inherit',
  });
  execSync(`DATABASE_URL="${databaseUrl}" npx prisma migrate deploy`, { stdio: 'inherit' });
}

describe('PayrollDatabase', () => {
  test('run migrations', async () => {
    await resetDbAndDeploySchema();
  });

  test('add hourly employee', async () => {
    const db = new PrismaPayrollDatabase();
    await db.clear();

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
});
