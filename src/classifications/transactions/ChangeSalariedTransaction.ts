import { PayrollDatabase } from '../../payrollDatabase/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../../payrollDomain/Classification.abstract.ts';
import { SalariedClassification } from '../SalariedClassification.ts';
import { Schedule } from '../../payrollDomain/Schedule.interface.ts';
import { ChangeClassification } from './ChangeClassification.abstract.ts';
import { MonthlySchedule } from '../../schedules/MonthlySchedule.ts';

export class ChangeSalariedTransaction extends ChangeClassification {
  constructor(
    db: PayrollDatabase,
    empId: number,
    private salary: number,
  ) {
    super(db, empId);
  }

  get paymentClassification(): PaymentClassification {
    return new SalariedClassification(this.salary);
  }
  get paymentSchedule(): Schedule {
    return new MonthlySchedule();
  }
}
