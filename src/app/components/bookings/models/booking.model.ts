export class Booking {
  constructor(
    public _id: string,
    public placeId: string,
    public userId: string,
    public placeTitle: string,
    public questNumber: string
  ) {}
}
