export class Profile {
  constructor(
    public title: string,
    public description: string,
    public imageUrl: string | null = null,
  ) {}
}
