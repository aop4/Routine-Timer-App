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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza2xpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFza2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThEO0FBQzlELDBDQUEyRDtBQUMzRCxpREFBK0Q7QUFDL0Qsd0RBQWlEO0FBR2pELHVEQUEyRDtBQUMzRCxpRUFBNEQ7QUFXNUQ7SUFpQkksMkJBQW9CLElBQVUsRUFBVSxXQUE4QixFQUFVLE1BQWM7UUFBOUYsaUJBTUM7UUFObUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDMUYsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBb0I7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuQkQsb0NBQVEsR0FBUixVQUFTLElBQVU7UUFDZixpQ0FBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx3Q0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFVRCxtQ0FBTyxHQUFQO1FBQ0ksMkRBQTJEO1FBQzNELDJDQUEyQztRQUMzQyxpQ0FBYSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQTlCUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7WUFDaEQsU0FBUyxFQUFFLENBQUMsZ0NBQWlCLENBQUM7U0FDakMsQ0FBQzt5Q0FrQjRCLFdBQUksRUFBdUIsZ0NBQWlCLEVBQWtCLGVBQU07T0FqQnJGLGlCQUFpQixDQWdDN0I7SUFBRCx3QkFBQztDQUFBLEFBaENELElBZ0NDO0FBaENZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL3NoYXJlZC90YXNrL3Rhc2subW9kZWxcIjtcclxuaW1wb3J0IHsgU3RlcCB9IGZyb20gXCIuLi9zaGFyZWQvc3RlcC9zdGVwLm1vZGVsXCI7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhLCBSYWRMaXN0VmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXdcIjtcclxuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIi4uL3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcblxyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0L3N0YWNrLWxheW91dFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ0bXItdGFzay1saXN0XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJsaXN0X3Rhc2tzL3Rhc2tsaXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImxpc3RfdGFza3MvdGFza2xpc3QuY29tcG9uZW50LmNzc1wiXSxcclxuICAgIHByb3ZpZGVyczogW1N5c3RlbURhdGFTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFza0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHRhc2tMaXN0OiBBcnJheTxUYXNrPjtcclxuXHJcbiAgICB2aWV3VGFzayh0YXNrOiBUYXNrKSB7XHJcbiAgICAgICAgRGF0YVJldHJpZXZlci5kYXRhID0gdGFzaztcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrXCJdKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVGFza3MoKSB7XHJcbiAgICAgICAgdGhpcy50YXNrTGlzdCA9IHRoaXMuZGF0YU1hbmFnZXIubG9hZEFsbFRhc2tzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVGFza3MoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoZXZlbnQ6IE5hdmlnYXRlZERhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFRhc2tzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdUYXNrKCkge1xyXG4gICAgICAgIC8vY3JlYXRlIGEgYmxhbmsgYWN0aXZpdHkgYW5kIG5hdmlnYXRlIHRvIHRoZSBlZGl0IGFjdGl2aXR5XHJcbiAgICAgICAgLy9wYWdlIHNvIHRoZSB1c2VyIGNhbiBmaWxsIGluIHRoZSBkZXRhaWxzLlxyXG4gICAgICAgIERhdGFSZXRyaWV2ZXIuZGF0YSA9IG5ldyBUYXNrKFwiXCIsIFwiXCIsIFtdKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrL2VkaXRcIl0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19