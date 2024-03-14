import { SalariedClassification } from '@/src/paymentClassification/SalariedClassification.ts';
import { MonthlySchedule } from '@/src/schedule/MonthlySchedule.ts';
import { ChangeClassification } from './ChangeClassification.abstract.ts';
import { Classification } from '@/src/paymentClassification/Classification.abstract.ts';
import { Schedule } from '@/src/schedule/Schedule.interface.ts';

export class ChangeSalariedTransaction extends ChangeClassification {
  constructor(
    empId: number,
    private salary: number,
  ) {
    super(empId);
  }

  get paymentClassification(): Classification {
    return new SalariedClassification(this.salary);
  }
  get paymentSchedule(): Schedule {
    return new MonthlySchedule();
  }
}
