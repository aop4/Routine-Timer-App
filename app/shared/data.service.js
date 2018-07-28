"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var Toast = require("nativescript-toast");
var SystemDataService = /** @class */ (function () {
    function SystemDataService() {
        this.appSettings = require("application-settings");
        this.timerSettings = null; //a cached version of the timer settings
        this.tasks = null; //a cached version of the tasks list in the app data
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
        this.tasks = savedTasks;
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
            var savedTasks = _this.getOrCreateTaskList();
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
    SystemDataService.prototype.getOrCreateTaskList = function () {
        if (!this.tasks) {
            this.refreshCache();
        }
        return this.tasks;
    };
    SystemDataService.prototype.deleteTask = function (task) {
        var savedTasks = this.getOrCreateTaskList();
        delete savedTasks[task.name];
        this.appSettings.setString("tasks", JSON.stringify(savedTasks));
        this.tasks = savedTasks; //update the cached version
    };
    /* Return a list of tasks sorted by most recent */
    SystemDataService.prototype.loadAllTasks = function () {
        var savedTasks = this.getOrCreateTaskList();
        var taskList = Object.keys(savedTasks).map(function (key) { return savedTasks[key]; });
        //sort the tasks in descending order of time modified
        return taskList.sort(function (a, b) { return b.modifiedTimestamp - a.modifiedTimestamp; });
    };
    /* Returns the stored version of the task with a name == id, as it's written in the machine. */
    SystemDataService.prototype.loadTaskById = function (id) {
        this.refreshCache();
        return this.tasks[id];
    };
    SystemDataService.prototype.refreshCache = function () {
        this.tasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
    };
    /* Reset the settings to their defaults if they've never been set or have been wiped from memory
    (and so are undefined) */
    SystemDataService.prototype.setSettingsIfNone = function () {
        var needToSaveSettings = false;
        var settings = JSON.parse(this.appSettings.getString("timer_settings", "{}"));
        if (typeof settings.wantsTone === "undefined") {
            needToSaveSettings = true;
            settings.wantsTone = true;
            settings.continuousTone = false;
        }
        if (typeof settings.wantsVibrate === "undefined") {
            needToSaveSettings = true;
            settings.wantsVibrate = true;
            settings.continuousVibrate = true; //I find I prefer vibration for alarms, so this is
            //a default for now
        }
        if (typeof settings.wantsNotifications === "undefined") {
            needToSaveSettings = true;
            settings.wantsNotifications = false; //don't use notifications by default: can be annoying
        }
        if (needToSaveSettings) {
            this.appSettings.setString("timer_settings", JSON.stringify(settings));
        }
    };
    /* Returns the user settings (preferences) as a TimerSettings object. Assumes these settings
    exist since, if they didn't exist, they were re-created when the app started up by
    this.setSettingsIfNone(). */
    SystemDataService.prototype.getTimerSettings = function () {
        //reload this.settings on a fresh restart
        if (!this.timerSettings) {
            this.timerSettings = JSON.parse(this.appSettings.getString("timer_settings"));
        }
        return this.timerSettings;
    };
    SystemDataService.prototype.saveTimerSettings = function (timerSettings) {
        this.appSettings.setString("timer_settings", JSON.stringify(timerSettings));
        this.timerSettings = timerSettings; //update the cached version of the timer settings
    };
    SystemDataService = __decorate([
        core_1.Injectable()
    ], SystemDataService);
    return SystemDataService;
}());
exports.SystemDataService = SystemDataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLG9DQUFzQztBQUN0QywwQ0FBNEM7QUFNNUM7SUFEQTtRQUdJLGdCQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEMsa0JBQWEsR0FBa0IsSUFBSSxDQUFDLENBQUMsd0NBQXdDO1FBQzdFLFVBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxvREFBb0Q7SUFxSTlFLENBQUM7SUFuSVcsOENBQWtCLEdBQTFCLFVBQTJCLFFBQWdCO1FBQ3ZDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRU8scUNBQVMsR0FBakIsVUFBa0IsVUFBVSxFQUFFLElBQVU7UUFDcEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDJDQUFlLEdBQWYsVUFBZ0IsSUFBVSxFQUFFLFVBQWtCO1FBQTlDLGlCQW1CQztRQWxCRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQVUsVUFBQyxPQUFPO1lBQ2hDLElBQUksT0FBTyxH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IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xyXG5cclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2svdGFzay5tb2RlbFwiO1xyXG5pbXBvcnQgeyBUaW1lclNldHRpbmdzIH0gZnJvbSBcIn4vc2hhcmVkL3NldHRpbmdzL3RpbWVyLXNldHRpbmdzLm1vZGVsXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTeXN0ZW1EYXRhU2VydmljZSB7XHJcblxyXG4gICAgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XHJcbiAgICBwcml2YXRlIHRpbWVyU2V0dGluZ3M6IFRpbWVyU2V0dGluZ3MgPSBudWxsOyAvL2EgY2FjaGVkIHZlcnNpb24gb2YgdGhlIHRpbWVyIHNldHRpbmdzXHJcbiAgICBwcml2YXRlIHRhc2tzID0gbnVsbDsgLy9hIGNhY2hlZCB2ZXJzaW9uIG9mIHRoZSB0YXNrcyBsaXN0IGluIHRoZSBhcHAgZGF0YVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZVN1Y2Nlc3NNZXNzYWdlKHRhc2tOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBUb2FzdC5tYWtlVGV4dChcIlNhdmUgc3VjY2Vzc2Z1bCFcIikuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgd3JpdGVUYXNrKHNhdmVkVGFza3MsIHRhc2s6IFRhc2spIHtcclxuICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGFzay5tb2RpZmllZFRpbWVzdGFtcCA9IGQuZ2V0VGltZSgpO1xyXG4gICAgICAgIHNhdmVkVGFza3NbdGFzay5uYW1lXSA9IHRhc2s7XHJcbiAgICAgICAgbGV0IG5ld1Rhc2tzID0gSlNPTi5zdHJpbmdpZnkoc2F2ZWRUYXNrcyk7XHJcbiAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0YXNrc1wiLCBuZXdUYXNrcyk7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHNhdmVkVGFza3M7XHJcbiAgICAgICAgdGhpcy5zYXZlU3VjY2Vzc01lc3NhZ2UodGFzay5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVyd3JpdGluZ0RhdGEodGFzazogVGFzaywgc2F2ZWRUYXNrczogT2JqZWN0KTogUHJvbWlzZTxCb29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEJvb2xlYW4+KChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiT3ZlcndyaXRpbmcgZGF0YVwiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJUaGUgcm91dGluZSBcIiArIHRhc2submFtZSArIFwiIGFscmVhZHkgZXhpc3RzLiBEbyB5b3Ugd2FudCB0byBvdmVyd3JpdGUgaXQ/XCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiWWVzXCIsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIk5vXCIsXHJcbiAgICAgICAgICAgICAgICBuZXV0cmFsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucykudGhlbigod2FudHNUb092ZXJ3cml0ZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdhbnRzVG9PdmVyd3JpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRlVGFzayhzYXZlZFRhc2tzLCB0YXNrKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEF0dGVtcHRzIHRvIHNhdmUgdGFzay4gUmV0dXJucyB0cnVlIG9uIHN1Y2Nlc3MgYW5kIGZhbHNlIGlmIHRoZSB1c2VyIGRlY2lkZXMgbm90IHRvIHNhdmUuICovXHJcbiAgICBzYXZlTmV3VGFzayh0YXNrOiBUYXNrLCBwcm9tcHRGb3JPdmVyd3JpdGU6IGJvb2xlYW4pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Qm9vbGVhbj4oIChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBzYXZlZFRhc2tzID0gdGhpcy5nZXRPckNyZWF0ZVRhc2tMaXN0KCk7XHJcbiAgICAgICAgICAgIC8vc2hvdWxkIHNob3cgYW4gb3ZlcndyaXRlIG1vZGFsIGlmZiB0aGUgdXNlciBkaWRuJ3QgZ2V0IGhlcmUgYnkgaW50ZW50aW9uYWxseVxyXG4gICAgICAgICAgICAvL2VkaXRpbmcgdGhlIGFjdGl2aXR5IHRoZXkncmUgb3ZlcndyaXRpbmcsIHNpbmNlIG90aGVyd2lzZSBpdCdzIG9idmlvdXMvYW5ub3lpbmdcclxuICAgICAgICAgICAgaWYgKHByb21wdEZvck92ZXJ3cml0ZSAmJiBzYXZlZFRhc2tzW3Rhc2submFtZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcndyaXRpbmdEYXRhKHRhc2ssIHNhdmVkVGFza3MpLnRoZW4oKG92ZXJ3cm90ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdmVyd3JvdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZVRhc2soc2F2ZWRUYXNrcywgdGFzayk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRPckNyZWF0ZVRhc2tMaXN0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy50YXNrcykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hDYWNoZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy50YXNrcztcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVUYXNrKHRhc2s6IFRhc2spIHtcclxuICAgICAgICBsZXQgc2F2ZWRUYXNrcyA9IHRoaXMuZ2V0T3JDcmVhdGVUYXNrTGlzdCgpO1xyXG4gICAgICAgIGRlbGV0ZSBzYXZlZFRhc2tzW3Rhc2submFtZV07XHJcbiAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeShzYXZlZFRhc2tzKSk7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHNhdmVkVGFza3M7IC8vdXBkYXRlIHRoZSBjYWNoZWQgdmVyc2lvblxyXG4gICAgfVxyXG5cclxuICAgIC8qIFJldHVybiBhIGxpc3Qgb2YgdGFza3Mgc29ydGVkIGJ5IG1vc3QgcmVjZW50ICovXHJcbiAgICBsb2FkQWxsVGFza3MoKSB7XHJcbiAgICAgICAgbGV0IHNhdmVkVGFza3MgPSB0aGlzLmdldE9yQ3JlYXRlVGFza0xpc3QoKTtcclxuICAgICAgICBsZXQgdGFza0xpc3QgPSBPYmplY3Qua2V5cyhzYXZlZFRhc2tzKS5tYXAoa2V5ID0+IHNhdmVkVGFza3Nba2V5XSk7XHJcbiAgICAgICAgLy9zb3J0IHRoZSB0YXNrcyBpbiBkZXNjZW5kaW5nIG9yZGVyIG9mIHRpbWUgbW9kaWZpZWRcclxuICAgICAgICByZXR1cm4gdGFza0xpc3Quc29ydCgoYSwgYikgPT4geyByZXR1cm4gYi5tb2RpZmllZFRpbWVzdGFtcCAtIGEubW9kaWZpZWRUaW1lc3RhbXAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qIFJldHVybnMgdGhlIHN0b3JlZCB2ZXJzaW9uIG9mIHRoZSB0YXNrIHdpdGggYSBuYW1lID09IGlkLCBhcyBpdCdzIHdyaXR0ZW4gaW4gdGhlIG1hY2hpbmUuICovXHJcbiAgICBsb2FkVGFza0J5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaENhY2hlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3NbaWRdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaENhY2hlKCkge1xyXG4gICAgICAgIHRoaXMudGFza3MgPSBKU09OLnBhcnNlKHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidGFza3NcIiwgXCJ7fVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogUmVzZXQgdGhlIHNldHRpbmdzIHRvIHRoZWlyIGRlZmF1bHRzIGlmIHRoZXkndmUgbmV2ZXIgYmVlbiBzZXQgb3IgaGF2ZSBiZWVuIHdpcGVkIGZyb20gbWVtb3J5XHJcbiAgICAoYW5kIHNvIGFyZSB1bmRlZmluZWQpICovXHJcbiAgICBzZXRTZXR0aW5nc0lmTm9uZSgpIHtcclxuICAgICAgICBsZXQgbmVlZFRvU2F2ZVNldHRpbmdzID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gPFRpbWVyU2V0dGluZ3M+SlNPTi5wYXJzZSh0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInRpbWVyX3NldHRpbmdzXCIsIFwie31cIikpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3Mud2FudHNUb25lID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG5lZWRUb1NhdmVTZXR0aW5ncyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLndhbnRzVG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRpbnVvdXNUb25lID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3Mud2FudHNWaWJyYXRlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG5lZWRUb1NhdmVTZXR0aW5ncyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLndhbnRzVmlicmF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRpbnVvdXNWaWJyYXRlID0gdHJ1ZTsgLy9JIGZpbmQgSSBwcmVmZXIgdmlicmF0aW9uIGZvciBhbGFybXMsIHNvIHRoaXMgaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hIGRlZmF1bHQgZm9yIG5vd1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzLndhbnRzTm90aWZpY2F0aW9ucyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBuZWVkVG9TYXZlU2V0dGluZ3MgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy53YW50c05vdGlmaWNhdGlvbnMgPSBmYWxzZTsgLy9kb24ndCB1c2Ugbm90aWZpY2F0aW9ucyBieSBkZWZhdWx0OiBjYW4gYmUgYW5ub3lpbmdcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5lZWRUb1NhdmVTZXR0aW5ncykge1xyXG4gICAgICAgICAgICB0aGlzLmFwcFNldHRpbmdzLnNldFN0cmluZyhcInRpbWVyX3NldHRpbmdzXCIsIEpTT04uc3RyaW5naWZ5KHNldHRpbmdzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qIFJldHVybnMgdGhlIHVzZXIgc2V0dGluZ3MgKHByZWZlcmVuY2VzKSBhcyBhIFRpbWVyU2V0dGluZ3Mgb2JqZWN0LiBBc3N1bWVzIHRoZXNlIHNldHRpbmdzXHJcbiAgICBleGlzdCBzaW5jZSwgaWYgdGhleSBkaWRuJ3QgZXhpc3QsIHRoZXkgd2VyZSByZS1jcmVhdGVkIHdoZW4gdGhlIGFwcCBzdGFydGVkIHVwIGJ5XHJcbiAgICB0aGlzLnNldFNldHRpbmdzSWZOb25lKCkuICovXHJcbiAgICBnZXRUaW1lclNldHRpbmdzKCkge1xyXG4gICAgICAgIC8vcmVsb2FkIHRoaXMuc2V0dGluZ3Mgb24gYSBmcmVzaCByZXN0YXJ0XHJcbiAgICAgICAgaWYgKCEgdGhpcy50aW1lclNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXJTZXR0aW5ncyA9IDxUaW1lclNldHRpbmdzPkpTT04ucGFyc2UodGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0aW1lcl9zZXR0aW5nc1wiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVyU2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVRpbWVyU2V0dGluZ3ModGltZXJTZXR0aW5nczogVGltZXJTZXR0aW5ncykge1xyXG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGltZXJfc2V0dGluZ3NcIiwgSlNPTi5zdHJpbmdpZnkodGltZXJTZXR0aW5ncykpO1xyXG4gICAgICAgIHRoaXMudGltZXJTZXR0aW5ncyA9IHRpbWVyU2V0dGluZ3M7IC8vdXBkYXRlIHRoZSBjYWNoZWQgdmVyc2lvbiBvZiB0aGUgdGltZXIgc2V0dGluZ3NcclxuICAgIH1cclxuXHJcbn0iXX0=