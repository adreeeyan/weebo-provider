"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_1 = require("./status");
class Novel {
    constructor(init) {
        this.title = "";
        this.alternativeTitles = [];
        this.cover = "";
        this.authors = [];
        this.genres = [];
        this.summary = "";
        this.status = status_1.Status.ONGOING;
        this.releaseDate = new Date(-1);
        this.updateDate = new Date(-1);
        this.rating = -1;
        this.location = "";
        Object.assign(this, init);
    }
}
exports.default = Novel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm92ZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL25vdmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWtDO0FBRWxDO0lBYUUsWUFBWSxJQUFxQjtRQVoxQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLHNCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUNqQyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsV0FBTSxHQUFhLEVBQUUsQ0FBQztRQUN0QixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFdBQU0sR0FBVyxlQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2hDLGdCQUFXLEdBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxlQUFVLEdBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxXQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUczQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFoQkQsd0JBZ0JDIn0=