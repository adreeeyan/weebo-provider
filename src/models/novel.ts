import { Status } from "./status";

export default class Novel {
  public title: string = "";
  public alternativeTitles: string[] = [];
  public cover: string = "";
  public authors: string[] = [];
  public genres: string[] = [];
  public summary: string = "";
  public status: Status = Status.ONGOING;
  public releaseDate: Date = new Date(-1);
  public updateDate: Date = new Date(-1);
  public rating: number = -1;
  public location: string = "";

  constructor(init?: Partial<Novel>) {
    Object.assign(this, init);
  }
}
