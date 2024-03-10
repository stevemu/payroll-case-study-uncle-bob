import { SalariedClassification } from '@/src/classification/SalariedClassification';
import { MonthlySchedule } from '@/src/paymentSchedule/MonthlySchedule';
import { ChangeClassification } from './ChangeClassification.abstract';
import { PaymentClassification } from '@/src/classification/Classification.interface';
import { PaymentSchedule } from '@/src/paymentSchedule/PaymentSchedule.interface';

export class ChangeSalariedTransaction extends ChangeClassification {
  constructor(
    empId: number,
    private salary: number,
  ) {
    super(empId);
  }

  get paymentClassification(): PaymentClassification {
    return new SalariedClassification(this.salary);
  }
  get paymentSchedule(): PaymentSchedule {
    return new MonthlySchedule();
  }
}
