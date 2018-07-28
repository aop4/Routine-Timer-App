"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var dialogs = require("ui/dialogs");
var Toast = require("nativescript-toast");
var task_model_1 = require("../../shared/task/task.model");
var data_service_1 = require("../../shared/data.service");
var pass_data_service_1 = require("../../shared/pass-data.service");
var firebase_service_1 = require("~/shared/firebase.service");
var TaskListComponent = /** @class */ (function () {
    function TaskListComponent(page, dataManager, router, dataRetriever, firebaseService) {
        var _this = this;
        this.page = page;
        this.dataManager = dataManager;
        this.router = router;
        this.dataRetriever = dataRetriever;
        this.firebaseService = firebaseService;
        this.page.on(page_1.Page.navigatingToEvent, function (event) {
            if (event.isBackNavigation) {
                _this.refreshTasks();
            }
        });
        this.dataManager.setSettingsIfNone(); //for a fresh install, set user preferences to their defaults
    }
    TaskListComponent.prototype.viewTask = function (task) {
        this.dataRetriever.data = task;
        this.router.navigate(["task"]);
    };
    TaskListComponent.prototype.refreshTasks = function () {
        this.taskList = this.dataManager.loadAllTasks();
    };
    TaskListComponent.prototype.ngOnInit = function () {
        this.refreshTasks();
        this.firebaseService.initializeFirebase();
    };
    TaskListComponent.prototype.newTask = function () {
        //create a blank activity and navigate to the edit activity
        //page so the user can fill in the details.
        this.dataRetriever.data = new task_model_1.Task("", "", []);
        this.router.navigate(["task/edit"]);
    };
    TaskListComponent.prototype.openSettings = function () {
        this.router.navigate(["settings"]);
    };
    TaskListComponent.prototype.promptToDownloadTask = function () {
        var _this = this;
        //prompt for an ID
        dialogs.prompt({
            title: "Download a task",
            message: "Did someone share a task with you? Enter the task's 8-character code (case insensitive).",
            inputType: dialogs.inputType.text,
            okButtonText: "OK",
            cancelButtonText: "Cancel"
        }).then(function (res) {
            //if the user pressed OK
            if (res.result) {
                _this.downloadTask(res.text);
            }
        });
    };
    TaskListComponent.prototype.downloadTask = function (taskID) {
        var _this = this;
        this.firebaseService.getTask(taskID).then(function (result) {
            if (result.value === null) {
                _this.downloadFailed();
            }
            else {
                _this.dataManager.saveNewTask(result.value, true)
                    .then(function () { return _this.refreshTasks(); });
            }
        });
    };
    TaskListComponent.prototype.downloadFailed = function () {
        var toast = Toast.makeText("Unable to retrieve that task.");
        toast.show();
        this.promptToDownloadTask();
    };
    TaskListComponent = __decorate([
        core_1.Component({
            selector: "tmr-task-list",
            templateUrl: "pages/list_tasks/tasklist.component.html",
            styleUrls: ["pages/list_tasks/tasklist.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, data_service_1.SystemDataService, router_1.Router,
            pass_data_service_1.DataRetriever, firebase_service_1.FirebaseService])
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFza2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxpREFBK0Q7QUFDL0Qsb0NBQXNDO0FBQ3RDLDBDQUE0QztBQUU1QywyREFBb0Q7QUFDcEQsMERBQThEO0FBQzlELG9FQUErRDtBQUMvRCw4REFBNEQ7QUFPNUQ7SUFrQkksMkJBQW9CLElBQVUsRUFBVSxXQUE4QixFQUFVLE1BQWMsRUFDOUUsYUFBNEIsRUFBVSxlQUFnQztRQUR0RixpQkFRQztRQVJtQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM5RSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNsRixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxLQUFvQjtZQUN0RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsNkRBQTZEO0lBQ3ZHLENBQUM7SUF0QkQsb0NBQVEsR0FBUixVQUFTLElBQVU7UUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBWUQsbUNBQU8sR0FBUDtRQUNJLDJEQUEyRDtRQUMzRCwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxnREFBb0IsR0FBcEI7UUFBQSxpQkFjQztRQWJHLGtCQUFrQjtRQUNsQixPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ1gsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixPQUFPLEVBQUUsMEZBQTBGO1lBQ25HLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUk7WUFDakMsWUFBWSxFQUFFLElBQUk7WUFDbEIsZ0JBQWdCLEVBQUUsUUFBUTtTQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztZQUNSLHdCQUF3QjtZQUN4QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDYixLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0NBQVksR0FBWixVQUFhLE1BQWM7UUFBM0IsaUJBVUM7UUFURyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFCLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixLQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztxQkFDL0MsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxFQUFFLEVBQW5CLENBQW1CLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMENBQWMsR0FBZDtRQUNJLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBdkVRLGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztTQUN6RCxDQUFDO3lDQW1CNEIsV0FBSSxFQUF1QixnQ0FBaUIsRUFBa0IsZUFBTTtZQUMvRCxpQ0FBYSxFQUEyQixrQ0FBZTtPQW5CN0UsaUJBQWlCLENBeUU3QjtJQUFELHdCQUFDO0NBQUEsQUF6RUQsSUF5RUM7QUF6RVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSwgTmF2aWdhdGVkRGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL2ZpcmViYXNlLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidG1yLXRhc2stbGlzdFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2xpc3RfdGFza3MvdGFza2xpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL2xpc3RfdGFza3MvdGFza2xpc3QuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBUYXNrTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB0YXNrTGlzdDogQXJyYXk8VGFzaz47XG5cbiAgICB2aWV3VGFzayh0YXNrOiBUYXNrKSB7XG4gICAgICAgIHRoaXMuZGF0YVJldHJpZXZlci5kYXRhID0gdGFzaztcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFza1wiXSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaFRhc2tzKCkge1xuICAgICAgICB0aGlzLnRhc2tMaXN0ID0gdGhpcy5kYXRhTWFuYWdlci5sb2FkQWxsVGFza3MoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoVGFza3MoKTtcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuaW5pdGlhbGl6ZUZpcmViYXNlKCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICBwcml2YXRlIGRhdGFSZXRyaWV2ZXI6IERhdGFSZXRyaWV2ZXIsIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsIChldmVudDogTmF2aWdhdGVkRGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzQmFja05hdmlnYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hUYXNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kYXRhTWFuYWdlci5zZXRTZXR0aW5nc0lmTm9uZSgpOyAvL2ZvciBhIGZyZXNoIGluc3RhbGwsIHNldCB1c2VyIHByZWZlcmVuY2VzIHRvIHRoZWlyIGRlZmF1bHRzXG4gICAgfVxuXG4gICAgbmV3VGFzaygpIHtcbiAgICAgICAgLy9jcmVhdGUgYSBibGFuayBhY3Rpdml0eSBhbmQgbmF2aWdhdGUgdG8gdGhlIGVkaXQgYWN0aXZpdHlcbiAgICAgICAgLy9wYWdlIHNvIHRoZSB1c2VyIGNhbiBmaWxsIGluIHRoZSBkZXRhaWxzLlxuICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YSA9IG5ldyBUYXNrKFwiXCIsIFwiXCIsIFtdKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFzay9lZGl0XCJdKTtcbiAgICB9XG5cbiAgICBvcGVuU2V0dGluZ3MoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInNldHRpbmdzXCJdKTtcbiAgICB9XG5cbiAgICBwcm9tcHRUb0Rvd25sb2FkVGFzaygpIHtcbiAgICAgICAgLy9wcm9tcHQgZm9yIGFuIElEXG4gICAgICAgIGRpYWxvZ3MucHJvbXB0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRvd25sb2FkIGEgdGFza1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJEaWQgc29tZW9uZSBzaGFyZSBhIHRhc2sgd2l0aCB5b3U/IEVudGVyIHRoZSB0YXNrJ3MgOC1jaGFyYWN0ZXIgY29kZSAoY2FzZSBpbnNlbnNpdGl2ZSkuXCIsXG4gICAgICAgICAgICBpbnB1dFR5cGU6IGRpYWxvZ3MuaW5wdXRUeXBlLnRleHQsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcbiAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAvL2lmIHRoZSB1c2VyIHByZXNzZWQgT0tcbiAgICAgICAgICAgIGlmIChyZXMucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZFRhc2socmVzLnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb3dubG9hZFRhc2sodGFza0lEOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0VGFzayh0YXNrSUQpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG93bmxvYWRGYWlsZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YU1hbmFnZXIuc2F2ZU5ld1Rhc2socmVzdWx0LnZhbHVlLCB0cnVlKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMucmVmcmVzaFRhc2tzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb3dubG9hZEZhaWxlZCgpIHtcbiAgICAgICAgbGV0IHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCJVbmFibGUgdG8gcmV0cmlldmUgdGhhdCB0YXNrLlwiKTtcbiAgICAgICAgdG9hc3Quc2hvdygpO1xuICAgICAgICB0aGlzLnByb21wdFRvRG93bmxvYWRUYXNrKCk7XG4gICAgfVxuXG59XG5cbiJdfQ==