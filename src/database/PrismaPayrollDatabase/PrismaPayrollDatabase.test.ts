import { PrismaPayrollDatabase } from './PrismaPayrollDatabase';
import { Employee } from '../../Employee';
import {
  AddCommissionedEmployeeTransaction,
  AddHourlyEmployeeTransaction,
  AddSalariedEmployeeTransaction,
  AddTimeCardTransaction,
} from '../../transaction';
import { HourlyClassification } from '../../paymentClassification/hourly/HourlyClassification';
import { SalariedClassification } from '../../paymentClassification/SalariedClassification';
import { CommissionedClassification } from '../../paymentClassification/commissioned/CommissionedClassification';
import { config } from '../../../configs/test.config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ datasources: { db: { url: config.databaseUrl } } });

describe('PayrollDatabase', () => {
  let db: PrismaPayrollDatabase;

  beforeAll(async () => {
    db = new PrismaPayrollDatabase(prisma);
  });

  beforeEach(async () => {
    await db.clear();
  });

  test('hourly employee', async () => {
    const empId = 1;
    const hourlyRate = 20;
    const t = new AddHourlyEmployeeTransaction(db, empId, 'Bob', 'Home', hourlyRate);
    await t.execute();

    const t2 = new AddTimeCardTransaction(db, empId, new Date(2021, 1, 1), 8);
    await t2.execute();

    const e = await db.getEmployee(empId);
    expect(e).toBeInstanceOf(Employee);
    expect(e?.name).toBe('Bob');
    expect(e?.address).toBe('Home');
    const c = e?.classification as HourlyClassification;
    expect(c).toBeInstanceOf(HourlyClassification);
    expect(c.hourlyRate).toBe(hourlyRate);
    expect(c.getTimeCard(new Date(2021, 1, 1))!.hours).toBe(8);
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

  test('delete employee', async () => {
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

    let e = await db.getEmployee(empId);
    expect(e).toBeInstanceOf(Employee);

    await db.deleteEmployee(empId);
    e = await db.getEmployee(empId);
    expect(e).toBeUndefined();
  });
});
