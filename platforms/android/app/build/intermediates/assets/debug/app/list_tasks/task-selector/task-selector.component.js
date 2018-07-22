"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var task_model_1 = require("../../shared/task/task.model");
var pass_data_service_1 = require("../../shared/pass-data.service");
var data_service_1 = require("../../shared/data.service");
var dialogs = require("ui/dialogs");
var firebase_service_1 = require("~/shared/firebase.service");
//import { EventData } from "data/observable";
//import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
var TaskSelectorComponent = /** @class */ (function () {
    function TaskSelectorComponent(router, dataService, dataRetriever, firebaseService) {
        this.router = router;
        this.dataService = dataService;
        this.dataRetriever = dataRetriever;
        this.firebaseService = firebaseService;
    }
    TaskSelectorComponent.prototype.ngOnInit = function () {
        this.firebaseService.initializeFirebase();
    };
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
            pass_data_service_1.DataRetriever, firebase_service_1.FirebaseService])
    ], TaskSelectorComponent);
    return TaskSelectorComponent;
}());
exports.TaskSelectorComponent = TaskSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay1zZWxlY3Rvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLXNlbGVjdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBeUM7QUFDekMsMkRBQW9EO0FBQ3BELG9FQUErRDtBQUMvRCwwREFBOEQ7QUFDOUQsb0NBQXNDO0FBQ3RDLDhEQUE0RDtBQUU1RCw4Q0FBOEM7QUFDOUMsc0ZBQXNGO0FBT3RGO0lBT0ksK0JBQW9CLE1BQWMsRUFBVSxXQUE4QixFQUM5RCxhQUE0QixFQUFVLGVBQWdDO1FBRDlELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFFbEYsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFRDswQkFDc0I7SUFDdEIsMENBQVUsR0FBVjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUsUUFBUTtZQUNmLE9BQU8sRUFBRSxDQUFDLGtDQUFrQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNwRSxZQUFZLEVBQUUsS0FBSztZQUNuQixnQkFBZ0IsRUFBRSxJQUFJO1NBQ3pCLENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN2QixJQUFJLENBQUUsVUFBQyxhQUFhO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBQ0QsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBeENRO1FBQVIsWUFBSyxFQUFFO2tDQUFPLGlCQUFJO3VEQUFDO0lBQ1g7UUFBUixZQUFLLEVBQUU7a0NBQVcsS0FBSzsyREFBTztJQUN0QjtRQUFSLFlBQUssRUFBRTs7d0RBQWU7SUFKZCxxQkFBcUI7UUFMakMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSx1REFBdUQ7WUFDcEUsU0FBUyxFQUFFLENBQUMsc0RBQXNELENBQUM7U0FDdEUsQ0FBQzt5Q0FROEIsZUFBTSxFQUF1QixnQ0FBaUI7WUFDL0MsaUNBQWEsRUFBMkIsa0NBQWU7T0FSekUscUJBQXFCLENBNENqQztJQUFELDRCQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7QUE1Q1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90YXNrL3Rhc2subW9kZWxcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZmlyZWJhc2Uuc2VydmljZVwiO1xuXG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbi8vaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dC9zdGFjay1sYXlvdXRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidGFzay1zZWxlY3RvclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImxpc3RfdGFza3MvdGFzay1zZWxlY3Rvci90YXNrLXNlbGVjdG9yLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJsaXN0X3Rhc2tzL3Rhc2stc2VsZWN0b3IvdGFzay1zZWxlY3Rvci5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tTZWxlY3RvckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSB0YXNrOiBUYXNrO1xuICAgIEBJbnB1dCgpIHRhc2tMaXN0OiBBcnJheTxUYXNrPjtcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhU2VydmljZTogU3lzdGVtRGF0YVNlcnZpY2UsIFxuICAgICAgICBwcml2YXRlIGRhdGFSZXRyaWV2ZXI6IERhdGFSZXRyaWV2ZXIsIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5pbml0aWFsaXplRmlyZWJhc2UoKTtcbiAgICB9XG5cbiAgICB2aWV3VGFzaygpIHtcbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmRhdGEgPSB0aGlzLnRhc2s7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhc2tcIl0pO1xuICAgIH1cblxuICAgIHRvZ2dsZVNlbGVjdGVkKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgLyogRGVsZXRlIHRoZSB0YXNrIGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBjb21wb25lbnQgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudCdzIHRhc2tMaXN0XG4gICAgYW5kIGZyb20gdGhlIGRldmljZSAqL1xuICAgIGRlbGV0ZVRhc2soKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiAoXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIFwiICsgdGhpcy50YXNrLm5hbWUgKyBcIj9cIiksXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiWWVzXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIk5vXCJcbiAgICAgICAgfTtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpXG4gICAgICAgIC50aGVuKCAod2FudHNUb0RlbGV0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHdhbnRzVG9EZWxldGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tMaXN0LnNwbGljZSh0aGlzLmluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFTZXJ2aWNlLmRlbGV0ZVRhc2sodGhpcy50YXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbiJdfQ==