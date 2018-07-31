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
    /* Prompt the user to download a task, and attempt to download it if desired. */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFza2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF5QztBQUN6QyxpREFBK0Q7QUFDL0Qsb0NBQXNDO0FBQ3RDLDBDQUE0QztBQUU1QywyREFBb0Q7QUFDcEQsMERBQThEO0FBQzlELG9FQUErRDtBQUMvRCw4REFBNEQ7QUFPNUQ7SUFxQkksMkJBQW9CLElBQVUsRUFBVSxXQUE4QixFQUFVLE1BQWMsRUFDOUUsYUFBNEIsRUFBVSxlQUFnQztRQUR0RixpQkFRQztRQVJtQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUM5RSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNsRixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxLQUFvQjtZQUN0RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsNkRBQTZEO0lBQ3ZHLENBQUM7SUF6QkQsb0NBQVEsR0FBUixVQUFTLElBQVU7UUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxvREFBb0Q7SUFDcEQsd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBWUQsbUNBQU8sR0FBUDtRQUNJLDJEQUEyRDtRQUMzRCwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxvQ0FBb0M7SUFDcEMsd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0ZBQWdGO0lBQ2hGLGdEQUFvQixHQUFwQjtRQUFBLGlCQWNDO1FBYkcsa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDWCxLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLE9BQU8sRUFBRSwwRkFBMEY7WUFDbkcsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSTtZQUNqQyxZQUFZLEVBQUUsSUFBSTtZQUNsQixnQkFBZ0IsRUFBRSxRQUFRO1NBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQ1Isd0JBQXdCO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwRUFBMEU7SUFDMUUsd0NBQVksR0FBWixVQUFhLE1BQWM7UUFBM0IsaUJBYUM7UUFaRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsa0RBQWtEO2dCQUNsRCxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUIsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLDZCQUE2QjtnQkFDN0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7cUJBRS9DLElBQUksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7WUFDckMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdGQUFnRjtJQUNoRiwwQ0FBYyxHQUFkO1FBQ0ksSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzVELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFqRlEsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsMENBQTBDO1lBQ3ZELFNBQVMsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO1NBQ3pELENBQUM7eUNBc0I0QixXQUFJLEVBQXVCLGdDQUFpQixFQUFrQixlQUFNO1lBQy9ELGlDQUFhLEVBQTJCLGtDQUFlO09BdEI3RSxpQkFBaUIsQ0FtRjdCO0lBQUQsd0JBQUM7Q0FBQSxBQW5GRCxJQW1GQztBQW5GWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xuXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90YXNrL3Rhc2subW9kZWxcIjtcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZmlyZWJhc2Uuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0bXItdGFzay1saXN0XCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvbGlzdF90YXNrcy90YXNrbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbGlzdF90YXNrcy90YXNrbGlzdC5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHRhc2tMaXN0OiBBcnJheTxUYXNrPjtcblxuICAgIHZpZXdUYXNrKHRhc2s6IFRhc2spIHtcbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmRhdGEgPSB0YXNrO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrXCJdKTtcbiAgICB9XG5cbiAgICAvKiBSZS1yZXRyaWV2ZXMgdGhlIHRhc2tzIGluIHRoZSBwYWdlIGZyb20gbWVtb3J5ICovXG4gICAgcmVmcmVzaFRhc2tzKCkge1xuICAgICAgICB0aGlzLnRhc2tMaXN0ID0gdGhpcy5kYXRhTWFuYWdlci5sb2FkQWxsVGFza3MoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy9sb2FkIHRoZSB0YXNrcyBmcm9tIHRoZSBkYXRhYmFzZVxuICAgICAgICB0aGlzLnJlZnJlc2hUYXNrcygpO1xuICAgICAgICAvL2luaXRpYWxpemUgY29ubmVjdGlvbiB0byBkYXRhYmFzZVxuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5pbml0aWFsaXplRmlyZWJhc2UoKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgIHByaXZhdGUgZGF0YVJldHJpZXZlcjogRGF0YVJldHJpZXZlciwgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSkge1xuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKGV2ZW50OiBOYXZpZ2F0ZWREYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNCYWNrTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyLnNldFNldHRpbmdzSWZOb25lKCk7IC8vZm9yIGEgZnJlc2ggaW5zdGFsbCwgc2V0IHVzZXIgcHJlZmVyZW5jZXMgdG8gdGhlaXIgZGVmYXVsdHNcbiAgICB9XG5cbiAgICBuZXdUYXNrKCkge1xuICAgICAgICAvL2NyZWF0ZSBhIGJsYW5rIGFjdGl2aXR5IGFuZCBuYXZpZ2F0ZSB0byB0aGUgZWRpdCBhY3Rpdml0eVxuICAgICAgICAvL3BhZ2Ugc28gdGhlIHVzZXIgY2FuIGZpbGwgaW4gdGhlIGRldGFpbHMuXG4gICAgICAgIHRoaXMuZGF0YVJldHJpZXZlci5kYXRhID0gbmV3IFRhc2soXCJcIiwgXCJcIiwgW10pO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrL2VkaXRcIl0pO1xuICAgIH1cblxuICAgIC8qIE5hdmlnYXRlcyB0byB0aGUgc2V0dGluZ3MgcGFnZSAqL1xuICAgIG9wZW5TZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wic2V0dGluZ3NcIl0pO1xuICAgIH1cblxuICAgIC8qIFByb21wdCB0aGUgdXNlciB0byBkb3dubG9hZCBhIHRhc2ssIGFuZCBhdHRlbXB0IHRvIGRvd25sb2FkIGl0IGlmIGRlc2lyZWQuICovXG4gICAgcHJvbXB0VG9Eb3dubG9hZFRhc2soKSB7XG4gICAgICAgIC8vcHJvbXB0IGZvciBhbiBJRFxuICAgICAgICBkaWFsb2dzLnByb21wdCh7XG4gICAgICAgICAgICB0aXRsZTogXCJEb3dubG9hZCBhIHRhc2tcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGlkIHNvbWVvbmUgc2hhcmUgYSB0YXNrIHdpdGggeW91PyBFbnRlciB0aGUgdGFzaydzIDgtY2hhcmFjdGVyIGNvZGUgKGNhc2UgaW5zZW5zaXRpdmUpLlwiLFxuICAgICAgICAgICAgaW5wdXRUeXBlOiBkaWFsb2dzLmlucHV0VHlwZS50ZXh0LFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXG4gICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBwcmVzc2VkIE9LXG4gICAgICAgICAgICBpZiAocmVzLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZG93bmxvYWRUYXNrKHJlcy50ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyogRG93bmxvYWQgYSB0YXNrLCBhbmQgaWYgaXQgZXhpc3RzLCBzYXZlIGl0IGFuZCByZWZyZXNoIHRoZSB0YXNrIGxpc3QgKi9cbiAgICBkb3dubG9hZFRhc2sodGFza0lEOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0VGFzayh0YXNrSUQpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vZGlzcGxheSBhIG1lc3NhZ2Ugc2F5aW5nIHRoaXMgdGFzayBkb2Vzbid0IGV4aXN0XG4gICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZEZhaWxlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9zYXZlIHRoZSB0YXNrIHRvIHRoZSBzeXN0ZW1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyLnNhdmVOZXdUYXNrKHJlc3VsdC52YWx1ZSwgdHJ1ZSlcbiAgICAgICAgICAgICAgICAvL3JlZnJlc2ggdGhlIHRhc2tzIGxpc3RcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLnJlZnJlc2hUYXNrcygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyogZGlzcGxheSBhIG1lc3NhZ2UgaW5kaWNhdGluZyBhIHRhc2sgaWQgdGhlIHVzZXIgZW50ZXJlZCB0YXNrIGRvZXNuJ3QgZXhpc3QgKi9cbiAgICBkb3dubG9hZEZhaWxlZCgpIHtcbiAgICAgICAgbGV0IHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCJVbmFibGUgdG8gcmV0cmlldmUgdGhhdCB0YXNrLlwiKTtcbiAgICAgICAgdG9hc3Quc2hvdygpO1xuICAgICAgICB0aGlzLnByb21wdFRvRG93bmxvYWRUYXNrKCk7XG4gICAgfVxuXG59XG5cbiJdfQ==