"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var task_model_1 = require("../../shared/task/task.model");
var pass_data_service_1 = require("../../shared/pass-data.service");
var data_service_1 = require("../../shared/data.service");
var dialogs = require("ui/dialogs");
var share_task_service_1 = require("~/shared/share-task.service");
//import { EventData } from "data/observable";
//import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
var TaskSelectorComponent = /** @class */ (function () {
    function TaskSelectorComponent(router, dataService, dataRetriever, shareTaskService) {
        this.router = router;
        this.dataService = dataService;
        this.dataRetriever = dataRetriever;
        this.shareTaskService = shareTaskService;
    }
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
                _this.taskList.splice(_this.index, 1);
                _this.dataService.deleteTask(_this.task);
            }
            _this.selected = false;
        });
    };
    TaskSelectorComponent.prototype.shareTask = function () {
        this.shareTaskService.shareTask(this.task);
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
        __metadata("design:paramtypes", [router_1.Router, data_service_1.SystemDataService,
            pass_data_service_1.DataRetriever, share_task_service_1.ShareTaskService])
    ], TaskSelectorComponent);
    return TaskSelectorComponent;
}());
exports.TaskSelectorComponent = TaskSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBeUM7QUFDekMsMkRBQW9EO0FBQ3BELG9FQUErRDtBQUMvRCwwREFBOEQ7QUFDOUQsb0NBQXNDO0FBRXRDLGtFQUErRDtBQUUvRCw4Q0FBOEM7QUFDOUMsc0ZBQXNGO0FBT3RGO0lBT0ksK0JBQW9CLE1BQWMsRUFBVSxXQUE4QixFQUM5RCxhQUE0QixFQUFVLGdCQUFrQztRQURoRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQzlELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUVwRixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCw4Q0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVEOzBCQUNzQjtJQUN0QiwwQ0FBVSxHQUFWO1FBQUEsaUJBZUM7UUFkRyxJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSxRQUFRO1lBQ2YsT0FBTyxFQUFFLENBQUMsa0NBQWtDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ3BFLFlBQVksRUFBRSxLQUFLO1lBQ25CLGdCQUFnQixFQUFFLElBQUk7U0FDekIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ3ZCLElBQUksQ0FBRSxVQUFDLGFBQWE7WUFDakIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFDRCxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQXhDUTtRQUFSLFlBQUssRUFBRTtrQ0FBTyxpQkFBSTt1REFBQztJQUNYO1FBQVIsWUFBSyxFQUFFO2tDQUFXLEtBQUs7MkRBQU87SUFDdEI7UUFBUixZQUFLLEVBQUU7O3dEQUFlO0lBSmQscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsdURBQXVEO1lBQ3BFLFNBQVMsRUFBRSxDQUFDLHNEQUFzRCxDQUFDO1NBQ3RFLENBQUM7eUNBUThCLGVBQU0sRUFBdUIsZ0NBQWlCO1lBQy9DLGlDQUFhLEVBQTRCLHFDQUFnQjtPQVIzRSxxQkFBcUIsQ0E0Q2pDO0lBQUQsNEJBQUM7Q0FBQSxBQTVDRCxJQTRDQztBQTVDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuaW1wb3J0IHsgRGF0YVJldHJpZXZlciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvcGFzcy1kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9maXJlYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTaGFyZVRhc2tTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NoYXJlLXRhc2suc2VydmljZVwiO1xuXG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbi8vaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidGFzay1zZWxlY3RvclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImxpc3RfdGFza3MvdGFzay1zZWxlY3Rvci90YXNrLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJsaXN0X3Rhc2tzL3Rhc2stc2VsZWN0b3IvdGFzay1zZWxlY3Rvci5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tTZWxlY3RvckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSB0YXNrOiBUYXNrO1xuICAgIEBJbnB1dCgpIHRhc2tMaXN0OiBBcnJheTxUYXNrPjtcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhU2VydmljZTogU3lzdGVtRGF0YVNlcnZpY2UsIFxuICAgICAgICBwcml2YXRlIGRhdGFSZXRyaWV2ZXI6IERhdGFSZXRyaWV2ZXIsIHByaXZhdGUgc2hhcmVUYXNrU2VydmljZTogU2hhcmVUYXNrU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgdmlld1Rhc2soKSB7XG4gICAgICAgIHRoaXMuZGF0YVJldHJpZXZlci5kYXRhID0gdGhpcy50YXNrO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrXCJdKTtcbiAgICB9XG5cbiAgICB0b2dnbGVTZWxlY3RlZCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qIERlbGV0ZSB0aGUgdGFzayBjb3JyZXNwb25kaW5nIHRvIHRoaXMgY29tcG9uZW50IGZyb20gdGhlIHBhcmVudCBjb21wb25lbnQncyB0YXNrTGlzdFxuICAgIGFuZCBmcm9tIHRoZSBkZXZpY2UgKi9cbiAgICBkZWxldGVUYXNrKCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZVwiLFxuICAgICAgICAgICAgbWVzc2FnZTogKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBcIiArIHRoaXMudGFzay5uYW1lICsgXCI/XCIpLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlllc1wiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiXG4gICAgICAgIH07XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKVxuICAgICAgICAudGhlbiggKHdhbnRzVG9EZWxldGUpID0+IHtcbiAgICAgICAgICAgIGlmICh3YW50c1RvRGVsZXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrTGlzdC5zcGxpY2UodGhpcy5pbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5kZWxldGVUYXNrKHRoaXMudGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNoYXJlVGFzaygpIHtcbiAgICAgICAgdGhpcy5zaGFyZVRhc2tTZXJ2aWNlLnNoYXJlVGFzayh0aGlzLnRhc2spO1xuICAgIH1cblxufVxuXG4iXX0=