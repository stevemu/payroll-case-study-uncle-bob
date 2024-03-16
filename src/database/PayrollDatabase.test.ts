import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

async function runMigrations() {
  console.log('Applying migrations...');
  const databaseUrl = process.env.DATABASE_URL;
  execSync(`DATABASE_URL="${databaseUrl}" npx prisma migrate deploy`, { stdio: 'inherit' });
}

describe('PayrollDatabase', () => {
  test('addEmployee', async () => {
    await runMigrations();

    await prisma.employee.create({
      data: {
        empId: 1,
        name: 'Bob',
        address: '1234 Elm Street',
        hourlyRate: 15.25,
        classification: 'hourly',
      },
    });
  });
});
