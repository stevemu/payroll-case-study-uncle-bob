import { Affiliation } from './affiliation/Affiliation.interface';
import { Classification } from './classification/Classification.interface';
import { Method } from './method/Method.interface';
import { Schedule } from './schedule/Schedule.interface';

export class Employee {
  constructor(
    public empId: number,
    public name: string,
    public address: string,
  ) {}

  public classification!: Classification;
  public schedule!: Schedule;
  public method!: Method;
  public affiliation!: Affiliation;
}

export class NullEmployee extends Employee {
  constructor() {
    super(-1, 'Null Employee', 'Null Address');
  }
}
