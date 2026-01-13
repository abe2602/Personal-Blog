export class Post {
  constructor(
    public title: string,
    public description: string,
    public date: Date,
    public imageUrl: string | null = null,
    public id: number
  ) {}
}
