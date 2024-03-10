import { SalariedClassification } from '@/src/classification/implementations/SalariedClassification';
import { MonthlySchedule } from '@/src/paymentSchedule/implementations/MonthlySchedule';
import { ChangePaymentClassification } from './ChangePaymentClassification';
import { PaymentClassification } from '@/src/classification/Classification.interface';
import { PaymentSchedule } from '@/src/paymentSchedule/PaymentSchedule.interface';

export class ChangeSalariedTransaction extends ChangePaymentClassification {
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
