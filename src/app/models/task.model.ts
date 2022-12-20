export class Task {
  constructor(
    public name: string,
    public completed: boolean,
    public points: number,
    public hasOwner: boolean
  ) {}
}
