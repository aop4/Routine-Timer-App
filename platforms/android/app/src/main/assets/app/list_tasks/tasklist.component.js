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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFza2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThEO0FBQzlELDBDQUEyRDtBQUMzRCxpREFBK0Q7QUFDL0Qsd0RBQWlEO0FBR2pELHVEQUEyRDtBQUMzRCxpRUFBNEQ7QUFXNUQ7SUFpQkksMkJBQW9CLElBQVUsRUFBVSxXQUE4QixFQUFVLE1BQWM7UUFBOUYsaUJBTUM7UUFObUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDMUYsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBb0I7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuQkQsb0NBQVEsR0FBUixVQUFTLElBQVU7UUFDZixpQ0FBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFVRCxtQ0FBTyxHQUFQO1FBQ0ksMkRBQTJEO1FBQzNELDJDQUEyQztRQUMzQyxpQ0FBYSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQTlCUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7WUFDaEQsU0FBUyxFQUFFLENBQUMsZ0NBQWlCLENBQUM7U0FDakMsQ0FBQzt5Q0FrQjRCLFdBQUksRUFBdUIsZ0NBQWlCLEVBQWtCLGVBQU07T0FqQnJGLGlCQUFpQixDQWdDN0I7SUFBRCx3QkFBQztDQUFBLEFBaENELElBZ0NDO0FBaENZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UsIE5hdmlnYXRlZERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL3NoYXJlZC90YXNrL3Rhc2subW9kZWxcIjtcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEuc2VydmljZVwiO1xuaW1wb3J0IHsgRGF0YVJldHJpZXZlciB9IGZyb20gXCIuLi9zaGFyZWQvcGFzcy1kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcblxuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidG1yLXRhc2stbGlzdFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImxpc3RfdGFza3MvdGFza2xpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImxpc3RfdGFza3MvdGFza2xpc3QuY29tcG9uZW50LmNzc1wiXSxcbiAgICBwcm92aWRlcnM6IFtTeXN0ZW1EYXRhU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVGFza0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgdGFza0xpc3Q6IEFycmF5PFRhc2s+O1xuXG4gICAgdmlld1Rhc2sodGFzazogVGFzaykge1xuICAgICAgICBEYXRhUmV0cmlldmVyLmRhdGEgPSB0YXNrO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrXCJdKTtcbiAgICB9XG5cbiAgICByZWZyZXNoVGFza3MoKSB7XG4gICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLmRhdGFNYW5hZ2VyLmxvYWRBbGxUYXNrcygpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnJlZnJlc2hUYXNrcygpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgZGF0YU1hbmFnZXI6IFN5c3RlbURhdGFTZXJ2aWNlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoZXZlbnQ6IE5hdmlnYXRlZERhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5pc0JhY2tOYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV3VGFzaygpIHtcbiAgICAgICAgLy9jcmVhdGUgYSBibGFuayBhY3Rpdml0eSBhbmQgbmF2aWdhdGUgdG8gdGhlIGVkaXQgYWN0aXZpdHlcbiAgICAgICAgLy9wYWdlIHNvIHRoZSB1c2VyIGNhbiBmaWxsIGluIHRoZSBkZXRhaWxzLlxuICAgICAgICBEYXRhUmV0cmlldmVyLmRhdGEgPSBuZXcgVGFzayhcIlwiLCBcIlwiLCBbXSk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhc2svZWRpdFwiXSk7XG4gICAgfVxuXG59XG5cbiJdfQ==