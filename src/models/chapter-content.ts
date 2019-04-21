import { Chapter } from ".";

export default class ChapterContent extends Chapter {
  public content: string = "";

  constructor(init?: Partial<ChapterContent>) {
    super();
    Object.assign(this, init);
  }
}
