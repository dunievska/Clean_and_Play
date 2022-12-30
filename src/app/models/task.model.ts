export class Task {
  constructor(
    public id: number,
    public name: string,
    public completed: boolean,
    public points: number,
    public hasOwner: boolean,
    public owner: number | null // in future id of user
  ) {}
}
