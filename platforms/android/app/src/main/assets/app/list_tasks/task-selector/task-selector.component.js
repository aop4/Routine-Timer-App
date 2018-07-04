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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBeUM7QUFDekMsMkRBQW9EO0FBQ3BELG9FQUErRDtBQUMvRCwwREFBOEQ7QUFDOUQsb0NBQXNDO0FBRXRDLDhDQUE4QztBQUM5QyxzRkFBc0Y7QUFPdEY7SUFPSSwrQkFBb0IsTUFBYyxFQUFVLFdBQThCO1FBQXRELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7SUFFMUUsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxpQ0FBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFRDswQkFDc0I7SUFDdEIsMENBQVUsR0FBVjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUsUUFBUTtZQUNmLE9BQU8sRUFBRSxDQUFDLGtDQUFrQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNwRSxZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxJQUFJO1NBQ3pCLENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN2QixJQUFJLENBQUUsVUFBQyxhQUFhO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbkNRO1FBQVIsWUFBSyxFQUFFO2tDQUFPLGlCQUFJO3VEQUFDO0lBQ1g7UUFBUixZQUFLLEVBQUU7a0NBQVcsS0FBSzsyREFBTztJQUN0QjtRQUFSLFlBQUssRUFBRTs7d0RBQWU7SUFKZCxxQkFBcUI7UUFMakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSx1REFBdUQ7WUFDcEUsU0FBUyxFQUFFLENBQUMsc0RBQXNELENBQUM7U0FDdEUsQ0FBQzt5Q0FROEIsZUFBTSxFQUF1QixnQ0FBaUI7T0FQakUscUJBQXFCLENBdUNqQztJQUFELDRCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7QUF2Q1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90YXNrL3Rhc2subW9kZWxcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuLy9pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0L3N0YWNrLWxheW91dFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0YXNrLXNlbGVjdG9yXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwibGlzdF90YXNrcy90YXNrLXNlbGVjdG9yL3Rhc2stc2VsZWN0b3IuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcImxpc3RfdGFza3MvdGFzay1zZWxlY3Rvci90YXNrLXNlbGVjdG9yLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgVGFza1NlbGVjdG9yQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIHRhc2s6IFRhc2s7XG4gICAgQElucHV0KCkgdGFza0xpc3Q6IEFycmF5PFRhc2s+O1xuICAgIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGRhdGFTZXJ2aWNlOiBTeXN0ZW1EYXRhU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgdmlld1Rhc2soKSB7XG4gICAgICAgIERhdGFSZXRyaWV2ZXIuZGF0YSA9IHRoaXMudGFzaztcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFza1wiXSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKiBEZWxldGUgdGhlIHRhc2sgY29ycmVzcG9uZGluZyB0byB0aGlzIGNvbXBvbmVudCBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50J3MgdGFza0xpc3RcbiAgICBhbmQgZnJvbSB0aGUgZGV2aWNlICovXG4gICAgZGVsZXRlVGFzaygpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGVcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IChcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgXCIgKyB0aGlzLnRhc2submFtZSArIFwiP1wiKSxcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJZZXNcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIlxuICAgICAgICB9O1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucylcbiAgICAgICAgLnRoZW4oICh3YW50c1RvRGVsZXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAod2FudHNUb0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFza0xpc3Quc3BsaWNlKHRoaXMuaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlVGFzayh0aGlzLnRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuIl19