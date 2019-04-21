import * as WeeboProvider from "../src";
import { WuxiaWorldCoCrawler } from "../src/crawlers";

let searchItems = [];
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("The crawler shoud work", () => {
  let wuxiaWorldCoCrawler = new WuxiaWorldCoCrawler();

  test("It should be able to add crawlers", () => {
    WeeboProvider.addCrawler(wuxiaWorldCoCrawler);
    expect(WeeboProvider.crawlers.length).toBe(1);
  });

  test("It should be able to remove crawlers", () => {
    WeeboProvider.removeCrawler(wuxiaWorldCoCrawler);
    expect(WeeboProvider.crawlers.length).toBe(0);

    WeeboProvider.addCrawler(wuxiaWorldCoCrawler);
  });

  test("It should be able to update the items list", async () => {
    await WeeboProvider.updateDb();
    expect(WeeboProvider.crawlers[0].isItemsEmpty()).toBe(false);
  });

  describe("It should get the list of items", async () => {
    beforeAll(async done => {
      searchItems = await WeeboProvider.search("Tales of Demons and Gods");
      done();
    });
    test("It should get results from first crawler", async () => {
      expect(searchItems[0].items.length).toBeGreaterThan(0);
    });
  });

  test("It should get the item info", async () => {
    const item = await WeeboProvider.getItemInfo(
      searchItems[0].items[0].location
    );
    expect(item.title.toLowerCase()).toBe("tales of demons and gods");
  });

  test("It should get the chapters list", async () => {
    const chapters = await WeeboProvider.getChapters(
      searchItems[0].items[0].location
    );
    expect(chapters.length).toBeGreaterThan(0);
  });

  test("It should get the chapter content", async () => {
    const chapters = await WeeboProvider.getChapters(
      searchItems[0].items[0].location
    );
    const chapterContent = await WeeboProvider.getChapterContent(
      chapters[0].location
    );
    expect(chapterContent.content).toBeTruthy();
  });
});
