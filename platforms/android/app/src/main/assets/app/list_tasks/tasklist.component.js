"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var task_model_1 = require("../shared/task/task.model");
var data_service_1 = require("../shared/data.service");
var pass_data_service_1 = require("../shared/pass-data.service");
var TaskListComponent = /** @class */ (function () {
    function TaskListComponent(page, dataManager, router) {
        var _this = this;
        this.page = page;
        this.dataManager = dataManager;
        this.router = router;
        this.page.on(page_1.Page.navigatingToEvent, function (event) {
            if (event.isBackNavigation) {
                _this.refreshTasks();
            }
        });
        this.dataManager.setSettingsIfNone(); //for a fresh install, set user preferences to default
    }
    TaskListComponent.prototype.viewTask = function (task) {
        pass_data_service_1.DataRetriever.data = task;
        this.router.navigate(["task"]);
    };
    TaskListComponent.prototype.refreshTasks = function () {
        this.taskList = this.dataManager.loadAllTasks();
    };
    TaskListComponent.prototype.ngOnInit = function () {
        this.refreshTasks();
    };
    TaskListComponent.prototype.newTask = function () {
        //create a blank activity and navigate to the edit activity
        //page so the user can fill in the details.
        pass_data_service_1.DataRetriever.data = new task_model_1.Task("", "", []);
        this.router.navigate(["task/edit"]);
    };
    TaskListComponent.prototype.openSettings = function () {
        this.router.navigate(["settings"]);
    };
    TaskListComponent = __decorate([
        core_1.Component({
            selector: "tmr-task-list",
            templateUrl: "list_tasks/tasklist.component.html",
            styleUrls: ["list_tasks/tasklist.component.css"],
            providers: [data_service_1.SystemDataService]
        }),
        __metadata("design:paramtypes", [page_1.Page, data_service_1.SystemDataService, router_1.Router])
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFza2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThEO0FBQzlELDBDQUEyRDtBQUMzRCxpREFBK0Q7QUFDL0Qsd0RBQWlEO0FBR2pELHVEQUEyRDtBQUMzRCxpRUFBNEQ7QUFXNUQ7SUFpQkksMkJBQW9CLElBQVUsRUFBVSxXQUE4QixFQUFVLE1BQWM7UUFBOUYsaUJBT0M7UUFQbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDMUYsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBb0I7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLHNEQUFzRDtJQUNoRyxDQUFDO0lBcEJELG9DQUFRLEdBQVIsVUFBUyxJQUFVO1FBQ2YsaUNBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBV0QsbUNBQU8sR0FBUDtRQUNJLDJEQUEyRDtRQUMzRCwyQ0FBMkM7UUFDM0MsaUNBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFuQ1EsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1lBQ2hELFNBQVMsRUFBRSxDQUFDLGdDQUFpQixDQUFDO1NBQ2pDLENBQUM7eUNBa0I0QixXQUFJLEVBQXVCLGdDQUFpQixFQUFrQixlQUFNO09BakJyRixpQkFBaUIsQ0FxQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJDRCxJQXFDQztBQXJDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhLCBSYWRMaXN0VmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXdcIjtcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5cbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRtci10YXNrLWxpc3RcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJsaXN0X3Rhc2tzL3Rhc2tsaXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJsaXN0X3Rhc2tzL3Rhc2tsaXN0LmNvbXBvbmVudC5jc3NcIl0sXG4gICAgcHJvdmlkZXJzOiBbU3lzdGVtRGF0YVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHRhc2tMaXN0OiBBcnJheTxUYXNrPjtcblxuICAgIHZpZXdUYXNrKHRhc2s6IFRhc2spIHtcbiAgICAgICAgRGF0YVJldHJpZXZlci5kYXRhID0gdGFzaztcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFza1wiXSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaFRhc2tzKCkge1xuICAgICAgICB0aGlzLnRhc2tMaXN0ID0gdGhpcy5kYXRhTWFuYWdlci5sb2FkQWxsVGFza3MoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoVGFza3MoKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKGV2ZW50OiBOYXZpZ2F0ZWREYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNCYWNrTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyLnNldFNldHRpbmdzSWZOb25lKCk7IC8vZm9yIGEgZnJlc2ggaW5zdGFsbCwgc2V0IHVzZXIgcHJlZmVyZW5jZXMgdG8gZGVmYXVsdFxuICAgIH1cblxuICAgIG5ld1Rhc2soKSB7XG4gICAgICAgIC8vY3JlYXRlIGEgYmxhbmsgYWN0aXZpdHkgYW5kIG5hdmlnYXRlIHRvIHRoZSBlZGl0IGFjdGl2aXR5XG4gICAgICAgIC8vcGFnZSBzbyB0aGUgdXNlciBjYW4gZmlsbCBpbiB0aGUgZGV0YWlscy5cbiAgICAgICAgRGF0YVJldHJpZXZlci5kYXRhID0gbmV3IFRhc2soXCJcIiwgXCJcIiwgW10pO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrL2VkaXRcIl0pO1xuICAgIH1cblxuICAgIG9wZW5TZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wic2V0dGluZ3NcIl0pO1xuICAgIH1cblxufVxuXG4iXX0=