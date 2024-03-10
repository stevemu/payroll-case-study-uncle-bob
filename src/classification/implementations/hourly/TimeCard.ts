export class TimeCard {
  constructor(
    public date: string,
    public hours: number,
  ) {}
}

export class NullTimeCard extends TimeCard {
  constructor() {
    super('', 0);
  }
}
