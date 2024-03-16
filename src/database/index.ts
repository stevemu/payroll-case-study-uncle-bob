import { TestPayrollDatabase } from './TestPayrollDatabase';
import { PayrollDatabase } from './PayrollDatabase';

export const gPayrollDatabase =
  process.env.NODE_ENV === 'test' ? new TestPayrollDatabase() : new PayrollDatabase();
