export class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public type: 'parent' | 'child',
    public points: number
  ) {}
}
