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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhc2subW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQU1JLGNBQVksSUFBWSxFQUFFLElBQVksRUFBRSxLQUFrQjtRQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQseUJBQVUsR0FBVixVQUFXLEtBQWE7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vc3RlcC9zdGVwLm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBzdGVwczogQXJyYXk8U3RlcD47XG4gICAgbW9kaWZpZWRUaW1lc3RhbXA6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgZGVzYzogc3RyaW5nLCBzdGVwczogQXJyYXk8U3RlcD4pIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgICAgIHRoaXMuc3RlcHMgPSBzdGVwcztcbiAgICB9XG5cbiAgICByZW1vdmVTdGVwKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zdGVwcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn1cbiJdfQ==