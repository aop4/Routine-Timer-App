"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var Toast = require("nativescript-toast");
var SystemDataService = /** @class */ (function () {
    function SystemDataService() {
    }
    SystemDataService.prototype.saveSuccessMessage = function (taskName) {
        Toast.makeText("Save successful!").show();
    };
    SystemDataService.prototype.writeTask = function (savedTasks, task) {
        var d = new Date();
        task.modifiedTimestamp = d.getTime();
        savedTasks[task.name] = task;
        var newTasks = JSON.stringify(savedTasks);
        var appSettings = require("application-settings");
        appSettings.setString("tasks", newTasks);
        this.saveSuccessMessage(task.name);
    };
    SystemDataService.prototype.overwritingData = function (task, savedTasks) {
        var _this = this;
        var options = {
            title: "Overwriting data",
            message: "The routine " + task.name + " already exists. Do you want to overwrite it?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        };
        dialogs.confirm(options).then(function (wantsToOverwrite) {
            if (wantsToOverwrite) {
                _this.writeTask(savedTasks, task);
                return true;
            }
            return false;
        });
    };
    /* Attempts to save task. Returns true on success and false if the user decides not to save. */
    SystemDataService.prototype.saveNewTask = function (task, promptForOverwrite) {
        var _this = this;
        return new Promise(function (resolve) {
            var appSettings = require("application-settings");
            var savedTasks = JSON.parse(appSettings.getString("tasks", "{}"));
            //should show an overwrite modal iff the user didn't get here by intentionally
            //editing the activity they're overwriting, since otherwise it's obvious/annoying
            if (promptForOverwrite && savedTasks[task.name]) {
                var overwrote = _this.overwritingData(task, savedTasks);
                if (overwrote) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
            else {
                _this.writeTask(savedTasks, task);
                resolve(true);
            }
        });
    };
    SystemDataService.prototype.deleteTask = function (task) {
        var appSettings = require("application-settings");
        var savedTasks = JSON.parse(appSettings.getString("tasks", "{}"));
        delete savedTasks[task.name];
        appSettings.setString("tasks", JSON.stringify(savedTasks));
    };
    SystemDataService.prototype.loadAllTasks = function () {
        var appSettings = require("application-settings");
        var savedTasks = JSON.parse(appSettings.getString("tasks", "{}"));
        //probs want to sort by date...
        return Object.keys(savedTasks).map(function (key) { return savedTasks[key]; });
    };
    SystemDataService.prototype.loadTaskById = function (id) {
        var appSettings = require("application-settings");
        var savedTasks = JSON.parse(appSettings.getString("tasks", "{}"));
        return (savedTasks[id]);
    };
    SystemDataService = __decorate([
        core_1.Injectable()
    ], SystemDataService);
    return SystemDataService;
}());
exports.SystemDataService = SystemDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDLG9DQUFzQztBQUN0QywwQ0FBNEM7QUFHNUM7SUFBQTtJQTRFQSxDQUFDO0lBMUVXLDhDQUFrQixHQUExQixVQUEyQixRQUFnQjtRQUN2QyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVPLHFDQUFTLEdBQWpCLFVBQWtCLFVBQVUsRUFBRSxJQUFVO1FBQ3BDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BELFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDJDQUFlLEdBQWYsVUFBZ0IsSUFBVSxFQUFFLFVBQWtCO1FBQTlDLGlCQWVDO1FBZEcsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLE9BQU8sRUFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRywrQ0FBK0M7WUFDckYsWUFBWSxFQUFFLEtBQUs7WUFDbkIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixpQkFBaUIsRUFBRSxRQUFRO1NBQzlCLENBQUM7UUFDRixP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UUFEN0IsaUJBQVUsRUFBRTtPQUNBLGlCQUFpQixDQTRFN0I7SUFBRCx3QkFBQztDQUFBLEFBNUVELElBNEVDO0FBNUVZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tIFwibmF0aXZlc2NyaXB0LXRvYXN0XCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTeXN0ZW1EYXRhU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlU3VjY2Vzc01lc3NhZ2UodGFza05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIFRvYXN0Lm1ha2VUZXh0KFwiU2F2ZSBzdWNjZXNzZnVsIVwiKS5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3cml0ZVRhc2soc2F2ZWRUYXNrcywgdGFzazogVGFzaykge1xyXG4gICAgICAgIGxldCBkID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0YXNrLm1vZGlmaWVkVGltZXN0YW1wID0gZC5nZXRUaW1lKCk7XHJcbiAgICAgICAgc2F2ZWRUYXNrc1t0YXNrLm5hbWVdID0gdGFzaztcclxuICAgICAgICBsZXQgbmV3VGFza3MgPSBKU09OLnN0cmluZ2lmeShzYXZlZFRhc2tzKTtcclxuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcclxuICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0YXNrc1wiLCBuZXdUYXNrcyk7XHJcbiAgICAgICAgdGhpcy5zYXZlU3VjY2Vzc01lc3NhZ2UodGFzay5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVyd3JpdGluZ0RhdGEodGFzazogVGFzaywgc2F2ZWRUYXNrczogT2JqZWN0KSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIk92ZXJ3cml0aW5nIGRhdGFcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJUaGUgcm91dGluZSBcIiArIHRhc2submFtZSArIFwiIGFscmVhZHkgZXhpc3RzLiBEbyB5b3Ugd2FudCB0byBvdmVyd3JpdGUgaXQ/XCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJZZXNcIixcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiLFxyXG4gICAgICAgICAgICBuZXV0cmFsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9PdmVyd3JpdGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHdhbnRzVG9PdmVyd3JpdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVUYXNrKHNhdmVkVGFza3MsIHRhc2spXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogQXR0ZW1wdHMgdG8gc2F2ZSB0YXNrLiBSZXR1cm5zIHRydWUgb24gc3VjY2VzcyBhbmQgZmFsc2UgaWYgdGhlIHVzZXIgZGVjaWRlcyBub3QgdG8gc2F2ZS4gKi9cclxuICAgIHNhdmVOZXdUYXNrKHRhc2s6IFRhc2ssIHByb21wdEZvck92ZXJ3cml0ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxCb29sZWFuPiggKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcbiAgICAgICAgICAgIHZhciBzYXZlZFRhc2tzID0gSlNPTi5wYXJzZShhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0YXNrc1wiLCBcInt9XCIpKTtcclxuICAgICAgICAgICAgLy9zaG91bGQgc2hvdyBhbiBvdmVyd3JpdGUgbW9kYWwgaWZmIHRoZSB1c2VyIGRpZG4ndCBnZXQgaGVyZSBieSBpbnRlbnRpb25hbGx5XHJcbiAgICAgICAgICAgIC8vZWRpdGluZyB0aGUgYWN0aXZpdHkgdGhleSdyZSBvdmVyd3JpdGluZywgc2luY2Ugb3RoZXJ3aXNlIGl0J3Mgb2J2aW91cy9hbm5veWluZ1xyXG4gICAgICAgICAgICBpZiAocHJvbXB0Rm9yT3ZlcndyaXRlICYmIHNhdmVkVGFza3NbdGFzay5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG92ZXJ3cm90ZSA9IHRoaXMub3ZlcndyaXRpbmdEYXRhKHRhc2ssIHNhdmVkVGFza3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG92ZXJ3cm90ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZVRhc2soc2F2ZWRUYXNrcywgdGFzayk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVGFzayh0YXNrOiBUYXNrKSB7XHJcbiAgICAgICAgY29uc3QgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcbiAgICAgICAgbGV0IHNhdmVkVGFza3MgPSBKU09OLnBhcnNlKGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRhc2tzXCIsIFwie31cIikpO1xyXG4gICAgICAgIGRlbGV0ZSBzYXZlZFRhc2tzW3Rhc2submFtZV07XHJcbiAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkoc2F2ZWRUYXNrcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRBbGxUYXNrcygpIHtcclxuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcclxuICAgICAgICB2YXIgc2F2ZWRUYXNrcyA9IEpTT04ucGFyc2UoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidGFza3NcIiwgXCJ7fVwiKSk7XHJcbiAgICAgICAgLy9wcm9icyB3YW50IHRvIHNvcnQgYnkgZGF0ZS4uLlxyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzYXZlZFRhc2tzKS5tYXAoa2V5ID0+IHNhdmVkVGFza3Nba2V5XSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFRhc2tCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcclxuICAgICAgICB2YXIgc2F2ZWRUYXNrcyA9IEpTT04ucGFyc2UoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidGFza3NcIiwgXCJ7fVwiKSk7XHJcbiAgICAgICAgcmV0dXJuIDxUYXNrPihzYXZlZFRhc2tzW2lkXSk7XHJcbiAgICB9XHJcblxyXG59Il19