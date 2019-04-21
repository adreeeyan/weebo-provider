/// <reference types="cheerio" />
import Novel from "../models/novel";
import ChapterContent from "../models/chapter-content";
import BaseCrawler from "./base";
import { Type } from "../models/type";
export default class WuxiaWorldCoCrawler extends BaseCrawler {
    url: string;
    type: Type;
    _getList(): Promise<Cheerio>;
    _getCover(url: string): Promise<string>;
    _getItemInfo(url: string): Promise<Novel>;
    _getChapters(url: string): Promise<Cheerio>;
    _getChapterContent(url: string): Promise<ChapterContent>;
}
