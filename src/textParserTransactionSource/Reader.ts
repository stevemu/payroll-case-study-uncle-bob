export interface Reader {
  readLine(question: string): Promise<string>;
  close(): void;
}
