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
require("isomorphic-fetch");
const URL = require("url");
const cheerio = require("cheerio-without-node-native");
const type_1 = require("../models/type");
class BaseCrawler {
    constructor() {
        this.url = "";
        this.type = type_1.Type.LIGHTNOVEL;
        this.items = [];
        this.getList = (forcedUpdate = false) => {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (this.items.length > 0 && !forcedUpdate) {
                    resolve(this.items);
                }
                this.items = yield this._getList();
                resolve(this.items);
            }));
        };
        this.getCover = (location) => {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const info = yield this._getCover(location);
                resolve(info);
            }));
        };
        this.getItemInfo = (location) => {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const info = yield this._getItemInfo(location);
                resolve(info);
            }));
        };
        this.getChapters = (location) => {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const chapters = yield this._getChapters(location);
                resolve(chapters);
            }));
        };
        this.getChapterContent = (location) => {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const content = yield this._getChapterContent(location);
                resolve(content);
            }));
        };
        this.search = (title) => {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let source = this.items;
                if (source.length === 0) {
                    source = yield this._getList();
                }
                const searched = _.filter(source, item => {
                    return _.includes(item.title.toLowerCase(), title.toLowerCase());
                }) || [];
                resolve(searched);
            }));
        };
        this.isItemsEmpty = () => {
            return this.items.length == 0;
        };
    }
    get name() {
        const url = URL.parse(this.url);
        return url.hostname;
    }
    resolve(additional, root = "") {
        const url = root.length != 0 ? root : this.url;
        return URL.resolve(url, additional);
    }
    getHTML(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchUrl = url;
            const response = yield fetch(searchUrl);
            const htmlString = yield response.text();
            return cheerio.load(htmlString);
        });
    }
}
exports.default = BaseCrawler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jcmF3bGVycy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw0QkFBNEI7QUFDNUIsNEJBQTBCO0FBQzFCLDJCQUE0QjtBQUM1QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUV2RCx5Q0FBc0M7QUFFdEM7SUFBQTtRQUNrQixRQUFHLEdBQVcsRUFBRSxDQUFDO1FBQ2pCLFNBQUksR0FBUyxXQUFJLENBQUMsVUFBVSxDQUFDO1FBQ25DLFVBQUssR0FBVyxFQUFFLENBQUM7UUFvQnRCLFlBQU8sR0FBRyxDQUFDLGVBQXdCLEtBQUssRUFBZ0IsRUFBRTtZQUMvRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU0sT0FBTyxFQUFDLEVBQUU7Z0JBRWpDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyQjtnQkFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFSyxhQUFRLEdBQUcsQ0FBQyxRQUFnQixFQUFnQixFQUFFO1lBQ25ELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTSxPQUFPLEVBQUMsRUFBRTtnQkFDakMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVLLGdCQUFXLEdBQUcsQ0FB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