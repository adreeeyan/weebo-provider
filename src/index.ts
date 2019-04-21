import * as _ from "lodash";
import URL = require("url");
import { BaseCrawler, WuxiaWorldCoCrawler } from "./crawlers";

const crawlers: BaseCrawler[] = [];

const addCrawler = (crawler: BaseCrawler) => {
  crawlers.push(crawler);
};

const removeCrawler = (crawler: BaseCrawler) => {
  _.pull(crawlers, crawler);
};

const updateDb = (): Promise<any> => {
  return new Promise(async resolve => {
    await Promise.all(
      crawlers.map(async crawler => await crawler.getList(true))
    );
    resolve();
  });
};

const search = (title: string): Promise<any> => {
  return new Promise(async resolve => {
    const variousResults = await Promise.all(
      crawlers.map(async crawler => {
        const result = await crawler.search(title);
        return result;
      })
    );
    const results = _.flatten(variousResults);
    const grouped = _(results)
      .groupBy(item => getSourceFromLocation(item.location))
      .map((value, key) => ({ source: key, items: value }))
      .value();

    resolve(grouped);
  });
};

const getItemInfo = (location: string): Promise<any> => {
  return new Promise(async resolve => {
    const source = getSourceFromLocation(location);
    const crawler = <BaseCrawler>getCrawlerFromSource(source);
    const info = crawler.getItemInfo(location);
    resolve(info);
  });
};

const getChapters = (location: string): Promise<any> => {
  return new Promise(async resolve => {
    const source = getSourceFromLocation(location);
    const crawler = <BaseCrawler>getCrawlerFromSource(source);
    const chapters = crawler.getChapters(location);
    resolve(chapters);
  });
};

const getChapterContent = (location: string): Promise<any> => {
  return new Promise(async resolve => {
    const source = getSourceFromLocation(location);
    const crawler = <BaseCrawler>getCrawlerFromSource(source);
    const content = crawler.getChapterContent(location);
    resolve(content);
  });
};

const getSourceFromLocation = (location: string) => {
  const url = URL.parse(location);
  return url.hostname || "";
};

const getCrawlerFromSource = (source: string) => {
  return crawlers.find(crawler => crawler.name == source);
};

export {
  addCrawler,
  removeCrawler,
  crawlers,
  updateDb,
  search,
  getItemInfo,
  getChapters,
  getChapterContent,
  getSourceFromLocation,
  WuxiaWorldCoCrawler
};
