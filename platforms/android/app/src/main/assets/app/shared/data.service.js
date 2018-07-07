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
    /* Return a list of tasks sorted by most recent */
    SystemDataService.prototype.loadAllTasks = function () {
        var savedTasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
        var taskList = Object.keys(savedTasks).map(function (key) { return savedTasks[key]; });
        //sort the tasks in descending order of time modified
        return taskList.sort(function (a, b) { return b.modifiedTimestamp - a.modifiedTimestamp; });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDLG9DQUFzQztBQUN0QywwQ0FBNEM7QUFJNUM7SUFEQTtRQUdJLGdCQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUE2R2xELENBQUM7SUEzR1csOENBQWtCLEdBQTFCLFVBQTJCLFFBQWdCO1FBQ3ZDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRU8scUNBQVMsR0FBakIsVUFBa0IsVUFBVSxFQUFFLElBQVU7UUFDcEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDJDQUFlLEdBQWYsVUFBZ0IsSUFBVSxFQUFFLFVBQWtCO1FBQTlDLGlCQW1CQztRQWxCRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQVUsVUFBQyxPQUFPO1lBQ2hDLElBQUksT0FBTyxHQUFHO2dCQUNWLEtBQUssRUFBRSxrQkFBa0I7Z0JBQ3pCLE9BQU8sRUFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRywrQ0FBK0M7Z0JBQ3JGLFlBQVksRUFBRSxLQUFLO2dCQUNuQixnQkFB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LENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELDZDQUFpQixHQUFqQixVQUFrQixhQUE0QjtRQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQTdHUSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTtPQUNBLGlCQUFpQixDQStHN0I7SUFBRCx3QkFBQztDQUFBLEFBL0dELElBK0dDO0FBL0dZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tIFwibmF0aXZlc2NyaXB0LXRvYXN0XCI7XHJcbmltcG9ydCB7IFRpbWVyU2V0dGluZ3MgfSBmcm9tIFwifi9zaGFyZWQvc2V0dGluZ3MvdGltZXItc2V0dGluZ3MubW9kZWxcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN5c3RlbURhdGFTZXJ2aWNlIHtcclxuXHJcbiAgICBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcclxuXHJcbiAgICBwcml2YXRlIHNhdmVTdWNjZXNzTWVzc2FnZSh0YXNrTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgVG9hc3QubWFrZVRleHQoXCJTYXZlIHN1Y2Nlc3NmdWwhXCIpLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdyaXRlVGFzayhzYXZlZFRhc2tzLCB0YXNrOiBUYXNrKSB7XHJcbiAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRhc2subW9kaWZpZWRUaW1lc3RhbXAgPSBkLmdldFRpbWUoKTtcclxuICAgICAgICBzYXZlZFRhc2tzW3Rhc2submFtZV0gPSB0YXNrO1xyXG4gICAgICAgIGxldCBuZXdUYXNrcyA9IEpTT04uc3RyaW5naWZ5KHNhdmVkVGFza3MpO1xyXG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGFza3NcIiwgbmV3VGFza3MpO1xyXG4gICAgICAgIHRoaXMuc2F2ZVN1Y2Nlc3NNZXNzYWdlKHRhc2submFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcndyaXRpbmdEYXRhKHRhc2s6IFRhc2ssIHNhdmVkVGFza3M6IE9iamVjdCk6IFByb21pc2U8Qm9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxCb29sZWFuPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIk92ZXJ3cml0aW5nIGRhdGFcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHJvdXRpbmUgXCIgKyB0YXNrLm5hbWUgKyBcIiBhbHJlYWR5IGV4aXN0cy4gRG8geW91IHdhbnQgdG8gb3ZlcndyaXRlIGl0P1wiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlllc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiLFxyXG4gICAgICAgICAgICAgICAgbmV1dHJhbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9PdmVyd3JpdGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3YW50c1RvT3ZlcndyaXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0ZVRhc2soc2F2ZWRUYXNrcywgdGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBBdHRlbXB0cyB0byBzYXZlIHRhc2suIFJldHVybnMgdHJ1ZSBvbiBzdWNjZXNzIGFuZCBmYWxzZSBpZiB0aGUgdXNlciBkZWNpZGVzIG5vdCB0byBzYXZlLiAqL1xyXG4gICAgc2F2ZU5ld1Rhc2sodGFzazogVGFzaywgcHJvbXB0Rm9yT3ZlcndyaXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEJvb2xlYW4+KCAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgc2F2ZWRUYXNrcyA9IEpTT04ucGFyc2UodGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0YXNrc1wiLCBcInt9XCIpKTtcclxuICAgICAgICAgICAgLy9zaG91bGQgc2hvdyBhbiBvdmVyd3JpdGUgbW9kYWwgaWZmIHRoZSB1c2VyIGRpZG4ndCBnZXQgaGVyZSBieSBpbnRlbnRpb25hbGx5XHJcbiAgICAgICAgICAgIC8vZWRpdGluZyB0aGUgYWN0aXZpdHkgdGhleSdyZSBvdmVyd3JpdGluZywgc2luY2Ugb3RoZXJ3aXNlIGl0J3Mgb2J2aW91cy9hbm5veWluZ1xyXG4gICAgICAgICAgICBpZiAocHJvbXB0Rm9yT3ZlcndyaXRlICYmIHNhdmVkVGFza3NbdGFzay5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVyd3JpdGluZ0RhdGEodGFzaywgc2F2ZWRUYXNrcykudGhlbigob3Zlcndyb3RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG92ZXJ3cm90ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRlVGFzayhzYXZlZFRhc2tzLCB0YXNrKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUYXNrKHRhc2s6IFRhc2spIHtcclxuICAgICAgICBsZXQgc2F2ZWRUYXNrcyA9IEpTT04ucGFyc2UodGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0YXNrc1wiLCBcInt9XCIpKTtcclxuICAgICAgICBkZWxldGUgc2F2ZWRUYXNrc1t0YXNrLm5hbWVdO1xyXG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkoc2F2ZWRUYXNrcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFJldHVybiBhIGxpc3Qgb2YgdGFza3Mgc29ydGVkIGJ5IG1vc3QgcmVjZW50ICovXHJcbiAgICBsb2FkQWxsVGFza3MoKSB7XHJcbiAgICAgICAgbGV0IHNhdmVkVGFza3MgPSBKU09OLnBhcnNlKHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidGFza3NcIiwgXCJ7fVwiKSk7XHJcbiAgICAgICAgbGV0IHRhc2tMaXN0ID0gT2JqZWN0LmtleXMoc2F2ZWRUYXNrcykubWFwKGtleSA9PiBzYXZlZFRhc2tzW2tleV0pO1xyXG4gICAgICAgIC8vc29ydCB0aGUgdGFza3MgaW4gZGVzY2VuZGluZyBvcmRlciBvZiB0aW1lIG1vZGlmaWVkXHJcbiAgICAgICAgcmV0dXJuIHRhc2tMaXN0LnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGIubW9kaWZpZWRUaW1lc3RhbXAgLSBhLm1vZGlmaWVkVGltZXN0YW1wIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUYXNrQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNhdmVkVGFza3MgPSBKU09OLnBhcnNlKHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidGFza3NcIiwgXCJ7fVwiKSk7XHJcbiAgICAgICAgcmV0dXJuIDxUYXNrPihzYXZlZFRhc2tzW2lkXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogUmVzZXQgdGhlIHNldHRpbmdzIHRvIHRoZWlyIGRlZmF1bHRzIGlmIHRoZXkndmUgbmV2ZXIgYmVlbiBzZXQgb3IgaGF2ZSBiZWVuIHdpcGVkIGZyb20gbWVtb3J5XHJcbiAgICAoYW5kIHNvIGFyZSB1bmRlZmluZWQpICovXHJcbiAgICBzZXRTZXR0aW5nc0lmTm9uZSgpIHtcclxuICAgICAgICBsZXQgbmVlZFRvU2F2ZVNldHRpbmdzID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gPFRpbWVyU2V0dGluZ3M+SlNPTi5wYXJzZSh0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInRpbWVyX3NldHRpbmdzXCIsIFwie31cIikpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3Mud2FudHNUb25lID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG5lZWRUb1NhdmVTZXR0aW5ncyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLndhbnRzVG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRpbnVvdXNUb25lID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy53YW50c1ZpYnJhdGUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgbmVlZFRvU2F2ZVNldHRpbmdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0dGluZ3Mud2FudHNWaWJyYXRlID0gdHJ1ZTsgLy9pbiBjYXNlIGRldmljZSB2b2x1bWUncyBtdXRlZCB0byBiZWdpbiB3aXRoXHJcbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRpbnVvdXNWaWJyYXRlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZWVkVG9TYXZlU2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0aW1lcl9zZXR0aW5nc1wiLCBKU09OLnN0cmluZ2lmeShzZXR0aW5ncykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBSZXR1cm5zIHRoZSB1c2VyIHNldHRpbmdzIChwcmVmZXJlbmNlcykgYXMgYSBUaW1lclNldHRpbmdzIG9iamVjdC4gQXNzdW1lcyB0aGVzZSBzZXR0aW5nc1xyXG4gICAgZXhpc3Qgc2luY2UsIGlmIHRoZXkgZGlkbid0IGV4aXN0LCB0aGV5IHdlcmUgcmUtY3JlYXRlZCB3aGVuIHRoZSBhcHAgc3RhcnRlZCB1cCBieVxyXG4gICAgdGhpcy5zZXRTZXR0aW5nc0lmTm9uZSgpLiAqL1xyXG4gICAgZ2V0VGltZXJTZXR0aW5ncygpIHtcclxuICAgICAgICByZXR1cm4gPFRpbWVyU2V0dGluZ3M+SlNPTi5wYXJzZSh0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInRpbWVyX3NldHRpbmdzXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVGltZXJTZXR0aW5ncyh0aW1lclNldHRpbmdzOiBUaW1lclNldHRpbmdzKSB7XHJcbiAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0aW1lcl9zZXR0aW5nc1wiLCBKU09OLnN0cmluZ2lmeSh0aW1lclNldHRpbmdzKSk7XHJcbiAgICB9XHJcblxyXG59Il19