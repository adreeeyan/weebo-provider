"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const URL = require("url");
const crawlers_1 = require("./crawlers");
exports.WuxiaWorldCoCrawler = crawlers_1.WuxiaWorldCoCrawler;
const crawlers = [];
exports.crawlers = crawlers;
const addCrawler = (crawler) => {
    crawlers.push(crawler);
};
exports.addCrawler = addCrawler;
const removeCrawler = (crawler) => {
    _.pull(crawlers, crawler);
};
exports.removeCrawler = removeCrawler;
const updateDb = () => {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(crawlers.map((crawler) => __awaiter(this, void 0, void 0, function* () { return yield crawler.getList(true); })));
        resolve();
    }));
};
exports.updateDb = updateDb;
const search = (title) => {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const variousResults = yield Promise.all(crawlers.map((crawler) => __awaiter(this, void 0, void 0, function* () {
            const result = yield crawler.search(title);
            return result;
        })));
        const results = _.flatten(variousResults);
        const grouped = _(results)
            .groupBy(item => getSourceFromLocation(item.location))
            .map((value, key) => ({ source: key, items: value }))
            .value();
        resolve(grouped);
    }));
};
exports.search = search;
const getItemInfo = (location) => {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const source = getSourceFromLocation(location);
        const crawler = getCrawlerFromSource(source);
        const info = crawler.getItemInfo(location);
        resolve(info);
    }));
};
exports.getItemInfo = getItemInfo;
const getChapters = (location) => {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const source = getSourceFromLocation(location);
        const crawler = getCrawlerFromSource(source);
        const chapters = crawler.getChapters(location);
        resolve(chapters);
    }));
};
exports.getChapters = getChapters;
const getChapterContent = (location) => {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const source = getSourceFromLocation(location);
        const crawler = getCrawlerFromSource(source);
        const content = crawler.getChapterContent(location);
        resolve(content);
    }));
};
exports.getChapterContent = getChapterContent;
const getSourceFromLocation = (location) => {
    const url = URL.parse(location);
    return url.hostname || "";
};
exports.getSourceFromLocation = getSourceFromLocation;
const getCrawlerFromSource = (source) => {
    return crawlers.find(crawler => crawler.name == source);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDRCQUE0QjtBQUM1QiwyQkFBNEI7QUFDNUIseUNBQThEO0FBcUY1RCw4QkFyRm9CLDhCQUFtQixDQXFGcEI7QUFuRnJCLE1BQU0sUUFBUSxHQUFrQixFQUFFLENBQUM7QUE0RWpDLDRCQUFRO0FBMUVWLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBb0IsRUFBRSxFQUFFO0lBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBc0VBLGdDQUFVO0FBcEVaLE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBb0IsRUFBRSxFQUFFO0lBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQztBQW1FQSxzQ0FBYTtBQWpFZixNQUFNLFFBQVEsR0FBRyxHQUFpQixFQUFFO0lBQ2xDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTSxPQUFPLEVBQUMsRUFBRTtRQUNqQyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFNLE9BQU8sRUFBQyxFQUFFLGdEQUFDLE9BQUEsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBLEdBQUEsQ0FBQyxDQUMzRCxDQUFDO1FBQ0YsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBNERBLDRCQUFRO0FBMURWLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBYSxFQUFnQixFQUFFO0lBQzdDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTSxPQUFPLEVBQUMsRUFBRTtRQUNqQyxNQUFNLGNBQWMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ3RDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBTSxPQUFPLEVBQUMsRUFBRTtZQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FDSCxDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNyRCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUVYLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBMkNBLHdCQUFNO0FBekNSLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBZ0IsRUFBZ0IsRUFBRTtJQUNyRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU0sT0FBTyxFQUFDLEVBQUU7UUFDakMsTUFBTSxNQUFNLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsTUFBTSxPQUFPLEdBQWdCLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFtQ0Esa0NBQVc7QUFqQ2IsTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFnQixFQUFnQixFQUFFO0lBQ3JELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTSxPQUFPLEVBQUMsRUFBRTtRQUNqQyxNQUFNLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxNQUFNLE9BQU8sR0FBZ0Isb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQTJCQSxrQ0FBVztBQXpCYixNQUFNLGlCQUFpQixHQUFHLENBQUMsUUFBZ0IsRUFBZ0IsRUFBRTtJQUMzRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU0sT0FBTyxFQUFDLEVBQUU7UUFDakMsTUFBTSxNQUFNLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsTUFBTSxPQUFPLEdBQWdCLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQW1CQSw4Q0FBaUI7QUFqQm5CLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUU7SUFDakQsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0FBQzVCLENBQUMsQ0FBQztBQWVBLHNEQUFxQjtBQWJ2QixNQUFNLG9CQUFvQixHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDOUMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUMifQ==