export class Place {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public price: number,
    public availableFrom: Date,
    public availableTo: Date
  ) {}
}
