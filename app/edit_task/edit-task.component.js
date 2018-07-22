"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var task_model_1 = require("../shared/task/task.model");
var step_model_1 = require("../shared/step/step.model");
var edit_step_component_1 = require("../edit_step/edit-step.component");
var data_service_1 = require("../shared/data.service");
var pass_data_service_1 = require("../shared/pass-data.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var util_1 = require("../util");
var application_1 = require("application");
var dialogs = require("ui/dialogs");
var common_1 = require("@angular/common");
var EditTaskComponent = /** @class */ (function () {
    function EditTaskComponent(page, dataManager, modal, vcRef, router, location, dataRetriever) {
        this.page = page;
        this.dataManager = dataManager;
        this.modal = modal;
        this.vcRef = vcRef;
        this.router = router;
        this.location = location;
        this.dataRetriever = dataRetriever;
        this.padTwoDigits = util_1.padTwoDigits; //to use this function from util in the template
        var taskData = this.dataRetriever.data;
        this.task = new task_model_1.Task(taskData.name, taskData.description, taskData.steps);
        this.savedTask = util_1.clone(this.task);
        //store the original name of the task so we can retrieve an unadulterated copy in the 
        //TaskComponent (previous page) if the user doesn't save here
        this.dataRetriever.identifier = this.task.name.toString(); //the reference to the name is destroyed on back press; copy it
    }
    EditTaskComponent.prototype.showFailureMsg = function (msg) {
        var options = {
            title: 'Save failed',
            message: msg
        };
        dialogs.alert(options);
    };
    //handle a non-native back button press
    EditTaskComponent.prototype.backPress = function () {
        var _this = this;
        //if the user has unsaved changes
        if (this.changesNotSaved()) {
            var options = {
                title: "Unsaved changes",
                message: "You've made unsaved changes.",
                okButtonText: "Save changes",
                cancelButtonText: "Discard changes",
                neutralButtonText: "Cancel"
            };
            dialogs.confirm(options).then(function (wantsToSave) {
                //if the user hits discard changes, let them go back
                if (wantsToSave === false) {
                    //navigate back
                    _this.location.back();
                }
                else if (wantsToSave && _this.saveTask()) {
                    //navigate back
                    _this.location.back();
                }
                //the case where the user hits cancel (wantsToSave is undefined) needs
                //no action
            });
        }
        else {
            this.location.back();
        }
    };
    EditTaskComponent.prototype.changesNotSaved = function () {
        return (!util_1.deepEquals(this.task, this.savedTask));
    };
    EditTaskComponent.prototype.validData = function () {
        if (!this.task.name) {
            this.showFailureMsg("Please give this routine a name.");
            return false;
        }
        if (this.task.steps.length === 0) {
            this.showFailureMsg("Please add at least one step.");
            return false;
        }
        for (var i = 0; i < this.task.steps.length; i++) {
            var step = this.task.steps[i];
            if (!step.name) {
                this.showFailureMsg("Please name every step in the routine.");
                return false;
            }
            if (!util_1.isNonnegativeInteger(step.minutes) || !util_1.isNonnegativeInteger(step.seconds)) {
                this.showFailureMsg('The step "' + step.name + '" has an invalid time.');
                return false;
            }
        }
        return true;
    };
    /* Saves this.task to disk. Returns true if it saves and false if it doesn't. */
    EditTaskComponent.prototype.saveTask = function () {
        var _this = this;
        if (!this.validData()) {
            return false;
        }
        //attempt to save. On successful save, refresh the savedTask object to be the same as this.task
        this.dataManager.saveNewTask(this.task, (this.savedTask.name != this.task.name))
            .then(function (saved) {
            if (saved) {
                _this.savedTask = util_1.clone(_this.task);
                //in case the user changed the name, keep track of the new name so that, if the user 
                //navigates back to the view the task, they see the task they just saved instead of that with
                //the old name
                _this.dataRetriever.identifier = _this.task.name;
                return true;
            }
            return false;
        });
    };
    EditTaskComponent.prototype.newStep = function (index) {
        //create a new step
        var newStep = new step_model_1.Step("", "", 0, 0, 1);
        //add newStep to the indexth index of this.task.steps
        this.task.steps.splice(index, 0, newStep);
        //scroll the ListView to the new step
        this.scrollStepListToIndex(index);
        //launch an editing window for the new step
        this.editStepModal(newStep);
    };
    /* Causes the steps list view to scroll to its indexth item. */
    EditTaskComponent.prototype.scrollStepListToIndex = function (index) {
        var listView = this.stepList.nativeElement;
        listView.refresh(); //ensures an item just added to the steps array is loaded
        listView.scrollToIndex(index); //don't animate--async behavior causes glitches here
    };
    EditTaskComponent.prototype.editStepModal = function (step) {
        //prevent the annoying behavior of scrolling to the page's
        //last focused text view when the keyboard is used in the modal
        if (application_1.android) {
            this.descriptionField.nativeElement.android.clearFocus();
            this.nameField.nativeElement.android.clearFocus();
        }
        this.dataRetriever.data = step;
        var options = {
            context: { step: step },
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(edit_step_component_1.EditStepComponent, options).then(function (res) {
        });
    };
    EditTaskComponent.prototype.deleteStep = function (index) {
        var _this = this;
        var options = {
            title: "Delete this step?",
            message: "",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        };
        dialogs.confirm(options).then(function (wantsToDelete) {
            //if the user hits discard changes, let them go back
            if (wantsToDelete) {
                _this.task.removeStep(index);
            }
        });
    };
    __decorate([
        core_1.ViewChild('nameField'),
        __metadata("design:type", core_1.ElementRef)
    ], EditTaskComponent.prototype, "nameField", void 0);
    __decorate([
        core_1.ViewChild('descriptionField'),
        __metadata("design:type", core_1.ElementRef)
    ], EditTaskComponent.prototype, "descriptionField", void 0);
    __decorate([
        core_1.ViewChild('stepList'),
        __metadata("design:type", core_1.ElementRef)
    ], EditTaskComponent.prototype, "stepList", void 0);
    EditTaskComponent = __decorate([
        core_1.Component({
            selector: "tmr-edit-task",
            templateUrl: "edit_task/edit-task.component.html",
            styleUrls: ["edit_task/edit-task.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, data_service_1.SystemDataService, dialogs_1.ModalDialogService,
            core_1.ViewContainerRef, router_1.Router, common_1.Location,
            pass_data_service_1.DataRetriever])
    ], EditTaskComponent);
    return EditTaskComponent;
}());
exports.EditTaskComponent = EditTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtdGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFFM0YsMENBQXlDO0FBQ3pDLGlEQUFnRDtBQUNoRCx3REFBaUQ7QUFDakQsd0RBQWlEO0FBQ2pELHdFQUFxRTtBQUVyRSx1REFBMkQ7QUFDM0QsaUVBQTREO0FBQzVELG1FQUE2RTtBQUM3RSxnQ0FBZ0Y7QUFFaEYsMkNBQStGO0FBRS9GLG9DQUFzQztBQUN0QywwQ0FBeUM7QUFTekM7SUFTSSwyQkFBb0IsSUFBVSxFQUFVLFdBQThCLEVBQVUsS0FBeUIsRUFDakcsS0FBdUIsRUFBVSxNQUFjLEVBQVUsUUFBa0IsRUFDM0UsYUFBNEI7UUFGaEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ2pHLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDM0Usa0JBQWEsR0FBYixhQUFhLENBQWU7UUFQcEMsaUJBQVksR0FBRyxtQkFBWSxDQUFDLENBQUMsZ0RBQWdEO1FBUXpFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFNBQVMsR0FBUyxZQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLHNGQUFzRjtRQUN0Riw2REFBNkQ7UUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUks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LHNDQUFVLEdBQVYsVUFBVyxLQUFhO1FBQXhCLGlCQWFDO1FBWkcsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsWUFBWSxFQUFFLFFBQVE7WUFDdEIsZ0JBQWdCLEVBQUUsUUFBUTtTQUM3QixDQUFDO1FBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxhQUFzQjtZQUNqRCxvREFBb0Q7WUFDcEQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJKdUI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVksaUJBQVU7d0RBQUM7SUFDZjtRQUE5QixnQkFBUyxDQUFDLGtCQUFrQixDQUFDO2tDQUFtQixpQkFBVTsrREFBQztJQUNyQztRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTt1REFBQztJQVBuQyxpQkFBaUI7UUFMN0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7U0FDbkQsQ0FBQzt5Q0FVNEIsV0FBSSxFQUF1QixnQ0FBaUIsRUFBaUIsNEJBQWtCO1lBQzFGLHVCQUFnQixFQUFrQixlQUFNLEVBQW9CLGlCQUFRO1lBQzVELGlDQUFhO09BWDNCLGlCQUFpQixDQTRKN0I7SUFBRCx3QkFBQztDQUFBLEFBNUpELElBNEpDO0FBNUpZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL3NoYXJlZC90YXNrL3Rhc2subW9kZWxcIjtcclxuaW1wb3J0IHsgU3RlcCB9IGZyb20gXCIuLi9zaGFyZWQvc3RlcC9zdGVwLm1vZGVsXCI7XHJcbmltcG9ydCB7IEVkaXRTdGVwQ29tcG9uZW50IH0gZnJvbSBcIi4uL2VkaXRfc3RlcC9lZGl0LXN0ZXAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhLCBSYWRMaXN0VmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXdcIjtcclxuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIi4uL3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IGRlZXBFcXVhbHMsIGlzTm9ubmVnYXRpdmVJbnRlZ2VyLCBjbG9uZSwgcGFkVHdvRGlnaXRzIH0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhLCBhbmRyb2lkIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBUZXh0VmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtcy92YWx1ZS1hY2Nlc3NvcnNcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcInRtci1lZGl0LXRhc2tcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImVkaXRfdGFzay9lZGl0LXRhc2suY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiZWRpdF90YXNrL2VkaXQtdGFzay5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFZGl0VGFza0NvbXBvbmVudCB7XHJcblxyXG4gICAgdGFzazogVGFzaztcclxuICAgIHNhdmVkVGFzazogVGFzazsgLy9hbiB1bm1vZGlmaWVkIGNvcHkgb2YgdGhlIGxhc3Qgc2F2ZWQgdmVyc2lvbiBvZiB0aGlzLnRhc2tcclxuICAgIHBhZFR3b0RpZ2l0cyA9IHBhZFR3b0RpZ2l0czsgLy90byB1c2UgdGhpcyBmdW5jdGlvbiBmcm9tIHV0aWwgaW4gdGhlIHRlbXBsYXRlXHJcbiAgICBAVmlld0NoaWxkKCduYW1lRmllbGQnKSBuYW1lRmllbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdkZXNjcmlwdGlvbkZpZWxkJykgZGVzY3JpcHRpb25GaWVsZDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ3N0ZXBMaXN0Jykgc3RlcExpc3Q6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICBwcml2YXRlIGRhdGFSZXRyaWV2ZXI6IERhdGFSZXRyaWV2ZXIpIHtcclxuICAgICAgICBsZXQgdGFza0RhdGEgPSB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YTtcclxuICAgICAgICB0aGlzLnRhc2sgPSBuZXcgVGFzayh0YXNrRGF0YS5uYW1lLCB0YXNrRGF0YS5kZXNjcmlwdGlvbiwgdGFza0RhdGEuc3RlcHMpO1xyXG4gICAgICAgIHRoaXMuc2F2ZWRUYXNrID0gPFRhc2s+Y2xvbmUodGhpcy50YXNrKTtcclxuICAgICAgICAvL3N0b3JlIHRoZSBvcmlnaW5hbCBuYW1lIG9mIHRoZSB0YXNrIHNvIHdlIGNhbiByZXRyaWV2ZSBhbiB1bmFkdWx0ZXJhdGVkIGNvcHkgaW4gdGhlIFxyXG4gICAgICAgIC8vVGFza0NvbXBvbmVudCAocHJldmlvdXMgcGFnZSkgaWYgdGhlIHVzZXIgZG9lc24ndCBzYXZlIGhlcmVcclxuICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuaWRlbnRpZmllciA9IHRoaXMudGFzay5uYW1lLnRvU3RyaW5nKCk7IC8vdGhlIHJlZmVyZW5jZSB0byB0aGUgbmFtZSBpcyBkZXN0cm95ZWQgb24gYmFjayBwcmVzczsgY29weSBpdFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dGYWlsdXJlTXNnKG1zZykge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1NhdmUgZmFpbGVkJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogbXNnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9oYW5kbGUgYSBub24tbmF0aXZlIGJhY2sgYnV0dG9uIHByZXNzXHJcbiAgICBiYWNrUHJlc3MoKSB7XHJcbiAgICAgICAgLy9pZiB0aGUgdXNlciBoYXMgdW5zYXZlZCBjaGFuZ2VzXHJcbiAgICAgICAgaWYgKHRoaXMuY2hhbmdlc05vdFNhdmVkKCkpIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJVbnNhdmVkIGNoYW5nZXNcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91J3ZlIG1hZGUgdW5zYXZlZCBjaGFuZ2VzLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlNhdmUgY2hhbmdlc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJEaXNjYXJkIGNoYW5nZXNcIixcclxuICAgICAgICAgICAgICAgIG5ldXRyYWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKCh3YW50c1RvU2F2ZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBoaXRzIGRpc2NhcmQgY2hhbmdlcywgbGV0IHRoZW0gZ28gYmFja1xyXG4gICAgICAgICAgICAgICAgaWYgKHdhbnRzVG9TYXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmF2aWdhdGUgYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9pZiB0aGV5IHdhbnQgdG8gc2F2ZSBhbmQgc2F2ZSBpcyBzdWNjZXNzZnVsXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3YW50c1RvU2F2ZSAmJiB0aGlzLnNhdmVUYXNrKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL25hdmlnYXRlIGJhY2tcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vdGhlIGNhc2Ugd2hlcmUgdGhlIHVzZXIgaGl0cyBjYW5jZWwgKHdhbnRzVG9TYXZlIGlzIHVuZGVmaW5lZCkgbmVlZHNcclxuICAgICAgICAgICAgICAgIC8vbm8gYWN0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZXNOb3RTYXZlZCgpIHtcclxuICAgICAgICByZXR1cm4gKCFkZWVwRXF1YWxzKHRoaXMudGFzaywgdGhpcy5zYXZlZFRhc2spKTtcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZERhdGEoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2submFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsdXJlTXNnKFwiUGxlYXNlIGdpdmUgdGhpcyByb3V0aW5lIGEgbmFtZS5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGFzay5zdGVwcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBhZGQgYXQgbGVhc3Qgb25lIHN0ZXAuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YXNrLnN0ZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGVwID0gdGhpcy50YXNrLnN0ZXBzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBuYW1lIGV2ZXJ5IHN0ZXAgaW4gdGhlIHJvdXRpbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOb25uZWdhdGl2ZUludGVnZXIoc3RlcC5taW51dGVzKSB8fCAhaXNOb25uZWdhdGl2ZUludGVnZXIoc3RlcC5zZWNvbmRzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZygnVGhlIHN0ZXAgXCInK3N0ZXAubmFtZSsnXCIgaGFzIGFuIGludmFsaWQgdGltZS4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBTYXZlcyB0aGlzLnRhc2sgdG8gZGlzay4gUmV0dXJucyB0cnVlIGlmIGl0IHNhdmVzIGFuZCBmYWxzZSBpZiBpdCBkb2Vzbid0LiAqL1xyXG4gICAgc2F2ZVRhc2soKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkRGF0YSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hdHRlbXB0IHRvIHNhdmUuIE9uIHN1Y2Nlc3NmdWwgc2F2ZSwgcmVmcmVzaCB0aGUgc2F2ZWRUYXNrIG9iamVjdCB0byBiZSB0aGUgc2FtZSBhcyB0aGlzLnRhc2tcclxuICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyLnNhdmVOZXdUYXNrKHRoaXMudGFzaywgKHRoaXMuc2F2ZWRUYXNrLm5hbWUgIT0gdGhpcy50YXNrLm5hbWUpKVxyXG4gICAgICAgIC50aGVuKChzYXZlZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2F2ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWRUYXNrID0gPFRhc2s+Y2xvbmUodGhpcy50YXNrKTtcclxuICAgICAgICAgICAgICAgIC8vaW4gY2FzZSB0aGUgdXNlciBjaGFuZ2VkIHRoZSBuYW1lLCBrZWVwIHRyYWNrIG9mIHRoZSBuZXcgbmFtZSBzbyB0aGF0LCBpZiB0aGUgdXNlciBcclxuICAgICAgICAgICAgICAgIC8vbmF2aWdhdGVzIGJhY2sgdG8gdGhlIHZpZXcgdGhlIHRhc2ssIHRoZXkgc2VlIHRoZSB0YXNrIHRoZXkganVzdCBzYXZlZCBpbnN0ZWFkIG9mIHRoYXQgd2l0aFxyXG4gICAgICAgICAgICAgICAgLy90aGUgb2xkIG5hbWVcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVJldHJpZXZlci5pZGVudGlmaWVyID0gdGhpcy50YXNrLm5hbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3U3RlcChpbmRleCkge1xyXG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IHN0ZXBcclxuICAgICAgICBsZXQgbmV3U3RlcCA9IG5ldyBTdGVwKFwiXCIsIFwiXCIsIDAsIDAsIDEpO1xyXG4gICAgICAgIC8vYWRkIG5ld1N0ZXAgdG8gdGhlIGluZGV4dGggaW5kZXggb2YgdGhpcy50YXNrLnN0ZXBzXHJcbiAgICAgICAgdGhpcy50YXNrLnN0ZXBzLnNwbGljZShpbmRleCwgMCwgbmV3U3RlcCk7XHJcbiAgICAgICAgLy9zY3JvbGwgdGhlIExpc3RWaWV3IHRvIHRoZSBuZXcgc3RlcFxyXG4gICAgICAgIHRoaXMuc2Nyb2xsU3RlcExpc3RUb0luZGV4KGluZGV4KTtcclxuICAgICAgICAvL2xhdW5jaCBhbiBlZGl0aW5nIHdpbmRvdyBmb3IgdGhlIG5ldyBzdGVwXHJcbiAgICAgICAgdGhpcy5lZGl0U3RlcE1vZGFsKG5ld1N0ZXApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiBDYXVzZXMgdGhlIHN0ZXBzIGxpc3QgdmlldyB0byBzY3JvbGwgdG8gaXRzIGluZGV4dGggaXRlbS4gKi9cclxuICAgIHNjcm9sbFN0ZXBMaXN0VG9JbmRleChpbmRleCkge1xyXG4gICAgICAgIGxldCBsaXN0VmlldyA9IDxSYWRMaXN0Vmlldz50aGlzLnN0ZXBMaXN0Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgICAgbGlzdFZpZXcucmVmcmVzaCgpOyAvL2Vuc3VyZXMgYW4gaXRlbSBqdXN0IGFkZGVkIHRvIHRoZSBzdGVwcyBhcnJheSBpcyBsb2FkZWRcclxuICAgICAgICBsaXN0Vmlldy5zY3JvbGxUb0luZGV4KGluZGV4KTsgLy9kb24ndCBhbmltYXRlLS1hc3luYyBiZWhhdmlvciBjYXVzZXMgZ2xpdGNoZXMgaGVyZVxyXG4gICAgfVxyXG5cclxuICAgIGVkaXRTdGVwTW9kYWwoc3RlcDogU3RlcCkge1xyXG4gICAgICAgIC8vcHJldmVudCB0aGUgYW5ub3lpbmcgYmVoYXZpb3Igb2Ygc2Nyb2xsaW5nIHRvIHRoZSBwYWdlJ3NcclxuICAgICAgICAvL2xhc3QgZm9jdXNlZCB0ZXh0IHZpZXcgd2hlbiB0aGUga2V5Ym9hcmQgaXMgdXNlZCBpbiB0aGUgbW9kYWxcclxuICAgICAgICBpZiAoYW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uRmllbGQubmF0aXZlRWxlbWVudC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lRmllbGQubmF0aXZlRWxlbWVudC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmRhdGEgPSBzdGVwO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjb250ZXh0OiB7IHN0ZXA6IHN0ZXAgfSxcclxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChFZGl0U3RlcENvbXBvbmVudCwgb3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVTdGVwKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIHRoaXMgc3RlcD9cIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJcIixcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkRlbGV0ZVwiLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucykudGhlbigod2FudHNUb0RlbGV0ZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAvL2lmIHRoZSB1c2VyIGhpdHMgZGlzY2FyZCBjaGFuZ2VzLCBsZXQgdGhlbSBnbyBiYWNrXHJcbiAgICAgICAgICAgIGlmICh3YW50c1RvRGVsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2sucmVtb3ZlU3RlcChpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==