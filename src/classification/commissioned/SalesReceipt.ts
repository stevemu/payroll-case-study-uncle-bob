export class SalesReceipt {
  constructor(
    public date: string,
    public amount: number,
  ) {}
}

export class NullSalesReceipt extends SalesReceipt {
  constructor() {
    super('', 0);
  }
}
