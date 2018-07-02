"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var task_model_1 = require("../../shared/task/task.model");
var pass_data_service_1 = require("../../shared/pass-data.service");
var data_service_1 = require("../../shared/data.service");
var dialogs = require("ui/dialogs");
//import { EventData } from "data/observable";
//import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
var TaskSelectorComponent = /** @class */ (function () {
    function TaskSelectorComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
    }
    TaskSelectorComponent.prototype.viewTask = function () {
        pass_data_service_1.DataRetriever.data = this.task;
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
                _this.taskList.splice(_this.index, 1);
                _this.dataService.deleteTask(_this.task);
            }
            _this.selected = false;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", task_model_1.Task)
    ], TaskSelectorComponent.prototype, "task", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TaskSelectorComponent.prototype, "taskList", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TaskSelectorComponent.prototype, "index", void 0);
    TaskSelectorComponent = __decorate([
        core_1.Component({
            selector: "task-selector",
            templateUrl: "list_tasks/task-selector/task-selector.component.html",
            styleUrls: ["list_tasks/task-selector/task-selector.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, data_service_1.SystemDataService])
    ], TaskSelectorComponent);
    return TaskSelectorComponent;
}());
exports.TaskSelectorComponent = TaskSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBeUM7QUFDekMsMkRBQW9EO0FBQ3BELG9FQUErRDtBQUMvRCwwREFBOEQ7QUFDOUQsb0NBQXNDO0FBRXRDLDhDQUE4QztBQUM5QyxzRkFBc0Y7QUFPdEY7SUFPSSwrQkFBb0IsTUFBYyxFQUFVLFdBQThCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7SUFFMUUsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxpQ0FBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFRDswQkFDc0I7SUFDdEIsMENBQVUsR0FBVjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUsUUFBUTtZQUNmLE9BQU8sRUFBRSxDQUFDLGtDQUFrQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNwRSxZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxJQUFJO1NBQ3pCLENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN2QixJQUFJLENBQUUsVUFBQyxhQUFhO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbkNRO1FBQVIsWUFBSyxFQUFFO2tDQUFPLGlCQUFJO3VEQUFDO0lBQ1g7UUFBUixZQUFLLEVBQUU7a0NBQVcsS0FBSzsyREFBTztJQUN0QjtRQUFSLFlBQUssRUFBRTs7d0RBQWU7SUFKZCxxQkFBcUI7UUFMakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSx1REFBdUQ7WUFDcEUsU0FBUyxFQUFFLENBQUMsc0RBQXNELENBQUM7U0FDdEUsQ0FBQzt5Q0FROEIsZUFBTSxFQUF1QixnQ0FBaUI7T0FQakUscUJBQXFCLENBdUNqQztJQUFELDRCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7QUF2Q1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuLy9pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbi8vaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXRcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwidGFzay1zZWxlY3RvclwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwibGlzdF90YXNrcy90YXNrLXNlbGVjdG9yL3Rhc2stc2VsZWN0b3IuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wibGlzdF90YXNrcy90YXNrLXNlbGVjdG9yL3Rhc2stc2VsZWN0b3IuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFza1NlbGVjdG9yQ29tcG9uZW50IHtcclxuXHJcbiAgICBASW5wdXQoKSB0YXNrOiBUYXNrO1xyXG4gICAgQElucHV0KCkgdGFza0xpc3Q6IEFycmF5PFRhc2s+O1xyXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcclxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVNlcnZpY2U6IFN5c3RlbURhdGFTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHZpZXdUYXNrKCkge1xyXG4gICAgICAgIERhdGFSZXRyaWV2ZXIuZGF0YSA9IHRoaXMudGFzaztcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrXCJdKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVTZWxlY3RlZCgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRGVsZXRlIHRoZSB0YXNrIGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBjb21wb25lbnQgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudCdzIHRhc2tMaXN0XHJcbiAgICBhbmQgZnJvbSB0aGUgZGV2aWNlICovXHJcbiAgICBkZWxldGVUYXNrKCkge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGVcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBcIiArIHRoaXMudGFzay5uYW1lICsgXCI/XCIpLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiWWVzXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpXHJcbiAgICAgICAgLnRoZW4oICh3YW50c1RvRGVsZXRlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh3YW50c1RvRGVsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tMaXN0LnNwbGljZSh0aGlzLmluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlVGFzayh0aGlzLnRhc2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==