"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var task_model_1 = require("../shared/task/task.model");
var data_service_1 = require("../shared/data.service");
var pass_data_service_1 = require("../shared/pass-data.service");
var TaskListComponent = /** @class */ (function () {
    function TaskListComponent(page, dataManager, router, dataRetriever) {
        var _this = this;
        this.page = page;
        this.dataManager = dataManager;
        this.router = router;
        this.dataRetriever = dataRetriever;
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
    TaskListComponent = __decorate([
        core_1.Component({
            selector: "tmr-task-list",
            templateUrl: "list_tasks/tasklist.component.html",
            styleUrls: ["list_tasks/tasklist.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, data_service_1.SystemDataService, router_1.Router,
            pass_data_service_1.DataRetriever])
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFza2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThEO0FBQzlELDBDQUEyRDtBQUMzRCxpREFBK0Q7QUFDL0Qsd0RBQWlEO0FBR2pELHVEQUEyRDtBQUMzRCxpRUFBNEQ7QUFVNUQ7SUFpQkksMkJBQW9CLElBQVUsRUFBVSxXQUE4QixFQUFVLE1BQWMsRUFDOUUsYUFBNEI7UUFENUMsaUJBUUM7UUFSbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDOUUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBb0I7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLDZEQUE2RDtJQUN2RyxDQUFDO0lBckJELG9DQUFRLEdBQVIsVUFBUyxJQUFVO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNwRCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBWUQsbUNBQU8sR0FBUDtRQUNJLDJEQUEyRDtRQUMzRCwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFwQ1EsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1NBQ25ELENBQUM7eUNBa0I0QixXQUFJLEVBQXVCLGdDQUFpQixFQUFrQixlQUFNO1lBQy9ELGlDQUFhO09BbEJuQyxpQkFBaUIsQ0FzQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQXRDRCxJQXNDQztBQXRDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhLCBSYWRMaXN0VmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXdcIjtcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG5cbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRtci10YXNrLWxpc3RcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJsaXN0X3Rhc2tzL3Rhc2tsaXN0LmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJsaXN0X3Rhc2tzL3Rhc2tsaXN0LmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgVGFza0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgdGFza0xpc3Q6IEFycmF5PFRhc2s+O1xuXG4gICAgdmlld1Rhc2sodGFzazogVGFzaykge1xuICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YSA9IHRhc2s7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhc2tcIl0pO1xuICAgIH1cblxuICAgIHJlZnJlc2hUYXNrcygpIHtcbiAgICAgICAgdGhpcy50YXNrTGlzdCA9IHRoaXMuZGF0YU1hbmFnZXIubG9hZEFsbFRhc2tzKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaFRhc2tzKCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICBwcml2YXRlIGRhdGFSZXRyaWV2ZXI6IERhdGFSZXRyaWV2ZXIpIHtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsIChldmVudDogTmF2aWdhdGVkRGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzQmFja05hdmlnYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hUYXNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kYXRhTWFuYWdlci5zZXRTZXR0aW5nc0lmTm9uZSgpOyAvL2ZvciBhIGZyZXNoIGluc3RhbGwsIHNldCB1c2VyIHByZWZlcmVuY2VzIHRvIHRoZWlyIGRlZmF1bHRzXG4gICAgfVxuXG4gICAgbmV3VGFzaygpIHtcbiAgICAgICAgLy9jcmVhdGUgYSBibGFuayBhY3Rpdml0eSBhbmQgbmF2aWdhdGUgdG8gdGhlIGVkaXQgYWN0aXZpdHlcbiAgICAgICAgLy9wYWdlIHNvIHRoZSB1c2VyIGNhbiBmaWxsIGluIHRoZSBkZXRhaWxzLlxuICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YSA9IG5ldyBUYXNrKFwiXCIsIFwiXCIsIFtdKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFzay9lZGl0XCJdKTtcbiAgICB9XG5cbiAgICBvcGVuU2V0dGluZ3MoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInNldHRpbmdzXCJdKTtcbiAgICB9XG5cbn1cblxuIl19