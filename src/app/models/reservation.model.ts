export class Reservation {
  constructor(
    public id: number,
    public start: Date,
    public end: Date,
    public hasOwner: boolean,
    public owner: number | null
  ) {}
}
