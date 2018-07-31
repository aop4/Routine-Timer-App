"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(name, desc, steps) {
        this.name = name;
        this.description = desc;
        this.steps = steps;
    }
    /* Delete the indexth step of this task */
    Task.prototype.removeStep = function (index) {
        this.steps.splice(index, 1);
    };
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhc2subW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQU1JLGNBQVksSUFBWSxFQUFFLElBQVksRUFBRSxLQUFrQjtRQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsMENBQTBDO0lBQzFDLHlCQUFVLEdBQVYsVUFBVyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3N0ZXAvc3RlcC5tb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgVGFzayB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgc3RlcHM6IEFycmF5PFN0ZXA+O1xuICAgIG1vZGlmaWVkVGltZXN0YW1wOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGRlc2M6IHN0cmluZywgc3RlcHM6IEFycmF5PFN0ZXA+KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjO1xuICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcHM7XG4gICAgfVxuXG4gICAgLyogRGVsZXRlIHRoZSBpbmRleHRoIHN0ZXAgb2YgdGhpcyB0YXNrICovXG4gICAgcmVtb3ZlU3RlcChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RlcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG4iXX0=