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
const search_output_1 = require("../models/search-output");
const novel_1 = require("../models/novel");
const models_1 = require("../models");
const chapter_content_1 = require("../models/chapter-content");
const base_1 = require("./base");
const type_1 = require("../models/type");
const status_1 = require("../models/status");
class WuxiaWorldCoCrawler extends base_1.default {
    constructor() {
        super(...arguments);
        this.url = "http://www.wuxiaworld.co";
        this.type = type_1.Type.LIGHTNOVEL;
    }
    _getList() {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.getHTML(`http://www.wuxiaworld.co/all/`);
            const list = $(".novellist3 > ul > li > a");
            return list.map((index, el) => {
                return new search_output_1.default({
                    title: $(el).text() || "",
                    location: this.resolve($(el).attr("href"))
                });
            });
        });
    }
    _getCover(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.getHTML(url);
            return this.resolve($("#fmimg img").attr("src"));
        });
    }
    _getItemInfo(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.getHTML(url);
            const author = $("#info > p:nth-child(2)")
                .text()
                .replace("Author：", "");
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
            const updateDate = new Date($("#info > p:nth-child(4)")
                .text()
                .replace("UpdateTime：", ""));
            return new novel_1.default({
                title: $("#info > h1").text(),
                cover: this.resolve($("#fmimg > img").attr("src")),
                authors: [author],
                genres: [category],
                summary: summary,
                status: status_1.Status.ONGOING,
                updateDate: updateDate,
                location: url
            });
        });
    }
    _getChapters(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.getHTML(url);
            const list = $("#list > dl > dd > a");
            return list.map((index, el) => {
                return new models_1.Chapter({
                    index: index + 1,
                    title: $(el).text(),
                    location: this.resolve($(el).attr("href"), url)
                });
            });
        });
    }
    _getChapterContent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield this.getHTML(url);
            $("#content")
                .find("br")
                .replaceWith("\n");
            let content = $("#content").text();
            content = content.trim();
            let parts = content.split("\n");
            const title = parts[0];
            parts = parts.filter((p, index) => p.length != 0 && index != 0);
            content = parts.join("\n");
            return new chapter_content_1.default({
                title: title,
                location: url,
                content: content
            });
        });
    }
}
exports.default = WuxiaWorldCoCrawler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3V4aWF3b3JsZGNvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NyYXdsZXJzL3d1eGlhd29ybGRjby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkRBQW1EO0FBQ25ELDJDQUFvQztBQUNwQyxzQ0FBb0M7QUFDcEMsK0RBQXVEO0FBQ3ZELGlDQUFpQztBQUNqQyx5Q0FBc0M7QUFDdEMsNkNBQTBDO0FBRTFDLHlCQUF5QyxTQUFRLGNBQVc7SUFBNUQ7O1FBQ1MsUUFBRyxHQUFXLDBCQUEwQixDQUFDO1FBQ3pDLFNBQUksR0FBUyxXQUFJLENBQUMsVUFBVSxDQUFDO0lBK0Z0QyxDQUFDO0lBN0ZjLFFBQVE7O1lBQ25CLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBRTlELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLHVCQUFZLENBQUM7b0JBQ3RCLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtvQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDM0MsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFWSxTQUFTLENBQUMsR0FBVzs7WUFDaEMsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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