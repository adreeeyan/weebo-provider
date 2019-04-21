export default class Chapter {
  public index: number = -1;
  public title: string = "";
  public location: string = "";

  constructor(init?: Partial<Chapter>) {
    Object.assign(this, init);
  }
}
