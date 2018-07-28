"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialogs = require("ui/dialogs");
var task_model_1 = require("../../../shared/task/task.model");
var pass_data_service_1 = require("../../../shared/pass-data.service");
var data_service_1 = require("../../../shared/data.service");
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
            templateUrl: "pages/list_tasks/task-selector/task-selector.component.html",
            styleUrls: ["pages/list_tasks/task-selector/task-selector.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, data_service_1.SystemDataService,
            pass_data_service_1.DataRetriever, share_task_service_1.ShareTaskService])
    ], TaskSelectorComponent);
    return TaskSelectorComponent;
}());
exports.TaskSelectorComponent = TaskSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFpRDtBQUNqRCwwQ0FBeUM7QUFDekMsb0NBQXNDO0FBRXRDLDhEQUF1RDtBQUN2RCx1RUFBa0U7QUFDbEUsNkRBQWlFO0FBQ2pFLGtFQUErRDtBQUUvRCw4Q0FBOEM7QUFDOUMsc0ZBQXNGO0FBT3RGO0lBT0ksK0JBQW9CLE1BQWMsRUFBVSxXQUE4QixFQUM5RCxhQUE0QixFQUFVLGdCQUFrQztRQURoRSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQzlELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUVwRixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCw4Q0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVEOzBCQUNzQjtJQUN0QiwwQ0FBVSxHQUFWO1FBQUEsaUJBZUM7UUFkRyxJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSxRQUFRO1lBQ2YsT0FBTyxFQUFFLENBQUMsa0NBQWtDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ3BFLFlBQVksRUFBRSxLQUFLO1lBQ25CLGdCQUFnQixFQUFFLElBQUk7U0FDekIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ3ZCLElBQUksQ0FBRSxVQUFDLGFBQWE7WUFDakIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFDRCxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQXhDUTtRQUFSLFlBQUssRUFBRTtrQ0FBTyxpQkFBSTt1REFBQztJQUNYO1FBQVIsWUFBSyxFQUFFO2tDQUFXLEtBQUs7MkRBQU87SUFDdEI7UUFBUixZQUFLLEVBQUU7O3dEQUFlO0lBSmQscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsNkRBQTZEO1lBQzFFLFNBQVMsRUFBRSxDQUFDLDREQUE0RCxDQUFDO1NBQzVFLENBQUM7eUNBUThCLGVBQU0sRUFBdUIsZ0NBQWlCO1lBQy9DLGlDQUFhLEVBQTRCLHFDQUFnQjtPQVIzRSxxQkFBcUIsQ0E0Q2pDO0lBQUQsNEJBQUM7Q0FBQSxBQTVDRCxJQTRDQztBQTVDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi8uLi8uLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIi4uLy4uLy4uL3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL2RhdGEuc2VydmljZVwiO1xuaW1wb3J0IHsgU2hhcmVUYXNrU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zaGFyZS10YXNrLnNlcnZpY2VcIjtcblxuLy9pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XG4vL2ltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQvc3RhY2stbGF5b3V0XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRhc2stc2VsZWN0b3JcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9saXN0X3Rhc2tzL3Rhc2stc2VsZWN0b3IvdGFzay1zZWxlY3Rvci5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbGlzdF90YXNrcy90YXNrLXNlbGVjdG9yL3Rhc2stc2VsZWN0b3IuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBUYXNrU2VsZWN0b3JDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgdGFzazogVGFzaztcbiAgICBASW5wdXQoKSB0YXNrTGlzdDogQXJyYXk8VGFzaz47XG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YVNlcnZpY2U6IFN5c3RlbURhdGFTZXJ2aWNlLCBcbiAgICAgICAgcHJpdmF0ZSBkYXRhUmV0cmlldmVyOiBEYXRhUmV0cmlldmVyLCBwcml2YXRlIHNoYXJlVGFza1NlcnZpY2U6IFNoYXJlVGFza1NlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIHZpZXdUYXNrKCkge1xuICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YSA9IHRoaXMudGFzaztcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFza1wiXSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2VsZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKiBEZWxldGUgdGhlIHRhc2sgY29ycmVzcG9uZGluZyB0byB0aGlzIGNvbXBvbmVudCBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50J3MgdGFza0xpc3RcbiAgICBhbmQgZnJvbSB0aGUgZGV2aWNlICovXG4gICAgZGVsZXRlVGFzaygpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGVcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IChcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgXCIgKyB0aGlzLnRhc2submFtZSArIFwiP1wiKSxcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJZZXNcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIlxuICAgICAgICB9O1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucylcbiAgICAgICAgLnRoZW4oICh3YW50c1RvRGVsZXRlKSA9PiB7XG4gICAgICAgICAgICBpZiAod2FudHNUb0RlbGV0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFza0xpc3Quc3BsaWNlKHRoaXMuaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNlcnZpY2UuZGVsZXRlVGFzayh0aGlzLnRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaGFyZVRhc2soKSB7XG4gICAgICAgIHRoaXMuc2hhcmVUYXNrU2VydmljZS5zaGFyZVRhc2sodGhpcy50YXNrKTtcbiAgICB9XG5cbn1cblxuIl19