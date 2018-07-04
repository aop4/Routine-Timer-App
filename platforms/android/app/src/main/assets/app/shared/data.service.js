"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var Toast = require("nativescript-toast");
var SystemDataService = /** @class */ (function () {
    function SystemDataService() {
        this.appSettings = require("application-settings");
    }
    SystemDataService.prototype.saveSuccessMessage = function (taskName) {
        Toast.makeText("Save successful!").show();
    };
    SystemDataService.prototype.writeTask = function (savedTasks, task) {
        var d = new Date();
        task.modifiedTimestamp = d.getTime();
        savedTasks[task.name] = task;
        var newTasks = JSON.stringify(savedTasks);
        this.appSettings.setString("tasks", newTasks);
        this.saveSuccessMessage(task.name);
    };
    SystemDataService.prototype.overwritingData = function (task, savedTasks) {
        var _this = this;
        return new Promise(function (resolve) {
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
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    };
    /* Attempts to save task. Returns true on success and false if the user decides not to save. */
    SystemDataService.prototype.saveNewTask = function (task, promptForOverwrite) {
        var _this = this;
        return new Promise(function (resolve) {
            var savedTasks = JSON.parse(_this.appSettings.getString("tasks", "{}"));
            //should show an overwrite modal iff the user didn't get here by intentionally
            //editing the activity they're overwriting, since otherwise it's obvious/annoying
            if (promptForOverwrite && savedTasks[task.name]) {
                _this.overwritingData(task, savedTasks).then(function (overwrote) {
                    console.log("overwrote: " + overwrote);
                    if (overwrote) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                _this.writeTask(savedTasks, task);
                resolve(true);
            }
        });
    };
    SystemDataService.prototype.deleteTask = function (task) {
        var savedTasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
        delete savedTasks[task.name];
        this.appSettings.setString("tasks", JSON.stringify(savedTasks));
    };
    SystemDataService.prototype.loadAllTasks = function () {
        var savedTasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
        //probs want to sort by date...
        return Object.keys(savedTasks).map(function (key) { return savedTasks[key]; });
    };
    SystemDataService.prototype.loadTaskById = function (id) {
        var savedTasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
        return (savedTasks[id]);
    };
    /* Reset the settings to their defaults if they've never been set or have been wiped from memory
    (and so are undefined) */
    SystemDataService.prototype.setSettingsIfNone = function () {
        var needToSaveSettings = false;
        var settings = JSON.parse(this.appSettings.getString("timer_settings", "{}"));
        if (typeof settings.wantsTone === "undefined") {
            needToSaveSettings = true;
            settings.wantsTone = true;
            settings.continuousTone = true;
        }
        if (typeof settings.wantsVibrate === "undefined") {
            needToSaveSettings = true;
            settings.wantsVibrate = true; //in case device volume's muted to begin with
            settings.continuousVibrate = false;
        }
        if (needToSaveSettings) {
            this.appSettings.setString("timer_settings", JSON.stringify(settings));
        }
    };
    /* Returns the user settings (preferences) as a TimerSettings object. Assumes these settings
    exist since, if they didn't exist, they were re-created when the app started up by
    this.setSettingsIfNone(). */
    SystemDataService.prototype.getTimerSettings = function () {
        return JSON.parse(this.appSettings.getString("timer_settings"));
    };
    SystemDataService.prototype.saveTimerSettings = function (timerSettings) {
        this.appSettings.setString("timer_settings", JSON.stringify(timerSettings));
    };
    SystemDataService = __decorate([
        core_1.Injectable()
    ], SystemDataService);
    return SystemDataService;
}());
exports.SystemDataService = SystemDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDLG9DQUFzQztBQUN0QywwQ0FBNEM7QUFJNUM7SUFEQTtRQUdJLGdCQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUE0R2xELENBQUM7SUExR1csOENBQWtCLEdBQTFCLFVBQTJCLFFBQWdCO1FBQ3ZDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRU8scUNBQVMsR0FBakIsVUFBa0IsVUFBVSxFQUFFLElBQVU7UUFDcEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDJDQUFlLEdBQWYsVUFBZ0IsSUFBVSxFQUFFLFVBQWtCO1FBQTlDLGlCQW1CQztRQWxCRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQVUsVUFBQyxPQUFPO1lBQ2hDLElBQUksT0FBTyxHQUFHO2dCQUNWLEtBQUssRUFBRSxrQkFBa0I7Z0JBQ3pCLE9BQU8sRUFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRywrQ0FBK0M7Z0JBQ3JGLFlBQVksRUFBRSxLQUFLO2dCQUNuQixnQkFB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QUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUE1R1EsaUJBQWlCO1FBRDdCLGlCQUFVLEVBQUU7T0FDQSxpQkFBaUIsQ0E4RzdCO0lBQUQsd0JBQUM7Q0FBQSxBQTlHRCxJQThHQztBQTlHWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2svdGFzay5tb2RlbFwiO1xyXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xyXG5pbXBvcnQgeyBUaW1lclNldHRpbmdzIH0gZnJvbSBcIn4vc2hhcmVkL3NldHRpbmdzL3RpbWVyLXNldHRpbmdzLm1vZGVsXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTeXN0ZW1EYXRhU2VydmljZSB7XHJcblxyXG4gICAgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlU3VjY2Vzc01lc3NhZ2UodGFza05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIFRvYXN0Lm1ha2VUZXh0KFwiU2F2ZSBzdWNjZXNzZnVsIVwiKS5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3cml0ZVRhc2soc2F2ZWRUYXNrcywgdGFzazogVGFzaykge1xyXG4gICAgICAgIGxldCBkID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0YXNrLm1vZGlmaWVkVGltZXN0YW1wID0gZC5nZXRUaW1lKCk7XHJcbiAgICAgICAgc2F2ZWRUYXNrc1t0YXNrLm5hbWVdID0gdGFzaztcclxuICAgICAgICBsZXQgbmV3VGFza3MgPSBKU09OLnN0cmluZ2lmeShzYXZlZFRhc2tzKTtcclxuICAgICAgICB0aGlzLmFwcFNldHRpbmdzLnNldFN0cmluZyhcInRhc2tzXCIsIG5ld1Rhc2tzKTtcclxuICAgICAgICB0aGlzLnNhdmVTdWNjZXNzTWVzc2FnZSh0YXNrLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJ3cml0aW5nRGF0YSh0YXNrOiBUYXNrLCBzYXZlZFRhc2tzOiBPYmplY3QpOiBQcm9taXNlPEJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Qm9vbGVhbj4oKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJPdmVyd3JpdGluZyBkYXRhXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlRoZSByb3V0aW5lIFwiICsgdGFzay5uYW1lICsgXCIgYWxyZWFkeSBleGlzdHMuIERvIHlvdSB3YW50IHRvIG92ZXJ3cml0ZSBpdD9cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJZZXNcIixcclxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIixcclxuICAgICAgICAgICAgICAgIG5ldXRyYWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKCh3YW50c1RvT3ZlcndyaXRlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2FudHNUb092ZXJ3cml0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVUYXNrKHNhdmVkVGFza3MsIHRhc2spXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBBdHRlbXB0cyB0byBzYXZlIHRhc2suIFJldHVybnMgdHJ1ZSBvbiBzdWNjZXNzIGFuZCBmYWxzZSBpZiB0aGUgdXNlciBkZWNpZGVzIG5vdCB0byBzYXZlLiAqL1xyXG4gICAgc2F2ZU5ld1Rhc2sodGFzazogVGFzaywgcHJvbXB0Rm9yT3ZlcndyaXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEJvb2xlYW4+KCAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgc2F2ZWRUYXNrcyA9IEpTT04ucGFyc2UodGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0YXNrc1wiLCBcInt9XCIpKTtcclxuICAgICAgICAgICAgLy9zaG91bGQgc2hvdyBhbiBvdmVyd3JpdGUgbW9kYWwgaWZmIHRoZSB1c2VyIGRpZG4ndCBnZXQgaGVyZSBieSBpbnRlbnRpb25hbGx5XHJcbiAgICAgICAgICAgIC8vZWRpdGluZyB0aGUgYWN0aXZpdHkgdGhleSdyZSBvdmVyd3JpdGluZywgc2luY2Ugb3RoZXJ3aXNlIGl0J3Mgb2J2aW91cy9hbm5veWluZ1xyXG4gICAgICAgICAgICBpZiAocHJvbXB0Rm9yT3ZlcndyaXRlICYmIHNhdmVkVGFza3NbdGFzay5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVyd3JpdGluZ0RhdGEodGFzaywgc2F2ZWRUYXNrcykudGhlbigob3Zlcndyb3RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvdmVyd3JvdGU6IFwiK292ZXJ3cm90ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cm90ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVUYXNrKHNhdmVkVGFza3MsIHRhc2spO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVRhc2sodGFzazogVGFzaykge1xyXG4gICAgICAgIGxldCBzYXZlZFRhc2tzID0gSlNPTi5wYXJzZSh0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInRhc2tzXCIsIFwie31cIikpO1xyXG4gICAgICAgIGRlbGV0ZSBzYXZlZFRhc2tzW3Rhc2submFtZV07XHJcbiAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeShzYXZlZFRhc2tzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEFsbFRhc2tzKCkge1xyXG4gICAgICAgIGxldCBzYXZlZFRhc2tzID0gSlNPTi5wYXJzZSh0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInRhc2tzXCIsIFwie31cIikpO1xyXG4gICAgICAgIC8vcHJvYnMgd2FudCB0byBzb3J0IGJ5IGRhdGUuLi5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoc2F2ZWRUYXNrcykubWFwKGtleSA9PiBzYXZlZFRhc2tzW2tleV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUYXNrQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNhdmVkVGFza3MgPSBKU09OLnBhcnNlKHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidGFza3NcIiwgXCJ7fVwiKSk7XHJcbiAgICAgICAgcmV0dXJuIDxUYXNrPihzYXZlZFRhc2tzW2lkXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogUmVzZXQgdGhlIHNldHRpbmdzIHRvIHRoZWlyIGRlZmF1bHRzIGlmIHRoZXkndmUgbmV2ZXIgYmVlbiBzZXQgb3IgaGF2ZSBiZWVuIHdpcGVkIGZyb20gbWVtb3J5XHJcbiAgICAoYW5kIHNvIGFyZSB1bmRlZmluZWQpICovXHJcbiAgICBzZXRTZXR0aW5nc0lmTm9uZSgpIHtcclxuICAgICAgICBsZXQgbmVlZFRvU2F2ZVNldHRpbmdzID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gPFRpbWVyU2V0dGluZ3M+SlNPTi5wYXJzZSh0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInRpbWVyX3NldHRpbmdzXCIsIFwie31cIikpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3Mud2FudHNUb25lID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG5lZWRUb1NhdmVTZXR0aW5ncyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLndhbnRzVG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRpbnVvdXNUb25lID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy53YW50c1ZpYnJhdGUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgbmVlZFRvU2F2ZVNldHRpbmdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0dGluZ3Mud2FudHNWaWJyYXRlID0gdHJ1ZTsgLy9pbiBjYXNlIGRldmljZSB2b2x1bWUncyBtdXRlZCB0byBiZWdpbiB3aXRoXHJcbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRpbnVvdXNWaWJyYXRlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZWVkVG9TYXZlU2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0aW1lcl9zZXR0aW5nc1wiLCBKU09OLnN0cmluZ2lmeShzZXR0aW5ncykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBSZXR1cm5zIHRoZSB1c2VyIHNldHRpbmdzIChwcmVmZXJlbmNlcykgYXMgYSBUaW1lclNldHRpbmdzIG9iamVjdC4gQXNzdW1lcyB0aGVzZSBzZXR0aW5nc1xyXG4gICAgZXhpc3Qgc2luY2UsIGlmIHRoZXkgZGlkbid0IGV4aXN0LCB0aGV5IHdlcmUgcmUtY3JlYXRlZCB3aGVuIHRoZSBhcHAgc3RhcnRlZCB1cCBieVxyXG4gICAgdGhpcy5zZXRTZXR0aW5nc0lmTm9uZSgpLiAqL1xyXG4gICAgZ2V0VGltZXJTZXR0aW5ncygpIHtcclxuICAgICAgICByZXR1cm4gPFRpbWVyU2V0dGluZ3M+SlNPTi5wYXJzZSh0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInRpbWVyX3NldHRpbmdzXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVGltZXJTZXR0aW5ncyh0aW1lclNldHRpbmdzOiBUaW1lclNldHRpbmdzKSB7XHJcbiAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0aW1lcl9zZXR0aW5nc1wiLCBKU09OLnN0cmluZ2lmeSh0aW1lclNldHRpbmdzKSk7XHJcbiAgICB9XHJcblxyXG59Il19