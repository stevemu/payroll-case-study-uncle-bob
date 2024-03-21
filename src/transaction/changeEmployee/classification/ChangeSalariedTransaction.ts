import { PayrollDatabase } from '../../../database/PayrollDatabase.interface.ts';
import { PaymentClassification } from '../../../paymentClassification/Classification.abstract.ts';
import { SalariedClassification } from '../../../paymentClassification/SalariedClassification.ts';
import { MonthlySchedule } from '../../../schedule/MonthlySchedule.ts';
import { Schedule } from '../../../schedule/Schedule.interface.ts';
import { ChangeClassification } from './ChangeClassification.abstract.ts';

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
