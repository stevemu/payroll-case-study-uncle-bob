export abstract class Transaction {
  abstract execute(): Promise<void>;
}
