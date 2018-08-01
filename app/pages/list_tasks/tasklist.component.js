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
var connectivity_checker_service_1 = require("~/shared/connectivity-checker.service");
var TaskListComponent = /** @class */ (function () {
    function TaskListComponent(page, dataManager, router, dataRetriever, firebaseService, connectivityService) {
        var _this = this;
        this.page = page;
        this.dataManager = dataManager;
        this.router = router;
        this.dataRetriever = dataRetriever;
        this.firebaseService = firebaseService;
        this.connectivityService = connectivityService;
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
    /* Re-retrieves the tasks in the page from memory */
    TaskListComponent.prototype.refreshTasks = function () {
        this.taskList = this.dataManager.loadAllTasks();
    };
    TaskListComponent.prototype.ngOnInit = function () {
        //load the tasks from the database
        this.refreshTasks();
        //initialize connection to database
        this.firebaseService.initializeFirebase();
    };
    TaskListComponent.prototype.newTask = function () {
        //create a blank activity and navigate to the edit activity
        //page so the user can fill in the details.
        this.dataRetriever.data = new task_model_1.Task("", "", []);
        this.router.navigate(["task/edit"]);
    };
    /* Navigates to the settings page */
    TaskListComponent.prototype.openSettings = function () {
        this.router.navigate(["settings"]);
    };
    /* If the user has an internet connection, begin the process of downloading a task */
    TaskListComponent.prototype.taskDownload = function () {
        var _this = this;
        this.connectivityService.checkConnection()
            .then(function () {
            //if there's an internet connection
            _this.giveDownloadPrompt();
        }, function () {
            //if there's not
            dialogs.alert({
                title: "No Connection",
                message: "You must have an internet connection to download a task.",
                okButtonText: "OK"
            });
        });
    };
    /* Prompt the user to download a task, and attempt to download it if desired. */
    TaskListComponent.prototype.giveDownloadPrompt = function () {
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
    /* Download a task, and if it exists, save it and refresh the task list */
    TaskListComponent.prototype.downloadTask = function (taskID) {
        var _this = this;
        this.firebaseService.getTask(taskID).then(function (result) {
            if (result.value === null) {
                //display a message saying this task doesn't exist
                _this.downloadFailed();
            }
            else {
                //save the task to the system
                _this.dataManager.saveNewTask(result.value, true)
                    .then(function () { return _this.refreshTasks(); });
            }
        });
    };
    /* display a message indicating a task id the user entered task doesn't exist */
    TaskListComponent.prototype.downloadFailed = function () {
        var toast = Toast.makeText("Unable to retrieve that task.");
        toast.show();
        this.taskDownload();
    };
    TaskListComponent = __decorate([
        core_1.Component({
            selector: "tmr-task-list",
            templateUrl: "pages/list_tasks/tasklist.component.html",
            styleUrls: ["pages/list_tasks/tasklist.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, data_service_1.SystemDataService, router_1.Router,
            pass_data_service_1.DataRetriever, firebase_service_1.FirebaseService,
            connectivity_checker_service_1.ConnectivityCheckService])
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFza2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxpREFBK0Q7QUFDL0Qsb0NBQXNDO0FBQ3RDLDBDQUE0QztBQUU1QywyREFBb0Q7QUFDcEQsMERBQThEO0FBQzlELG9FQUErRDtBQUMvRCw4REFBNEQ7QUFDNUQsc0ZBQWlGO0FBT2pGO0lBcUJJLDJCQUFvQixJQUFVLEVBQVUsV0FBOEIsRUFBVSxNQUFjLEVBQzlFLGFBQTRCLEVBQVUsZUFBZ0MsRUFDdEUsbUJBQTZDO1FBRjdELGlCQVNDO1FBVG1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQzlFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ3RFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBMEI7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBb0I7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLDZEQUE2RDtJQUN2RyxDQUFDO0lBMUJELG9DQUFRLEdBQVIsVUFBUyxJQUFVO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFD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QUNiLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBbEdRLGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztTQUN6RCxDQUFDO3lDQXNCNEIsV0FBSSxFQUF1QixnQ0FBaUIsRUFBa0IsZUFBTTtZQUMvRCxpQ0FBYSxFQUEyQixrQ0FBZTtZQUNqRCx1REFBd0I7T0F2QnBELGlCQUFpQixDQW9HN0I7SUFBRCx3QkFBQztDQUFBLEFBcEdELElBb0dDO0FBcEdZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UsIE5hdmlnYXRlZERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tIFwibmF0aXZlc2NyaXB0LXRvYXN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2RhdGEuc2VydmljZVwiO1xuaW1wb3J0IHsgRGF0YVJldHJpZXZlciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvcGFzcy1kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9maXJlYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25uZWN0aXZpdHlDaGVja1NlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvY29ubmVjdGl2aXR5LWNoZWNrZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0bXItdGFzay1saXN0XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbGlzdF90YXNrcy90YXNrbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbGlzdF90YXNrcy90YXNrbGlzdC5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHRhc2tMaXN0OiBBcnJheTxUYXNrPjtcblxuICAgIHZpZXdUYXNrKHRhc2s6IFRhc2spIHtcbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmRhdGEgPSB0YXNrO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrXCJdKTtcbiAgICB9XG5cbiAgICAvKiBSZS1yZXRyaWV2ZXMgdGhlIHRhc2tzIGluIHRoZSBwYWdlIGZyb20gbWVtb3J5ICovXG4gICAgcmVmcmVzaFRhc2tzKCkge1xuICAgICAgICB0aGlzLnRhc2tMaXN0ID0gdGhpcy5kYXRhTWFuYWdlci5sb2FkQWxsVGFza3MoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy9sb2FkIHRoZSB0YXNrcyBmcm9tIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLnJlZnJlc2hUYXNrcygpO1xuICAgICAgICAvL2luaXRpYWxpemUgY29ubmVjdGlvbiB0byBkYXRhYmFzZVxuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5pbml0aWFsaXplRmlyZWJhc2UoKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgIHByaXZhdGUgZGF0YVJldHJpZXZlcjogRGF0YVJldHJpZXZlciwgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcbiAgICAgICAgICAgIHByaXZhdGUgY29ubmVjdGl2aXR5U2VydmljZTogQ29ubmVjdGl2aXR5Q2hlY2tTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoZXZlbnQ6IE5hdmlnYXRlZERhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5pc0JhY2tOYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGF0YU1hbmFnZXIuc2V0U2V0dGluZ3NJZk5vbmUoKTsgLy9mb3IgYSBmcmVzaCBpbnN0YWxsLCBzZXQgdXNlciBwcmVmZXJlbmNlcyB0byB0aGVpciBkZWZhdWx0c1xuICAgIH1cblxuICAgIG5ld1Rhc2soKSB7XG4gICAgICAgIC8vY3JlYXRlIGEgYmxhbmsgYWN0aXZpdHkgYW5kIG5hdmlnYXRlIHRvIHRoZSBlZGl0IGFjdGl2aXR5XG4gICAgICAgIC8vcGFnZSBzbyB0aGUgdXNlciBjYW4gZmlsbCBpbiB0aGUgZGV0YWlscy5cbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmRhdGEgPSBuZXcgVGFzayhcIlwiLCBcIlwiLCBbXSk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhc2svZWRpdFwiXSk7XG4gICAgfVxuXG4gICAgLyogTmF2aWdhdGVzIHRvIHRoZSBzZXR0aW5ncyBwYWdlICovXG4gICAgb3BlblNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJzZXR0aW5nc1wiXSk7XG4gICAgfVxuXG4gICAgLyogSWYgdGhlIHVzZXIgaGFzIGFuIGludGVybmV0IGNvbm5lY3Rpb24sIGJlZ2luIHRoZSBwcm9jZXNzIG9mIGRvd25sb2FkaW5nIGEgdGFzayAqL1xuICAgIHRhc2tEb3dubG9hZCgpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aXZpdHlTZXJ2aWNlLmNoZWNrQ29ubmVjdGlvbigpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vaWYgdGhlcmUncyBhbiBpbnRlcm5ldCBjb25uZWN0aW9uXG4gICAgICAgICAgICB0aGlzLmdpdmVEb3dubG9hZFByb21wdCgpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAvL2lmIHRoZXJlJ3Mgbm90XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJObyBDb25uZWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgbXVzdCBoYXZlIGFuIGludGVybmV0IGNvbm5lY3Rpb24gdG8gZG93bmxvYWQgYSB0YXNrLlwiLFxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyogUHJvbXB0IHRoZSB1c2VyIHRvIGRvd25sb2FkIGEgdGFzaywgYW5kIGF0dGVtcHQgdG8gZG93bmxvYWQgaXQgaWYgZGVzaXJlZC4gKi9cbiAgICBnaXZlRG93bmxvYWRQcm9tcHQoKSB7XG4gICAgICAgIC8vcHJvbXB0IGZvciBhbiBJRFxuICAgICAgICBkaWFsb2dzLnByb21wdCh7XG4gICAgICAgICAgICB0aXRsZTogXCJEb3dubG9hZCBhIHRhc2tcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGlkIHNvbWVvbmUgc2hhcmUgYSB0YXNrIHdpdGggeW91PyBFbnRlciB0aGUgdGFzaydzIDgtY2hhcmFjdGVyIGNvZGUgKGNhc2UgaW5zZW5zaXRpdmUpLlwiLFxuICAgICAgICAgICAgaW5wdXRUeXBlOiBkaWFsb2dzLmlucHV0VHlwZS50ZXh0LFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXG4gICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBwcmVzc2VkIE9LXG4gICAgICAgICAgICBpZiAocmVzLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG93bmxvYWRUYXNrKHJlcy50ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyogRG93bmxvYWQgYSB0YXNrLCBhbmQgaWYgaXQgZXhpc3RzLCBzYXZlIGl0IGFuZCByZWZyZXNoIHRoZSB0YXNrIGxpc3QgKi9cbiAgICBkb3dubG9hZFRhc2sodGFza0lEOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0VGFzayh0YXNrSUQpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vZGlzcGxheSBhIG1lc3NhZ2Ugc2F5aW5nIHRoaXMgdGFzayBkb2Vzbid0IGV4aXN0XG4gICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZEZhaWxlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9zYXZlIHRoZSB0YXNrIHRvIHRoZSBzeXN0ZW1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyLnNhdmVOZXdUYXNrKHJlc3VsdC52YWx1ZSwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAvL3JlZnJlc2ggdGhlIHRhc2tzIGxpc3RcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnJlZnJlc2hUYXNrcygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyogZGlzcGxheSBhIG1lc3NhZ2UgaW5kaWNhdGluZyBhIHRhc2sgaWQgdGhlIHVzZXIgZW50ZXJlZCB0YXNrIGRvZXNuJ3QgZXhpc3QgKi9cbiAgICBkb3dubG9hZEZhaWxlZCgpIHtcbiAgICAgICAgbGV0IHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCJVbmFibGUgdG8gcmV0cmlldmUgdGhhdCB0YXNrLlwiKTtcbiAgICAgICAgdG9hc3Quc2hvdygpO1xuICAgICAgICB0aGlzLnRhc2tEb3dubG9hZCgpO1xuICAgIH1cblxufVxuXG4iXX0=