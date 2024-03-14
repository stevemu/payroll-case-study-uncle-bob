import { Classification } from '../../../paymentClassification/Classification.abstract';
import { SalariedClassification } from '../../../paymentClassification/SalariedClassification';
import { MonthlySchedule } from '../../../schedule/MonthlySchedule';
import { Schedule } from '../../../schedule/Schedule.interface';
import { ChangeClassification } from './ChangeClassification.abstract';

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
