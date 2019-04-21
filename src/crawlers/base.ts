import * as _ from "lodash";
import "isomorphic-fetch";
import URL = require("url");
const cheerio = require("cheerio-without-node-native");
import Item from "../models/item";
import { Type } from "../models/type";

export default abstract class BaseCrawler {
  public abstract url: string = "";
  public abstract type: Type = Type.LIGHTNOVEL;
  protected items: Item[] = [];

  // get name from url
  get name() {
    const url = URL.parse(this.url);
    return url.hostname;
  }

  public resolve(additional: string, root: string = ""): string {
    const url = root.length != 0 ? root : this.url;
    return URL.resolve(url, additional);
  }

  public async getHTML(url: string): Promise<CheerioStatic> {
    const searchUrl = url;
    const response = await fetch(searchUrl); // fetch page
    const htmlString = await response.text(); // get response text
    return cheerio.load(htmlString); // parse HTML string
  }

  public getList = (forcedUpdate: boolean = false): Promise<any> => {
    return new Promise(async resolve => {
      // check if value already cached and not a forced update
      if (this.items.length > 0 && !forcedUpdate) {
        resolve(this.items);
      }

      this.items = await this._getList();
      resolve(this.items);
    });
  };

  public getCover = (location: string): Promise<any> => {
    return new Promise(async resolve => {
      const info = await this._getCover(location);
      resolve(info);
    });
  };

  public getItemInfo = (location: string): Promise<any> => {
    return new Promise(async resolve => {
      const info = await this._getItemInfo(location);
      resolve(info);
    });
  };

  public getChapters = (location: string): Promise<any> => {
    return new Promise(async resolve => {
      const chapters = await this._getChapters(location);
      resolve(chapters);
    });
  };

  public getChapterContent = (location: string): Promise<any> => {
    return new Promise(async resolve => {
      const content = await this._getChapterContent(location);
      resolve(content);
    });
  };

  public search = (title: string): Promise<any> => {
    return new Promise(async resolve => {
      let source = this.items;
      if (source.length === 0) {
        source = await this._getList();
      }
      const searched =
        _.filter(source, item => {
          return _.includes(item.title.toLowerCase(), title.toLowerCase());
        }) || [];
      resolve(searched);
    });
  };

  public isItemsEmpty = (): boolean => {
    return this.items.length == 0;
  };

  protected abstract _getList(): Promise<any>;
  protected abstract _getCover(location: string): Promise<any>;
  protected abstract _getItemInfo(location: string): Promise<any>;
  protected abstract _getChapters(location: string): Promise<any>;
  protected abstract _getChapterContent(location: string): Promise<any>;
}
