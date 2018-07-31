"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialogs = require("ui/dialogs");
var task_model_1 = require("../../../shared/task/task.model");
var pass_data_service_1 = require("../../../shared/pass-data.service");
var data_service_1 = require("../../../shared/data.service");
var share_task_service_1 = require("~/shared/share-task.service");
var TaskSelectorComponent = /** @class */ (function () {
    function TaskSelectorComponent(router, dataService, dataRetriever, shareTaskService) {
        this.router = router;
        this.dataService = dataService;
        this.dataRetriever = dataRetriever;
        this.shareTaskService = shareTaskService;
    }
    /* Open up the page for interacting with the individual task
    represented by this component. Has the timers and stuff. */
    TaskSelectorComponent.prototype.viewTask = function () {
        this.dataRetriever.data = this.task;
        this.router.navigate(["task"]);
    };
    TaskSelectorComponent.prototype.toggleSelected = function () {
        this.selected = !this.selected;
    };
    /* Delete the task corresponding to this component from the parent component's taskList
    and from the device */
    TaskSelectorComponent.prototype.deleteTask = function () {
        var _this = this;
        var options = {
            title: "Delete",
            message: ("Are you sure you want to delete " + this.task.name + "?"),
            okButtonText: "Yes",
            cancelButtonText: "No"
        };
        dialogs.confirm(options)
            .then(function (wantsToDelete) {
            if (wantsToDelete) {
                //get the task out of the list of tasks
                _this.taskList.splice(_this.index, 1);
                //clear the memory of this task from the device
                _this.dataService.deleteTask(_this.task);
            }
            //unselect the item regardless of the user's choice to delete
            _this.selected = false;
        });
    };
    /* Pop up a window to share the task with  other users. */
    TaskSelectorComponent.prototype.shareTask = function () {
        this.shareTaskService.shareTask(this.task);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", task_model_1.Task)
    ], TaskSelectorComponent.prototype, "task", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TaskSelectorComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TaskSelectorComponent.prototype, "taskList", void 0);
    TaskSelectorComponent = __decorate([
        core_1.Component({
            selector: "task-selector",
            templateUrl: "pages/list_tasks/task-selector/task-selector.component.html",
            styleUrls: ["pages/list_tasks/task-selector/task-selector.component.css"]
        })
        /* Represents an item in the tasks list. */
        ,
        __metadata("design:paramtypes", [router_1.Router, data_service_1.SystemDataService,
            pass_data_service_1.DataRetriever, share_task_service_1.ShareTaskService])
    ], TaskSelectorComponent);
    return TaskSelectorComponent;
}());
exports.TaskSelectorComponent = TaskSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRDtBQUNqRCwwQ0FBeUM7QUFDekMsb0NBQXNDO0FBRXRDLDhEQUF1RDtBQUN2RCx1RUFBa0U7QUFDbEUsNkRBQWlFO0FBQ2pFLGtFQUErRDtBQVEvRDtJQU9JLCtCQUFvQixNQUFjLEVBQVUsV0FBOEIsRUFDOUQsYUFBNEIsRUFBVSxnQkFBa0M7UUFEaEUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUM5RCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFFcEYsQ0FBQztJQUVEOytEQUMyRDtJQUMzRCx3Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDhDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7MEJBQ3NCO0lBQ3RCLDBDQUFVLEdBQVY7UUFBQSxpQkFrQkM7UUFqQkcsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUsUUFBUTtZQUNmLE9BQU8sRUFBRSxDQUFDLGtDQUFrQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNwRSxZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxJQUFJO1NBQ3pCLENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN2QixJQUFJLENBQUUsVUFBQyxhQUFhO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLHVDQUF1QztnQkFDdkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsK0NBQStDO2dCQUMvQyxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUNELDZEQUE2RDtZQUM3RCxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwREFBMEQ7SUFDMUQseUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUE5Q1E7UUFBUixZQUFLLEVBQUU7a0NBQU8saUJBQUk7dURBQUM7SUFDWDtRQUFSLFlBQUssRUFBRTs7d0RBQWU7SUFDZDtRQUFSLFlBQUssRUFBRTtrQ0FBVyxLQUFLOzJEQUFPO0lBSnRCLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDZEQUE2RDtZQUMxRSxTQUFTLEVBQUUsQ0FBQyw0REFBNEQsQ0FBQztTQUM1RSxDQUFDO1FBQ0YsMkNBQTJDOzt5Q0FRWCxlQUFNLEVBQXVCLGdDQUFpQjtZQUMvQyxpQ0FBYSxFQUE0QixxQ0FBZ0I7T0FSM0UscUJBQXFCLENBa0RqQztJQUFELDRCQUFDO0NBQUEsQUFsREQsSUFrREM7QUFsRFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuaW1wb3J0IHsgRGF0YVJldHJpZXZlciB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvcGFzcy1kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNoYXJlVGFza1NlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2hhcmUtdGFzay5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRhc2stc2VsZWN0b3JcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9saXN0X3Rhc2tzL3Rhc2stc2VsZWN0b3IvdGFzay1zZWxlY3Rvci5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbGlzdF90YXNrcy90YXNrLXNlbGVjdG9yL3Rhc2stc2VsZWN0b3IuY29tcG9uZW50LmNzc1wiXVxufSlcbi8qIFJlcHJlc2VudHMgYW4gaXRlbSBpbiB0aGUgdGFza3MgbGlzdC4gKi9cbmV4cG9ydCBjbGFzcyBUYXNrU2VsZWN0b3JDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgdGFzazogVGFzaztcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyOyAvL3RoZSBpbmRleCBvZiB0aGUgdGFza1xuICAgIEBJbnB1dCgpIHRhc2tMaXN0OiBBcnJheTxUYXNrPjtcbiAgICBzZWxlY3RlZDogYm9vbGVhbjsgLy93aGV0aGVyIHRoZSB0YXNrIGlzIGN1cnJlbnRseSBzZWxlY3RlZCAoYnkgYSBsb25nIHByZXNzKVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhU2VydmljZTogU3lzdGVtRGF0YVNlcnZpY2UsIFxuICAgICAgICBwcml2YXRlIGRhdGFSZXRyaWV2ZXI6IERhdGFSZXRyaWV2ZXIsIHByaXZhdGUgc2hhcmVUYXNrU2VydmljZTogU2hhcmVUYXNrU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgLyogT3BlbiB1cCB0aGUgcGFnZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgaW5kaXZpZHVhbCB0YXNrXG4gICAgcmVwcmVzZW50ZWQgYnkgdGhpcyBjb21wb25lbnQuIEhhcyB0aGUgdGltZXJzIGFuZCBzdHVmZi4gKi9cbiAgICB2aWV3VGFzaygpIHtcbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmRhdGEgPSB0aGlzLnRhc2s7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhc2tcIl0pO1xuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdGVkKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgLyogRGVsZXRlIHRoZSB0YXNrIGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBjb21wb25lbnQgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudCdzIHRhc2tMaXN0XG4gICAgYW5kIGZyb20gdGhlIGRldmljZSAqL1xuICAgIGRlbGV0ZVRhc2soKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiAoXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIFwiICsgdGhpcy50YXNrLm5hbWUgKyBcIj9cIiksXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIk5vXCJcbiAgICAgICAgfTtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpXG4gICAgICAgIC50aGVuKCAod2FudHNUb0RlbGV0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHdhbnRzVG9EZWxldGUpIHtcbiAgICAgICAgICAgICAgICAvL2dldCB0aGUgdGFzayBvdXQgb2YgdGhlIGxpc3Qgb2YgdGFza3NcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tMaXN0LnNwbGljZSh0aGlzLmluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvL2NsZWFyIHRoZSBtZW1vcnkgb2YgdGhpcyB0YXNrIGZyb20gdGhlIGRldmljZVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlVGFzayh0aGlzLnRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy91bnNlbGVjdCB0aGUgaXRlbSByZWdhcmRsZXNzIG9mIHRoZSB1c2VyJ3MgY2hvaWNlIHRvIGRlbGV0ZVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiBQb3AgdXAgYSB3aW5kb3cgdG8gc2hhcmUgdGhlIHRhc2sgd2l0aCAgb3RoZXIgdXNlcnMuICovXG4gICAgc2hhcmVUYXNrKCkge1xuICAgICAgICB0aGlzLnNoYXJlVGFza1NlcnZpY2Uuc2hhcmVUYXNrKHRoaXMudGFzayk7XG4gICAgfVxuXG59XG5cbiJdfQ==