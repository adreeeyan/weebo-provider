export default class SearchOutput {
  public title: string = "";
  public cover: string = "";
  public location: string = "";

  constructor(init?: Partial<SearchOutput>) {
    Object.assign(this, init);
  }
}
