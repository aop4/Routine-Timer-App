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
    function EditTaskComponent(page, dataManager, modal, vcRef, router, location) {
        this.page = page;
        this.dataManager = dataManager;
        this.modal = modal;
        this.vcRef = vcRef;
        this.router = router;
        this.location = location;
        this.padTwoDigits = util_1.padTwoDigits; //to use this function from util in the template
        var taskData = pass_data_service_1.DataRetriever.data;
        this.task = new task_model_1.Task(taskData.name, taskData.description, taskData.steps);
        this.savedTask = util_1.clone(this.task);
        //store the original name of the task so we can retrieve an unadulterated copy in the 
        //TaskComponent (previous page) if the user doesn't save here
        pass_data_service_1.DataRetriever.identifier = this.task.name.toString(); //the reference to the name is destroyed on back press; copy it
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
                pass_data_service_1.DataRetriever.identifier = _this.task.name;
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
        //launch an editing window for the new step
        this.editStepModal(newStep);
    };
    EditTaskComponent.prototype.editStepModal = function (step) {
        //prevent the annoying behavior of scrolling to the page's
        //last focused text view when the keyboard is used in the modal
        if (application_1.android) {
            this.descriptionField.nativeElement.android.clearFocus();
            this.nameField.nativeElement.android.clearFocus();
        }
        pass_data_service_1.DataRetriever.data = step;
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
    EditTaskComponent = __decorate([
        core_1.Component({
            selector: "tmr-edit-task",
            templateUrl: "edit_task/edit-task.component.html",
            styleUrls: ["edit_task/edit-task.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, data_service_1.SystemDataService, dialogs_1.ModalDialogService,
            core_1.ViewContainerRef, router_1.Router, common_1.Location])
    ], EditTaskComponent);
    return EditTaskComponent;
}());
exports.EditTaskComponent = EditTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtdGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFFM0YsMENBQXlDO0FBQ3pDLGlEQUFnRDtBQUNoRCx3REFBaUQ7QUFDakQsd0RBQWlEO0FBQ2pELHdFQUFxRTtBQUVyRSx1REFBMkQ7QUFDM0QsaUVBQTREO0FBQzVELG1FQUE2RTtBQUM3RSxnQ0FBZ0Y7QUFFaEYsMkNBQStGO0FBRS9GLG9DQUFzQztBQUN0QywwQ0FBeUM7QUFTekM7SUErQ0ksMkJBQW9CLElBQVUsRUFBVSxXQUE4QixFQUFVLEtBQXlCLEVBQzdGLEtBQXVCLEVBQVUsTUFBYyxFQUFVLFFBQWtCO1FBRG5FLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUM3RixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBNUN2RixpQkFBWSxHQUFHLG1CQUFZLENBQUMsQ0FBQyxnREFBZ0Q7UUE2Q3pFLElBQUksUUFBUSxHQUFHLGlDQUFhLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFNBQVMsR0FBUyxZQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLHNGQUFzRjtRQUN0Riw2REFBNkQ7UUFDN0QsaUNBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQywrREFBK0Q7SUFDekgsQ0FBQztJQS9DRCwwQ0FBYyxHQUFkLFVBQWUsR0FBRztRQUNkLElBQUksT0FBTyxHQUFHO1lBQ1YsS0FBSyxFQUFFLGFBQWE7WUFDcEIsT0FBTyxFQUFFLEdBQUc7U0FDZixDQUFBO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsdUNBQXVDO0lBQ3ZDLHFDQUFTLEdBQVQ7UUFBQSxpQkE0QkM7UUEzQkcsaUNBQWlDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekIsSUFBSSxPQUFPLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsT0FBTyxFQUFFLDhCQUE4QjtnQkFDdkMsWUFBWSxFQUFFLGNBQWM7Z0JBQzVCLGdCQUFnQixFQUFFLGlCQUFpQjtnQkFDbkMsaUJBQWlCLEVBQUUsUUFBUTthQUM5QixDQUFDO1lBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxXQUFvQjtnQkFDL0Msb0RBQW9EO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsZUFBZTtvQkFDZixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUVELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEMsZUFBZTtvQkFDZixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUNELHNFQUFzRTtnQkFDdEUsV0FBVztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztJQVlELDJDQUFlLEdBQWY7UUFDSSxNQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM5QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsd0NBQXdDLENBQUMsQ0FBQztnQkFDOUQsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQywyQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQ3JFLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxnRkFBZ0Y7SUFDaEYsb0NBQVEsR0FBUjtRQUFBLGlCQWNDO1FBYkcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELCtGQUErRjtRQUMvRixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvRSxJQUFJLENBQUMsVUFBQyxLQUFLO1lBQ1IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixLQUFJLENBQUMsU0FBUyxHQUFTLFlBQUssQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLGlDQUFhLENBQUMsVUFBVSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUM7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFPLEdBQVAsVUFBUSxLQUFLO1FBQ1QsbUJBQW1CO1FBQ25CLElBQUksT0FBTyxHQUFHLElBQUksaUJBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEMscURBQXFEO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsSUFBVTtRQUNwQiwwREFBMEQ7UUFDMUQsK0RBQStEO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLHFCQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RELENBQUM7UUFDRCxpQ0FBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxPQUFPLEdBQUc7WUFDVixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQ3ZCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxLQUFLO1NBQy9CLENBQUE7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyx1Q0FBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO1FBRXpELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxLQUFhO1FBQXhCLGlCQWFDO1FBWkcsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsWUFBWSxFQUFFLFFBQVE7WUFDdEIsZ0JBQWdCLEVBQUUsUUFBUTtTQUM3QixDQUFDO1FBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxhQUFzQjtZQUNqRCxvREFBb0Q7WUFDcEQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXZJdUI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVksaUJBQVU7d0RBQUM7SUFDZjtRQUE5QixnQkFBUyxDQUFDLGtCQUFrQixDQUFDO2tDQUFtQixpQkFBVTsrREFBQztJQU5uRCxpQkFBaUI7UUFMN0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7U0FDbkQsQ0FBQzt5Q0FnRDRCLFdBQUksRUFBdUIsZ0NBQWlCLEVBQWlCLDRCQUFrQjtZQUN0Rix1QkFBZ0IsRUFBa0IsZUFBTSxFQUFvQixpQkFBUTtPQWhEOUUsaUJBQWlCLENBOEk3QjtJQUFELHdCQUFDO0NBQUEsQUE5SUQsSUE4SUM7QUE5SVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcclxuaW1wb3J0IHsgRWRpdFN0ZXBDb21wb25lbnQgfSBmcm9tIFwiLi4vZWRpdF9zdGVwL2VkaXQtc3RlcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xyXG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgZGVlcEVxdWFscywgaXNOb25uZWdhdGl2ZUludGVnZXIsIGNsb25lLCBwYWRUd29EaWdpdHMgfSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEsIGFuZHJvaWQgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFRleHRWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zL3ZhbHVlLWFjY2Vzc29yc1wiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwidG1yLWVkaXQtdGFza1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiZWRpdF90YXNrL2VkaXQtdGFzay5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJlZGl0X3Rhc2svZWRpdC10YXNrLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVkaXRUYXNrQ29tcG9uZW50IHtcclxuXHJcbiAgICB0YXNrOiBUYXNrO1xyXG4gICAgc2F2ZWRUYXNrOiBUYXNrOyAvL2FuIHVubW9kaWZpZWQgY29weSBvZiB0aGUgbGFzdCBzYXZlZCB2ZXJzaW9uIG9mIHRoaXMudGFza1xyXG4gICAgcGFkVHdvRGlnaXRzID0gcGFkVHdvRGlnaXRzOyAvL3RvIHVzZSB0aGlzIGZ1bmN0aW9uIGZyb20gdXRpbCBpbiB0aGUgdGVtcGxhdGVcclxuICAgIEBWaWV3Q2hpbGQoJ25hbWVGaWVsZCcpIG5hbWVGaWVsZDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ2Rlc2NyaXB0aW9uRmllbGQnKSBkZXNjcmlwdGlvbkZpZWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIHNob3dGYWlsdXJlTXNnKG1zZykge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1NhdmUgZmFpbGVkJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogbXNnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9oYW5kbGUgYSBub24tbmF0aXZlIGJhY2sgYnV0dG9uIHByZXNzXHJcbiAgICBiYWNrUHJlc3MoKSB7XHJcbiAgICAgICAgLy9pZiB0aGUgdXNlciBoYXMgdW5zYXZlZCBjaGFuZ2VzXHJcbiAgICAgICAgaWYgKHRoaXMuY2hhbmdlc05vdFNhdmVkKCkpIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJVbnNhdmVkIGNoYW5nZXNcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91J3ZlIG1hZGUgdW5zYXZlZCBjaGFuZ2VzLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlNhdmUgY2hhbmdlc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJEaXNjYXJkIGNoYW5nZXNcIixcclxuICAgICAgICAgICAgICAgIG5ldXRyYWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKCh3YW50c1RvU2F2ZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBoaXRzIGRpc2NhcmQgY2hhbmdlcywgbGV0IHRoZW0gZ28gYmFja1xyXG4gICAgICAgICAgICAgICAgaWYgKHdhbnRzVG9TYXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmF2aWdhdGUgYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9pZiB0aGV5IHdhbnQgdG8gc2F2ZSBhbmQgc2F2ZSBpcyBzdWNjZXNzZnVsXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3YW50c1RvU2F2ZSAmJiB0aGlzLnNhdmVUYXNrKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL25hdmlnYXRlIGJhY2tcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vdGhlIGNhc2Ugd2hlcmUgdGhlIHVzZXIgaGl0cyBjYW5jZWwgKHdhbnRzVG9TYXZlIGlzIHVuZGVmaW5lZCkgbmVlZHNcclxuICAgICAgICAgICAgICAgIC8vbm8gYWN0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge1xyXG4gICAgICAgIGxldCB0YXNrRGF0YSA9IERhdGFSZXRyaWV2ZXIuZGF0YTtcclxuICAgICAgICB0aGlzLnRhc2sgPSBuZXcgVGFzayh0YXNrRGF0YS5uYW1lLCB0YXNrRGF0YS5kZXNjcmlwdGlvbiwgdGFza0RhdGEuc3RlcHMpO1xyXG4gICAgICAgIHRoaXMuc2F2ZWRUYXNrID0gPFRhc2s+Y2xvbmUodGhpcy50YXNrKTtcclxuICAgICAgICAvL3N0b3JlIHRoZSBvcmlnaW5hbCBuYW1lIG9mIHRoZSB0YXNrIHNvIHdlIGNhbiByZXRyaWV2ZSBhbiB1bmFkdWx0ZXJhdGVkIGNvcHkgaW4gdGhlIFxyXG4gICAgICAgIC8vVGFza0NvbXBvbmVudCAocHJldmlvdXMgcGFnZSkgaWYgdGhlIHVzZXIgZG9lc24ndCBzYXZlIGhlcmVcclxuICAgICAgICBEYXRhUmV0cmlldmVyLmlkZW50aWZpZXIgPSB0aGlzLnRhc2submFtZS50b1N0cmluZygpOyAvL3RoZSByZWZlcmVuY2UgdG8gdGhlIG5hbWUgaXMgZGVzdHJveWVkIG9uIGJhY2sgcHJlc3M7IGNvcHkgaXRcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VzTm90U2F2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICghZGVlcEVxdWFscyh0aGlzLnRhc2ssIHRoaXMuc2F2ZWRUYXNrKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWREYXRhKCkge1xyXG4gICAgICAgIGlmICghdGhpcy50YXNrLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBnaXZlIHRoaXMgcm91dGluZSBhIG5hbWUuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRhc2suc3RlcHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coXCJQbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSBzdGVwLlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFzay5zdGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RlcCA9IHRoaXMudGFzay5zdGVwc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coXCJQbGVhc2UgbmFtZSBldmVyeSBzdGVwIGluIHRoZSByb3V0aW5lLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTm9ubmVnYXRpdmVJbnRlZ2VyKHN0ZXAubWludXRlcykgfHwgIWlzTm9ubmVnYXRpdmVJbnRlZ2VyKHN0ZXAuc2Vjb25kcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coJ1RoZSBzdGVwIFwiJytzdGVwLm5hbWUrJ1wiIGhhcyBhbiBpbnZhbGlkIHRpbWUuJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2F2ZXMgdGhpcy50YXNrIHRvIGRpc2suIFJldHVybnMgdHJ1ZSBpZiBpdCBzYXZlcyBhbmQgZmFsc2UgaWYgaXQgZG9lc24ndC4gKi9cclxuICAgIHNhdmVUYXNrKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZERhdGEoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYXR0ZW1wdCB0byBzYXZlLiBPbiBzdWNjZXNzZnVsIHNhdmUsIHJlZnJlc2ggdGhlIHNhdmVkVGFzayBvYmplY3QgdG8gYmUgdGhlIHNhbWUgYXMgdGhpcy50YXNrXHJcbiAgICAgICAgdGhpcy5kYXRhTWFuYWdlci5zYXZlTmV3VGFzayh0aGlzLnRhc2ssICh0aGlzLnNhdmVkVGFzay5uYW1lICE9IHRoaXMudGFzay5uYW1lKSlcclxuICAgICAgICAudGhlbigoc2F2ZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNhdmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVkVGFzayA9IDxUYXNrPmNsb25lKHRoaXMudGFzayk7XHJcbiAgICAgICAgICAgICAgICBEYXRhUmV0cmlldmVyLmlkZW50aWZpZXIgPSB0aGlzLnRhc2submFtZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdTdGVwKGluZGV4KSB7XHJcbiAgICAgICAgLy9jcmVhdGUgYSBuZXcgc3RlcFxyXG4gICAgICAgIGxldCBuZXdTdGVwID0gbmV3IFN0ZXAoXCJcIiwgXCJcIiwgMCwgMCwgMSk7XHJcbiAgICAgICAgLy9hZGQgbmV3U3RlcCB0byB0aGUgaW5kZXh0aCBpbmRleCBvZiB0aGlzLnRhc2suc3RlcHNcclxuICAgICAgICB0aGlzLnRhc2suc3RlcHMuc3BsaWNlKGluZGV4LCAwLCBuZXdTdGVwKTtcclxuICAgICAgICAvL2xhdW5jaCBhbiBlZGl0aW5nIHdpbmRvdyBmb3IgdGhlIG5ldyBzdGVwXHJcbiAgICAgICAgdGhpcy5lZGl0U3RlcE1vZGFsKG5ld1N0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRTdGVwTW9kYWwoc3RlcDogU3RlcCkge1xyXG4gICAgICAgIC8vcHJldmVudCB0aGUgYW5ub3lpbmcgYmVoYXZpb3Igb2Ygc2Nyb2xsaW5nIHRvIHRoZSBwYWdlJ3NcclxuICAgICAgICAvL2xhc3QgZm9jdXNlZCB0ZXh0IHZpZXcgd2hlbiB0aGUga2V5Ym9hcmQgaXMgdXNlZCBpbiB0aGUgbW9kYWxcclxuICAgICAgICBpZiAoYW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uRmllbGQubmF0aXZlRWxlbWVudC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lRmllbGQubmF0aXZlRWxlbWVudC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRGF0YVJldHJpZXZlci5kYXRhID0gc3RlcDtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY29udGV4dDogeyBzdGVwOiBzdGVwIH0sXHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoRWRpdFN0ZXBDb21wb25lbnQsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlU3RlcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSB0aGlzIHN0ZXA/XCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJEZWxldGVcIixcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9EZWxldGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBoaXRzIGRpc2NhcmQgY2hhbmdlcywgbGV0IHRoZW0gZ28gYmFja1xyXG4gICAgICAgICAgICBpZiAod2FudHNUb0RlbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrLnJlbW92ZVN0ZXAoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=