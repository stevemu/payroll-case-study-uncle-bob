export class TimeCard {
  constructor(
    public date: Date,
    public hours: number,
  ) {}
}

export class NullTimeCard extends TimeCard {
  constructor() {
    super(new Date(), 0);
  }
}
