import SearchOutput from "../models/search-output";
import Novel from "../models/novel";
import { Chapter } from "../models";
import ChapterContent from "../models/chapter-content";
import BaseCrawler from "./base";
import { Type } from "../models/type";
import { Status } from "../models/status";

export default class WuxiaWorldCoCrawler extends BaseCrawler {
  public url: string = "http://www.wuxiaworld.co";
  public type: Type = Type.LIGHTNOVEL;

  public async _getList() {
    const $ = await this.getHTML(`http://www.wuxiaworld.co/all/`);

    const list = $(".novellist3 > ul > li > a");
    return list.map((index, el) => {
      const title = $(el).text() || "";
      const author = $(el).parent().text().split("/")[1] || "";
      const cleanedTitle = title.replace(":", "?").split(" ").join("-");
      return new SearchOutput({
        author,
        cover: `${this.url}/BookFiles/BookImages/${cleanedTitle}.jpg`,
        location: this.resolve($(el).attr("href")),
        title,
      });
    });
  }

  public async _getCover(url: string) {
    const $ = await this.getHTML(url);
    return this.resolve($("#fmimg img").attr("src"));
  }

  public async _getItemInfo(url: string) {
    const $ = await this.getHTML(url);

    const author = $("#info > p:nth-child(2)")
      .text()
      .replace("Author：", "");
    // actually, in this site, genre is category
    // value is like this > Fantasy > Tales of Demons and Gods
    // so we remove that excess stuffs
    const category = $(".con_top")
      .text()
      .trim()
      .split(">")[1]
      .trim();
    const summary = $("#intro")
      .text()
      .trim()
      .replace(/^Description/m, "")
      .trim();
    const updateDate = new Date(
      $("#info > p:nth-child(4)")
        .text()
        .replace("UpdateTime：", "")
    );
    return new Novel({
      title: $("#info > h1").text(),
      cover: this.resolve($("#fmimg > img").attr("src")),
      authors: [author],
      genres: [category],
      summary: summary,
      status: Status.ONGOING, // no status :(
      updateDate: updateDate,
      location: url
    });
  }

  public async _getChapters(url: string) {
    const $ = await this.getHTML(url);

    const list = $("#list > dl > dd > a");
    return list.map((index, el) => {
      return new Chapter({
        index: index + 1,
        title: $(el).text(),
        location: this.resolve($(el).attr("href"), url)
      });
    });
  }

  public async _getChapterContent(url: string) {
    const $ = await this.getHTML(url);

    // change the <br> to \n
    $("#content")
      .find("br")
      .replaceWith("\n");

    let content = $("#content").text();
    // clean the content
    // trim it
    content = content.trim();
    // retrieve all the parts
    let parts = content.split("\n");
    // retrieve the title
    const title = parts[0];
    // remove the blank lines and the first line
    parts = parts.filter((p, index) => p.length != 0 && index != 0);
    // join all the partsr
    content = parts.join("\n");

    return new ChapterContent({
      title: title,
      location: url,
      content: content
    });
  }
}
