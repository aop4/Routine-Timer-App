"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var Toast = require("nativescript-toast");
var SystemDataService = /** @class */ (function () {
    function SystemDataService() {
        this.appSettings = require("application-settings");
        this.timerSettings = null; //a cached version of the timer settings
        this.tasks = null; //a cached version of the tasks list saved in the app data
    }
    /* Display a "save successful" toast */
    SystemDataService.prototype.saveSuccessMessage = function (taskName) {
        Toast.makeText("Save successful!").show();
    };
    /* Saves a task to the system. savedTasks is the list of tasks
    alread in the system (at path "tasks").  */
    SystemDataService.prototype.writeTask = function (savedTasks, task) {
        //set the current time as a timestamp for the task's last save
        var d = new Date();
        task.modifiedTimestamp = d.getTime();
        //add the task to the system's saved tasks
        savedTasks[task.name] = task;
        var newTasks = JSON.stringify(savedTasks);
        this.appSettings.setString("tasks", newTasks);
        //refresh the cached version of the tasks
        this.tasks = savedTasks;
        this.saveSuccessMessage(task.name);
    };
    /* Warn the user that they're overwriting data if they save task task.
    If they want to overwrite, saves the task and returns a promise that
    resolves with the boolean value true. If they don't, does not save the
    task and returns a promise that resolves with false. */
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
    /* Attempts to save task. If promptForOverwrite is true, checks to see whether
    a task with the same name is already saved. If it is, the user is asked if they
    want to overwrite it. Returns a promise that resolves with true if a save is
    completed and false if the user decides not to save (because they don't want
    to overwrite data). */
    SystemDataService.prototype.saveNewTask = function (task, promptForOverwrite) {
        var _this = this;
        return new Promise(function (resolve) {
            var savedTasks = _this.getOrCreateTaskList();
            //if there's a danger of overwriting and promptForOverwrite is true
            if (promptForOverwrite && savedTasks[task.name]) {
                _this.overwritingData(task, savedTasks).then(function (overwrote) {
                    //if the user chose to overwrite
                    if (overwrote) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                //overwriting is not a concern; just save the task
                _this.writeTask(savedTasks, task);
                resolve(true);
            }
        });
    };
    /* Simply return the cached task list if possible. If there is
    no cached list, then reload it from memory and return it. */
    SystemDataService.prototype.getOrCreateTaskList = function () {
        if (!this.tasks) {
            this.refreshCache();
        }
        return this.tasks;
    };
    /* Delete the task with task's name from memory, if it exists. */
    SystemDataService.prototype.deleteTask = function (task) {
        var savedTasks = this.getOrCreateTaskList();
        delete savedTasks[task.name];
        this.appSettings.setString("tasks", JSON.stringify(savedTasks));
        this.tasks = savedTasks; //update the cached version
    };
    /* Return a list of tasks sorted by most recent */
    SystemDataService.prototype.loadAllTasks = function () {
        //retrieve the system's *object* full of task objects, which is 
        //formatted as {'taskName1': task1, 'taskName2':task2, ...}
        var savedTasks = this.getOrCreateTaskList();
        //get rid of the names and simply obtain an *array* of the tasks
        var taskList = Object.keys(savedTasks).map(function (key) { return savedTasks[key]; });
        //sort the task array in descending order of time modified
        return taskList.sort(function (a, b) { return b.modifiedTimestamp - a.modifiedTimestamp; });
    };
    /* Returns the stored version of the task with a name == id. */
    SystemDataService.prototype.loadTaskById = function (id) {
        this.refreshCache();
        return this.tasks[id];
    };
    /* Sets the cache to the system's saved task list */
    SystemDataService.prototype.refreshCache = function () {
        this.tasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
    };
    /* Scan the user's app settings and set them to their defaults if they've
    never been set or have been somehow wiped from memory (and so are undefined) */
    SystemDataService.prototype.setSettingsIfNone = function () {
        var needToSaveSettings = false; //whether the settings need to be saved to the system
        var settings = JSON.parse(this.appSettings.getString("timer_settings", "{}"));
        //if some setting is undefined, set it to its default and ensure the settings are saved
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
            settings.wantsNotifications = true;
        }
        if (needToSaveSettings) {
            //save the settings to system storage
            this.appSettings.setString("timer_settings", JSON.stringify(settings));
        }
    };
    /* Returns the user settings (preferences) as a TimerSettings object.
    Retrieves the cached settings if possible, and otherwise returns the
    settings stored in the system and refreshes the cache. Assumes the settings have been
    set since, if they didn't exist, they were re-created when the app started up by
    this.setSettingsIfNone(). */
    SystemDataService.prototype.getTimerSettings = function () {
        //reload this.settings on a fresh restart
        if (!this.timerSettings) {
            this.timerSettings = JSON.parse(this.appSettings.getString("timer_settings"));
        }
        return this.timerSettings;
    };
    /* Save timerSettings in storage, and update the cached version */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLG9DQUFzQztBQUN0QywwQ0FBNEM7QUFNNUM7SUFEQTtRQUdJLGdCQUFXLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEMsa0JBQWEsR0FBa0IsSUFBSSxDQUFDLENBQUMsd0NBQXdDO1FBQzdFLFVBQUssR0FBRyxJQUFJLENBQUMsQ0FBQywwREFBMEQ7SUFpS3BGLENBQUM7SUEvSkcsdUNBQXVDO0lBQy9CLDhDQUFrQixHQUExQixVQUEyQixRQUFnQjtRQUN2QyxLQUFLLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVEOytDQUMyQztJQUNuQyxxQ0FBUyxHQUFqQixVQUFrQixVQUFVLEVBQUUsSUFBVTtRQUNwQyw4REFBOEQ7UUFDOUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLDBDQUEwQztRQUMxQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5Qyx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7OzsyREFHdUQ7SUFDdkQsMkNBQWUsR0FBZixVQUFnQixJQUFVLEVB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UyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQyxpREFBaUQ7SUFDekYsQ0FBQztJQW5LUSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTtPQUNBLGlCQUFpQixDQXFLN0I7SUFBRCx3QkFBQztDQUFBLEFBcktELElBcUtDO0FBcktZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcclxuXHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrL3Rhc2subW9kZWxcIjtcclxuaW1wb3J0IHsgVGltZXJTZXR0aW5ncyB9IGZyb20gXCJ+L3NoYXJlZC9zZXR0aW5ncy90aW1lci1zZXR0aW5ncy5tb2RlbFwiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3lzdGVtRGF0YVNlcnZpY2Uge1xyXG5cclxuICAgIGFwcFNldHRpbmdzID0gcmVxdWlyZShcImFwcGxpY2F0aW9uLXNldHRpbmdzXCIpO1xyXG4gICAgcHJpdmF0ZSB0aW1lclNldHRpbmdzOiBUaW1lclNldHRpbmdzID0gbnVsbDsgLy9hIGNhY2hlZCB2ZXJzaW9uIG9mIHRoZSB0aW1lciBzZXR0aW5nc1xyXG4gICAgcHJpdmF0ZSB0YXNrcyA9IG51bGw7IC8vYSBjYWNoZWQgdmVyc2lvbiBvZiB0aGUgdGFza3MgbGlzdCBzYXZlZCBpbiB0aGUgYXBwIGRhdGFcclxuXHJcbiAgICAvKiBEaXNwbGF5IGEgXCJzYXZlIHN1Y2Nlc3NmdWxcIiB0b2FzdCAqL1xyXG4gICAgcHJpdmF0ZSBzYXZlU3VjY2Vzc01lc3NhZ2UodGFza05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIFRvYXN0Lm1ha2VUZXh0KFwiU2F2ZSBzdWNjZXNzZnVsIVwiKS5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2F2ZXMgYSB0YXNrIHRvIHRoZSBzeXN0ZW0uIHNhdmVkVGFza3MgaXMgdGhlIGxpc3Qgb2YgdGFza3NcclxuICAgIGFscmVhZCBpbiB0aGUgc3lzdGVtIChhdCBwYXRoIFwidGFza3NcIikuICAqL1xyXG4gICAgcHJpdmF0ZSB3cml0ZVRhc2soc2F2ZWRUYXNrcywgdGFzazogVGFzaykge1xyXG4gICAgICAgIC8vc2V0IHRoZSBjdXJyZW50IHRpbWUgYXMgYSB0aW1lc3RhbXAgZm9yIHRoZSB0YXNrJ3MgbGFzdCBzYXZlXHJcbiAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRhc2subW9kaWZpZWRUaW1lc3RhbXAgPSBkLmdldFRpbWUoKTtcclxuICAgICAgICAvL2FkZCB0aGUgdGFzayB0byB0aGUgc3lzdGVtJ3Mgc2F2ZWQgdGFza3NcclxuICAgICAgICBzYXZlZFRhc2tzW3Rhc2submFtZV0gPSB0YXNrO1xyXG4gICAgICAgIGxldCBuZXdUYXNrcyA9IEpTT04uc3RyaW5naWZ5KHNhdmVkVGFza3MpO1xyXG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGFza3NcIiwgbmV3VGFza3MpO1xyXG4gICAgICAgIC8vcmVmcmVzaCB0aGUgY2FjaGVkIHZlcnNpb24gb2YgdGhlIHRhc2tzXHJcbiAgICAgICAgdGhpcy50YXNrcyA9IHNhdmVkVGFza3M7XHJcbiAgICAgICAgdGhpcy5zYXZlU3VjY2Vzc01lc3NhZ2UodGFzay5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBXYXJuIHRoZSB1c2VyIHRoYXQgdGhleSdyZSBvdmVyd3JpdGluZyBkYXRhIGlmIHRoZXkgc2F2ZSB0YXNrIHRhc2suXHJcbiAgICBJZiB0aGV5IHdhbnQgdG8gb3ZlcndyaXRlLCBzYXZlcyB0aGUgdGFzayBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdFxyXG4gICAgcmVzb2x2ZXMgd2l0aCB0aGUgYm9vbGVhbiB2YWx1ZSB0cnVlLiBJZiB0aGV5IGRvbid0LCBkb2VzIG5vdCBzYXZlIHRoZVxyXG4gICAgdGFzayBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIGZhbHNlLiAqL1xyXG4gICAgb3ZlcndyaXRpbmdEYXRhKHRhc2s6IFRhc2ssIHNhdmVkVGFza3M6IE9iamVjdCk6IFByb21pc2U8Qm9vbGVhbj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxCb29sZWFuPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIk92ZXJ3cml0aW5nIGRhdGFcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHJvdXRpbmUgXCIgKyB0YXNrLm5hbWUgKyBcIiBhbHJlYWR5IGV4aXN0cy4gRG8geW91IHdhbnQgdG8gb3ZlcndyaXRlIGl0P1wiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlllc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiLFxyXG4gICAgICAgICAgICAgICAgbmV1dHJhbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9PdmVyd3JpdGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3YW50c1RvT3ZlcndyaXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0ZVRhc2soc2F2ZWRUYXNrcywgdGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBBdHRlbXB0cyB0byBzYXZlIHRhc2suIElmIHByb21wdEZvck92ZXJ3cml0ZSBpcyB0cnVlLCBjaGVja3MgdG8gc2VlIHdoZXRoZXJcclxuICAgIGEgdGFzayB3aXRoIHRoZSBzYW1lIG5hbWUgaXMgYWxyZWFkeSBzYXZlZC4gSWYgaXQgaXMsIHRoZSB1c2VyIGlzIGFza2VkIGlmIHRoZXlcclxuICAgIHdhbnQgdG8gb3ZlcndyaXRlIGl0LiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdHJ1ZSBpZiBhIHNhdmUgaXNcclxuICAgIGNvbXBsZXRlZCBhbmQgZmFsc2UgaWYgdGhlIHVzZXIgZGVjaWRlcyBub3QgdG8gc2F2ZSAoYmVjYXVzZSB0aGV5IGRvbid0IHdhbnRcclxuICAgIHRvIG92ZXJ3cml0ZSBkYXRhKS4gKi9cclxuICAgIHNhdmVOZXdUYXNrKHRhc2s6IFRhc2ssIHByb21wdEZvck92ZXJ3cml0ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxCb29sZWFuPiggKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgdmFyIHNhdmVkVGFza3MgPSB0aGlzLmdldE9yQ3JlYXRlVGFza0xpc3QoKTtcclxuICAgICAgICAgICAgLy9pZiB0aGVyZSdzIGEgZGFuZ2VyIG9mIG92ZXJ3cml0aW5nIGFuZCBwcm9tcHRGb3JPdmVyd3JpdGUgaXMgdHJ1ZVxyXG4gICAgICAgICAgICBpZiAocHJvbXB0Rm9yT3ZlcndyaXRlICYmIHNhdmVkVGFza3NbdGFzay5uYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVyd3JpdGluZ0RhdGEodGFzaywgc2F2ZWRUYXNrcykudGhlbigob3Zlcndyb3RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBjaG9zZSB0byBvdmVyd3JpdGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3Zlcndyb3RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgdGhleSBkaWRuJ3RcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL292ZXJ3cml0aW5nIGlzIG5vdCBhIGNvbmNlcm47IGp1c3Qgc2F2ZSB0aGUgdGFza1xyXG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZVRhc2soc2F2ZWRUYXNrcywgdGFzayk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2ltcGx5IHJldHVybiB0aGUgY2FjaGVkIHRhc2sgbGlzdCBpZiBwb3NzaWJsZS4gSWYgdGhlcmUgaXNcclxuICAgIG5vIGNhY2hlZCBsaXN0LCB0aGVuIHJlbG9hZCBpdCBmcm9tIG1lbW9yeSBhbmQgcmV0dXJuIGl0LiAqL1xyXG4gICAgcHJpdmF0ZSBnZXRPckNyZWF0ZVRhc2tMaXN0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy50YXNrcykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hDYWNoZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy50YXNrcztcclxuICAgIH1cclxuXHJcbiAgICAvKiBEZWxldGUgdGhlIHRhc2sgd2l0aCB0YXNrJ3MgbmFtZSBmcm9tIG1lbW9yeSwgaWYgaXQgZXhpc3RzLiAqL1xyXG4gICAgZGVsZXRlVGFzayh0YXNrOiBUYXNrKSB7XHJcbiAgICAgICAgbGV0IHNhdmVkVGFza3MgPSB0aGlzLmdldE9yQ3JlYXRlVGFza0xpc3QoKTtcclxuICAgICAgICBkZWxldGUgc2F2ZWRUYXNrc1t0YXNrLm5hbWVdO1xyXG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkoc2F2ZWRUYXNrcykpO1xyXG4gICAgICAgIHRoaXMudGFza3MgPSBzYXZlZFRhc2tzOyAvL3VwZGF0ZSB0aGUgY2FjaGVkIHZlcnNpb25cclxuICAgIH1cclxuXHJcbiAgICAvKiBSZXR1cm4gYSBsaXN0IG9mIHRhc2tzIHNvcnRlZCBieSBtb3N0IHJlY2VudCAqL1xyXG4gICAgbG9hZEFsbFRhc2tzKCkge1xyXG4gICAgICAgIC8vcmV0cmlldmUgdGhlIHN5c3RlbSdzICpvYmplY3QqIGZ1bGwgb2YgdGFzayBvYmplY3RzLCB3aGljaCBpcyBcclxuICAgICAgICAvL2Zvcm1hdHRlZCBhcyB7J3Rhc2tOYW1lMSc6IHRhc2sxLCAndGFza05hbWUyJzp0YXNrMiwgLi4ufVxyXG4gICAgICAgIGxldCBzYXZlZFRhc2tzID0gdGhpcy5nZXRPckNyZWF0ZVRhc2tMaXN0KCk7XHJcbiAgICAgICAgLy9nZXQgcmlkIG9mIHRoZSBuYW1lcyBhbmQgc2ltcGx5IG9idGFpbiBhbiAqYXJyYXkqIG9mIHRoZSB0YXNrc1xyXG4gICAgICAgIGxldCB0YXNrTGlzdCA9IE9iamVjdC5rZXlzKHNhdmVkVGFza3MpLm1hcChrZXkgPT4gc2F2ZWRUYXNrc1trZXldKTtcclxuICAgICAgICAvL3NvcnQgdGhlIHRhc2sgYXJyYXkgaW4gZGVzY2VuZGluZyBvcmRlciBvZiB0aW1lIG1vZGlmaWVkXHJcbiAgICAgICAgcmV0dXJuIHRhc2tMaXN0LnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGIubW9kaWZpZWRUaW1lc3RhbXAgLSBhLm1vZGlmaWVkVGltZXN0YW1wIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiBSZXR1cm5zIHRoZSBzdG9yZWQgdmVyc2lvbiBvZiB0aGUgdGFzayB3aXRoIGEgbmFtZSA9PSBpZC4gKi9cclxuICAgIGxvYWRUYXNrQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQ2FjaGUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy50YXNrc1tpZF07XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2V0cyB0aGUgY2FjaGUgdG8gdGhlIHN5c3RlbSdzIHNhdmVkIHRhc2sgbGlzdCAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoQ2FjaGUoKSB7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IEpTT04ucGFyc2UodGhpcy5hcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0YXNrc1wiLCBcInt9XCIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBTY2FuIHRoZSB1c2VyJ3MgYXBwIHNldHRpbmdzIGFuZCBzZXQgdGhlbSB0byB0aGVpciBkZWZhdWx0cyBpZiB0aGV5J3ZlXHJcbiAgICBuZXZlciBiZWVuIHNldCBvciBoYXZlIGJlZW4gc29tZWhvdyB3aXBlZCBmcm9tIG1lbW9yeSAoYW5kIHNvIGFyZSB1bmRlZmluZWQpICovXHJcbiAgICBzZXRTZXR0aW5nc0lmTm9uZSgpIHtcclxuICAgICAgICBsZXQgbmVlZFRvU2F2ZVNldHRpbmdzID0gZmFsc2U7IC8vd2hldGhlciB0aGUgc2V0dGluZ3MgbmVlZCB0byBiZSBzYXZlZCB0byB0aGUgc3lzdGVtXHJcbiAgICAgICAgbGV0IHNldHRpbmdzID0gPFRpbWVyU2V0dGluZ3M+SlNPTi5wYXJzZSh0aGlzLmFwcFNldHRpbmdzLmdldFN0cmluZyhcInRpbWVyX3NldHRpbmdzXCIsIFwie31cIikpO1xyXG4gICAgICAgIC8vaWYgc29tZSBzZXR0aW5nIGlzIHVuZGVmaW5lZCwgc2V0IGl0IHRvIGl0cyBkZWZhdWx0IGFuZCBlbnN1cmUgdGhlIHNldHRpbmdzIGFyZSBzYXZlZFxyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3Mud2FudHNUb25lID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG5lZWRUb1NhdmVTZXR0aW5ncyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLndhbnRzVG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRpbnVvdXNUb25lID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3Mud2FudHNWaWJyYXRlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIG5lZWRUb1NhdmVTZXR0aW5ncyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLndhbnRzVmlicmF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRpbnVvdXNWaWJyYXRlID0gdHJ1ZTsgLy9JIGZpbmQgSSBwcmVmZXIgdmlicmF0aW9uIGZvciBhbGFybXMsIHNvIHRoaXMgaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hIGRlZmF1bHQgZm9yIG5vd1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzLndhbnRzTm90aWZpY2F0aW9ucyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBuZWVkVG9TYXZlU2V0dGluZ3MgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy53YW50c05vdGlmaWNhdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmVlZFRvU2F2ZVNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIC8vc2F2ZSB0aGUgc2V0dGluZ3MgdG8gc3lzdGVtIHN0b3JhZ2VcclxuICAgICAgICAgICAgdGhpcy5hcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJ0aW1lcl9zZXR0aW5nc1wiLCBKU09OLnN0cmluZ2lmeShzZXR0aW5ncykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBSZXR1cm5zIHRoZSB1c2VyIHNldHRpbmdzIChwcmVmZXJlbmNlcykgYXMgYSBUaW1lclNldHRpbmdzIG9iamVjdC5cclxuICAgIFJldHJpZXZlcyB0aGUgY2FjaGVkIHNldHRpbmdzIGlmIHBvc3NpYmxlLCBhbmQgb3RoZXJ3aXNlIHJldHVybnMgdGhlXHJcbiAgICBzZXR0aW5ncyBzdG9yZWQgaW4gdGhlIHN5c3RlbSBhbmQgcmVmcmVzaGVzIHRoZSBjYWNoZS4gQXNzdW1lcyB0aGUgc2V0dGluZ3MgaGF2ZSBiZWVuXHJcbiAgICBzZXQgc2luY2UsIGlmIHRoZXkgZGlkbid0IGV4aXN0LCB0aGV5IHdlcmUgcmUtY3JlYXRlZCB3aGVuIHRoZSBhcHAgc3RhcnRlZCB1cCBieVxyXG4gICAgdGhpcy5zZXRTZXR0aW5nc0lmTm9uZSgpLiAqL1xyXG4gICAgZ2V0VGltZXJTZXR0aW5ncygpIHtcclxuICAgICAgICAvL3JlbG9hZCB0aGlzLnNldHRpbmdzIG9uIGEgZnJlc2ggcmVzdGFydFxyXG4gICAgICAgIGlmICghIHRoaXMudGltZXJTZXR0aW5ncykge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyU2V0dGluZ3MgPSA8VGltZXJTZXR0aW5ncz5KU09OLnBhcnNlKHRoaXMuYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidGltZXJfc2V0dGluZ3NcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lclNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFNhdmUgdGltZXJTZXR0aW5ncyBpbiBzdG9yYWdlLCBhbmQgdXBkYXRlIHRoZSBjYWNoZWQgdmVyc2lvbiAqL1xyXG4gICAgc2F2ZVRpbWVyU2V0dGluZ3ModGltZXJTZXR0aW5nczogVGltZXJTZXR0aW5ncykge1xyXG4gICAgICAgIHRoaXMuYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidGltZXJfc2V0dGluZ3NcIiwgSlNPTi5zdHJpbmdpZnkodGltZXJTZXR0aW5ncykpO1xyXG4gICAgICAgIHRoaXMudGltZXJTZXR0aW5ncyA9IHRpbWVyU2V0dGluZ3M7IC8vdXBkYXRlIHRoZSBjYWNoZWQgdmVyc2lvbiBvZiB0aGUgdGltZXIgc2V0dGluZ3NcclxuICAgIH1cclxuXHJcbn1cclxuIl19