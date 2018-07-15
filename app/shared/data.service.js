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
            this.tasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
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
    SystemDataService.prototype.loadTaskById = function (id) {
        var savedTasks = this.getOrCreateTaskList();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDLG9DQUFzQztBQUN0QywwQ0FBNEM7QUFJNUM7SUFEQTtRQUdJLGdCQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEMsa0JBQWEsR0FBa0IsSUFBSSxDQUFDLENBQUMsd0NBQXdDO1FBQzdFLFVBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxvREFBb0Q7SUFnSTlFLENBQUM7SUE5SFcsOENBQWtCLEdBQTFCLFVBQTJCLFFBQWdCO1FBQ3ZDLEtBQUssQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRU8scUNBQVMsR0FBakIsVUFBa0IsVUFBVSxFQUFFLElBQVU7UUFDcEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDJDQUFlLEdBQWYsVUFBZ0IsSUFBVSxFQUFFLFVBQWtCO1FBQTlDLGlCQW1CQztRQWxCRyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQVUsVUFBQyxPQUFPO1lBQ2hDLElBQUksT0FBTyxH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UUFBUSxDQUFDLGtCQUFrQixLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckQsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxxREFBcUQ7UUFDOUYsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztJQUNMLENBQUM7SUFFRDs7Z0NBRTRCO0lBQzVCLDRDQUFnQixHQUFoQjtRQUNJLHlDQUF5QztRQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQWtCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ2pHLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQsNkNBQWlCLEdBQWpCLFVBQWtCLGFBQTRCO1FBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxDQUFDLGlEQUFpRDtJQUN6RixDQUFDO0lBbElRLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO09BQ0EsaUJBQWlCLENBb0k3QjtJQUFELHdCQUFDO0NBQUEsQUFwSUQsSUFvSUM7QUFwSVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrL3Rhc2subW9kZWxcIjtcclxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcclxuaW1wb3J0IHsgVGltZXJTZXR0aW5ncyB9IGZyb20gXCJ+L3NoYXJlZC9zZXR0aW5ncy90aW1lci1zZXR0aW5ncy5tb2RlbFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3lzdGVtRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG4gICAgcHJpdmF0ZSB0aW1lclNldHRpbmdzOiBUaW1lclNldHRpbmdzID0gbnVsbDsgLy9hIGNhY2hlZCB2ZXJzaW9uIG9mIHRoZSB0aW1lciBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSB0YXNrcyA9IG51bGw7IC8vYSBjYWNoZWQgdmVyc2lvbiBvZiB0aGUgdGFza3MgbGlzdCBpbiB0aGUgYXBwIGRhdGFcclxuXHJcbiAgICBwcml2YXRlIHNhdmVTdWNjZXNzTWVzc2FnZSh0YXNrTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgVG9hc3QubWFrZVRleHQoXCJTYXZlIHN1Y2Nlc3NmdWwhXCIpLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdyaXRlVGFzayhzYXZlZFRhc2tzLCB0YXNrOiBUYXNrKSB7XHJcbiAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRhc2subW9kaWZpZWRUaW1lc3RhbXAgPSBkLmdldFRpbWUoKTtcclxuICAgICAgICBzYXZlZFRhc2tzW3Rhc2submFtZV0gPSB0YXNrO1xyXG4gICAgICAgIGxldCBuZXdUYXNrcyA9IEpTT04uc3RyaW5naWZ5KHNhdmVkVGFza3MpO1xyXG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGFza3NcIiwgbmV3VGFza3MpO1xyXG4gICAgICAgIHRoaXMudGFza3MgPSBzYXZlZFRhc2tzO1xyXG4gICAgICAgIHRoaXMuc2F2ZVN1Y2Nlc3NNZXNzYWdlKHRhc2submFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcndyaXRpbmdEYXRhKHRhc2s6IFRhc2ssIHNhdmVkVGFza3M6IE9iamVjdCk6IFByb21pc2U8Qm9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxCb29sZWFuPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIk92ZXJ3cml0aW5nIGRhdGFcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHJvdXRpbmUgXCIgKyB0YXNrLm5hbWUgKyBcIiBhbHJlYWR5IGV4aXN0cy4gRG8geW91IHdhbnQgdG8gb3ZlcndyaXRlIGl0P1wiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlllc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiLFxyXG4gICAgICAgICAgICAgICAgbmV1dHJhbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9PdmVyd3JpdGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3YW50c1RvT3ZlcndyaXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0ZVRhc2soc2F2ZWRUYXNrcywgdGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBBdHRlbXB0cyB0byBzYXZlIHRhc2suIFJldHVybnMgdHJ1ZSBvbiBzdWNjZXNzIGFuZCBmYWxzZSBpZiB0aGUgdXNlciBkZWNpZGVzIG5vdCB0byBzYXZlLiAqL1xyXG4gICAgc2F2ZU5ld1Rhc2sodGFzazogVGFzaywgcHJvbXB0Rm9yT3ZlcndyaXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEJvb2xlYW4+KCAocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgc2F2ZWRUYXNrcyA9IHRoaXMuZ2V0T3JDcmVhdGVUYXNrTGlzdCgpO1xyXG4gICAgICAgICAgICAvL3Nob3VsZCBzaG93IGFuIG92ZXJ3cml0ZSBtb2RhbCBpZmYgdGhlIHVzZXIgZGlkbid0IGdldCBoZXJlIGJ5IGludGVudGlvbmFsbHlcclxuICAgICAgICAgICAgLy9lZGl0aW5nIHRoZSBhY3Rpdml0eSB0aGV5J3JlIG92ZXJ3cml0aW5nLCBzaW5jZSBvdGhlcndpc2UgaXQncyBvYnZpb3VzL2Fubm95aW5nXHJcbiAgICAgICAgICAgIGlmIChwcm9tcHRGb3JPdmVyd3JpdGUgJiYgc2F2ZWRUYXNrc1t0YXNrLm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJ3cml0aW5nRGF0YSh0YXNrLCBzYXZlZFRhc2tzKS50aGVuKChvdmVyd3JvdGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3Zlcndyb3RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVUYXNrKHNhdmVkVGFza3MsIHRhc2spO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T3JDcmVhdGVUYXNrTGlzdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudGFza3MpIHtcclxuICAgICAgICAgICAgdGhpcy50YXNrcyA9IEpTT04ucGFyc2UodGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0YXNrc1wiLCBcInt9XCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3M7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlVGFzayh0YXNrOiBUYXNrKSB7XHJcbiAgICAgICAgbGV0IHNhdmVkVGFza3MgPSB0aGlzLmdldE9yQ3JlYXRlVGFza0xpc3QoKTtcclxuICAgICAgICBkZWxldGUgc2F2ZWRUYXNrc1t0YXNrLm5hbWVdO1xyXG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkoc2F2ZWRUYXNrcykpO1xyXG4gICAgICAgIHRoaXMudGFza3MgPSBzYXZlZFRhc2tzOyAvL3VwZGF0ZSB0aGUgY2FjaGVkIHZlcnNpb25cclxuICAgIH1cclxuXHJcbiAgICAvKiBSZXR1cm4gYSBsaXN0IG9mIHRhc2tzIHNvcnRlZCBieSBtb3N0IHJlY2VudCAqL1xyXG4gICAgbG9hZEFsbFRhc2tzKCkge1xyXG4gICAgICAgIGxldCBzYXZlZFRhc2tzID0gdGhpcy5nZXRPckNyZWF0ZVRhc2tMaXN0KCk7XHJcbiAgICAgICAgbGV0IHRhc2tMaXN0ID0gT2JqZWN0LmtleXMoc2F2ZWRUYXNrcykubWFwKGtleSA9PiBzYXZlZFRhc2tzW2tleV0pO1xyXG4gICAgICAgIC8vc29ydCB0aGUgdGFza3MgaW4gZGVzY2VuZGluZyBvcmRlciBvZiB0aW1lIG1vZGlmaWVkXHJcbiAgICAgICAgcmV0dXJuIHRhc2tMaXN0LnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGIubW9kaWZpZWRUaW1lc3RhbXAgLSBhLm1vZGlmaWVkVGltZXN0YW1wIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUYXNrQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNhdmVkVGFza3MgPSB0aGlzLmdldE9yQ3JlYXRlVGFza0xpc3QoKTtcclxuICAgICAgICByZXR1cm4gPFRhc2s+KHNhdmVkVGFza3NbaWRdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBSZXNldCB0aGUgc2V0dGluZ3MgdG8gdGhlaXIgZGVmYXVsdHMgaWYgdGhleSd2ZSBuZXZlciBiZWVuIHNldCBvciBoYXZlIGJlZW4gd2lwZWQgZnJvbSBtZW1vcnlcclxuICAgIChhbmQgc28gYXJlIHVuZGVmaW5lZCkgKi9cclxuICAgIHNldFNldHRpbmdzSWZOb25lKCkge1xyXG4gICAgICAgIGxldCBuZWVkVG9TYXZlU2V0dGluZ3MgPSBmYWxzZTtcclxuICAgICAgICBsZXQgc2V0dGluZ3MgPSA8VGltZXJTZXR0aW5ncz5KU09OLnBhcnNlKHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidGltZXJfc2V0dGluZ3NcIiwgXCJ7fVwiKSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy53YW50c1RvbmUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgbmVlZFRvU2F2ZVNldHRpbmdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0dGluZ3Mud2FudHNUb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0dGluZ3MuY29udGludW91c1RvbmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy53YW50c1ZpYnJhdGUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgbmVlZFRvU2F2ZVNldHRpbmdzID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0dGluZ3Mud2FudHNWaWJyYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0dGluZ3MuY29udGludW91c1ZpYnJhdGUgPSB0cnVlOyAvL0kgZmluZCBJIHByZWZlciB2aWJyYXRpb24gZm9yIGFsYXJtcywgc28gdGhpcyBpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2EgZGVmYXVsdCBmb3Igbm93XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3Mud2FudHNOb3RpZmljYXRpb25zID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG5lZWRUb1NhdmVTZXR0aW5ncyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLndhbnRzTm90aWZpY2F0aW9ucyA9IGZhbHNlOyAvL2Rvbid0IHVzZSBub3RpZmljYXRpb25zIGJ5IGRlZmF1bHQ6IGNhbiBiZSBhbm5veWluZ1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmVlZFRvU2F2ZVNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGltZXJfc2V0dGluZ3NcIiwgSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogUmV0dXJucyB0aGUgdXNlciBzZXR0aW5ncyAocHJlZmVyZW5jZXMpIGFzIGEgVGltZXJTZXR0aW5ncyBvYmplY3QuIEFzc3VtZXMgdGhlc2Ugc2V0dGluZ3NcclxuICAgIGV4aXN0IHNpbmNlLCBpZiB0aGV5IGRpZG4ndCBleGlzdCwgdGhleSB3ZXJlIHJlLWNyZWF0ZWQgd2hlbiB0aGUgYXBwIHN0YXJ0ZWQgdXAgYnlcclxuICAgIHRoaXMuc2V0U2V0dGluZ3NJZk5vbmUoKS4gKi9cclxuICAgIGdldFRpbWVyU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgLy9yZWxvYWQgdGhpcy5zZXR0aW5ncyBvbiBhIGZyZXNoIHJlc3RhcnRcclxuICAgICAgICBpZiAoISB0aGlzLnRpbWVyU2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lclNldHRpbmdzID0gPFRpbWVyU2V0dGluZ3M+SlNPTi5wYXJzZSh0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInRpbWVyX3NldHRpbmdzXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXJTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVGltZXJTZXR0aW5ncyh0aW1lclNldHRpbmdzOiBUaW1lclNldHRpbmdzKSB7XHJcbiAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0aW1lcl9zZXR0aW5nc1wiLCBKU09OLnN0cmluZ2lmeSh0aW1lclNldHRpbmdzKSk7XHJcbiAgICAgICAgdGhpcy50aW1lclNldHRpbmdzID0gdGltZXJTZXR0aW5nczsgLy91cGRhdGUgdGhlIGNhY2hlZCB2ZXJzaW9uIG9mIHRoZSB0aW1lciBzZXR0aW5nc1xyXG4gICAgfVxyXG5cclxufSJdfQ==