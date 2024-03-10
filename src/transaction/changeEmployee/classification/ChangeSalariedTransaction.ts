import { SalariedClassification } from '@/src/classification/SalariedClassification';
import { MonthlySchedule } from '@/src/schedule/MonthlySchedule';
import { ChangeClassification } from './ChangeClassification.abstract';
import { Classification } from '@/src/classification/Classification.interface';
import { Schedule } from '@/src/schedule/Schedule.interface';

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
