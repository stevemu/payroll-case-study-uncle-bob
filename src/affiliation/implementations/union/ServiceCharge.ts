export class ServiceCharge {
  constructor(
    public date: string,
    public amount: number,
  ) {}
}

export class NullServiceCharge extends ServiceCharge {
  constructor() {
    super('Null Date', -1);
  }
}
