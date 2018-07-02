"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(name, desc, steps) {
        this.name = name;
        this.description = desc;
        this.steps = steps;
    }
    Task.prototype.removeStep = function (index) {
        this.steps.splice(index, 1);
    };
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhc2subW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQU1JLGNBQVksSUFBWSxFQUFFLElBQVksRUFBRSxLQUFrQjtRQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQseUJBQVUsR0FBVixVQUFXLEtBQWE7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vc3RlcC9zdGVwLm1vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFzayB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgc3RlcHM6IEFycmF5PFN0ZXA+O1xyXG4gICAgbW9kaWZpZWRUaW1lc3RhbXA6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGRlc2M6IHN0cmluZywgc3RlcHM6IEFycmF5PFN0ZXA+KSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzYztcclxuICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlU3RlcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==