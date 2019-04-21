/// <reference types="cheerio" />
import "isomorphic-fetch";
import Item from "../models/item";
import { Type } from "../models/type";
export default abstract class BaseCrawler {
    abstract url: string;
    abstract type: Type;
    protected items: Item[];
    readonly name: string | undefined;
    resolve(additional: string, root?: string): string;
    getHTML(url: string): Promise<CheerioStatic>;
    getList: (forcedUpdate?: boolean) => Promise<any>;
    getCover: (location: string) => Promise<any>;
    getItemInfo: (location: string) => Promise<any>;
    getChapters: (location: string) => Promise<any>;
    getChapterContent: (location: string) => Promise<any>;
    search: (title: string) => Promise<any>;
    isItemsEmpty: () => boolean;
    protected abstract _getList(): Promise<any>;
    protected abstract _getCover(location: string): Promise<any>;
    protected abstract _getItemInfo(location: string): Promise<any>;
    protected abstract _getChapters(location: string): Promise<any>;
    protected abstract _getChapterContent(location: string): Promise<any>;
}
