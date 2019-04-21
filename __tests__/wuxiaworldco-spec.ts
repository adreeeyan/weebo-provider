import { WuxiaWorldCoCrawler } from "../src/crawlers";
import * as _ from "lodash";

let crawler = new WuxiaWorldCoCrawler();
let novels = [];
let searchedNovels = [];
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("The WuxiaWorldCo crawler should work", () => {
  beforeEach = () => {
    crawler = new WuxiaWorldCoCrawler();
  };

  test("It should get the list of novels", async () => {
    novels = await crawler.getList();
    expect(novels.length).toBeGreaterThan(0);
  });

  test("It should be able to search novel", async () => {
    searchedNovels = await crawler.search("Tales of Demons and Gods");
    expect(searchedNovels.length).toBeGreaterThan(0);
  });

  describe("It should get the novel info", async () => {
    let novel = null;
    beforeAll(async done => {
      novel = await crawler.getItemInfo(searchedNovels[0].location);
      done();
    });
    test("It should get the author", () => {
      expect(novel.authors).toContain("Mad Snail");
    });
    test("It should get the cover", () => {
      expect(novel.cover.length).toBeGreaterThan(0);
    });
    test("It should get the genres", () => {
      expect(novel.genres.length).toBeGreaterThan(0);
    });
    test("It should get the summary", () => {
      expect(novel.summary.length).toBeGreaterThan(0);
    });
    test("It should get the update date", () => {
      expect(novel.updateDate).toBeTruthy();
    });
    test("It should contain the novel location", () => {
      expect(novel.location).toBe(searchedNovels[0].location);
    });
  });

  describe("It should get the chapters list", async () => {
    let chapters = [];

    test("It should be able to get the chapters list", async () => {
      chapters = await crawler.getChapters(novels[0].location);
      expect(chapters.length).toBeGreaterThan(0);
    });

    test("It should be sorted in increasing order", () => {
      const isSorted = _.every(chapters, (value, index, array) => {
        return index === 0 || array[index - 1].index <= value.index;
      });
      expect(isSorted).toBe(true);
    });
  });

  test("It should get the chapter content", async () => {
    const chapters = await crawler.getChapters(novels[0].location);
    const chapterContent = await crawler.getChapterContent(
      chapters[0].location
    );
    expect(chapterContent.content).toBeTruthy();
  });
});
