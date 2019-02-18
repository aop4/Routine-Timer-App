"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var application_1 = require("application");
var dialogs = require("ui/dialogs");
var common_1 = require("@angular/common");
var task_model_1 = require("../../shared/task/task.model");
var step_model_1 = require("../../shared/step/step.model");
var edit_step_component_1 = require("../edit_step/edit-step.component");
var data_service_1 = require("../../shared/data.service");
var pass_data_service_1 = require("../../shared/pass-data.service");
var util_1 = require("../../util");
var EditTaskComponent = /** @class */ (function () {
    function EditTaskComponent(dataManager, modal, vcRef, location, dataRetriever) {
        this.dataManager = dataManager;
        this.modal = modal;
        this.vcRef = vcRef;
        this.location = location;
        this.dataRetriever = dataRetriever;
        this.padTwoDigits = util_1.padTwoDigits; //to use this function from util in the template
        var taskData = this.dataRetriever.data;
        this.task = new task_model_1.Task(taskData.name, taskData.description, taskData.steps);
        //store the currently saved version of this.task to check for modifications
        this.savedTask = util_1.clone(this.task);
        //store the original name of the task so we can retrieve an unadulterated copy in the 
        //TaskComponent (previous page) if the user doesn't save here
        this.dataRetriever.identifier = this.task.name.toString(); //the reference to the name is destroyed on back press; copy it
    }
    /* Displays an alert for when saving fails */
    EditTaskComponent.prototype.showFailureMsg = function (msg) {
        var options = {
            title: 'Save failed',
            message: msg
        };
        dialogs.alert(options);
    };
    /* Handles a non-native back button press. The user is warned if they have
    made unsaved changes and prompted to save. */
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
    /* Check whether the original (or previous) saved version of this
    task matches the current version the user is making. If not,
    returns true (there are unsaved changes). */
    EditTaskComponent.prototype.changesNotSaved = function () {
        return (!util_1.deepEquals(this.task, this.savedTask));
    };
    /* Checks whether the data the user has entered so far represents
    a valid task. This is mostly here because a task that doesn't meet
    these criteria would be difficult for the user to identify/work with and
    pretty useless. Tasks must have a name to identify them, must have
    at least one step, the steps must have names, and the steps must have
    non-negative integer values as their times. */
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
    /* Saves this.task to disk. Returns true if it saves and false if it doesn't.
    On successful save, refreshes the savedTask object to be the same as this.task */
    EditTaskComponent.prototype.saveTask = function () {
        var _this = this;
        //if the task is invalid
        if (!this.validData()) {
            return false;
        }
        //attempt to save.
        this.dataManager.saveNewTask(this.task, (this.savedTask.name != this.task.name))
            .then(function (saved) {
            if (saved) {
                //refresh the savedTask object
                _this.updateSavedTask(util_1.clone(_this.task));
                //in case the user changed the name, keep track of the new name so that, if the user 
                //navigates back to the view the task, they see the task they just saved instead of that with
                //the old name
                _this.dataRetriever.identifier = _this.task.name;
                return true;
            }
            return false;
        });
    };
    EditTaskComponent.prototype.updateSavedTask = function (task) {
        this.savedTask = task;
    };
    /* Creates a generic step in the task and pops up an editing window
    to view it. */
    EditTaskComponent.prototype.newStep = function (index) {
        //create a new step (no title, no description, 0 minutes
        //and seconds, one rep)
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
    /* Pop up the edit step modal so the user can change the contents of step. */
    EditTaskComponent.prototype.editStepModal = function (step) {
        //prevent the annoying behavior of scrolling to the page's
        //last focused text view when the keyboard is used in the modal
        if (application_1.android) {
            this.descriptionField.nativeElement.android.clearFocus();
            this.nameField.nativeElement.android.clearFocus();
        }
        //launch the modal with step in its context
        var options = {
            context: { step: step },
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(edit_step_component_1.EditStepComponent, options);
    };
    /* Prompts the user to delete the task at this.task.steps[index], i.e., the
    indexth step of the task. Deletes the task if they confirm. */
    EditTaskComponent.prototype.deleteStep = function (index) {
        var _this = this;
        var options = {
            title: "Delete this exercise?",
            message: "",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        };
        dialogs.confirm(options).then(function (wantsToDelete) {
            //if the user congirms, delete the task
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
            templateUrl: "pages/edit_task/edit-task.component.html",
            styleUrls: ["pages/edit_task/edit-task.component.css"]
        })
        /* A page used to edit tasks by defining and re-arranging their steps */
        ,
        __metadata("design:paramtypes", [data_service_1.SystemDataService, dialogs_1.ModalDialogService,
            core_1.ViewContainerRef, common_1.Location,
            pass_data_service_1.DataRetriever])
    ], EditTaskComponent);
    return EditTaskComponent;
}());
exports.EditTaskComponent = EditTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtdGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFFM0YsbUVBQTZFO0FBQzdFLDJDQUFzQztBQUN0QyxvQ0FBc0M7QUFDdEMsMENBQXlDO0FBRXpDLDJEQUFvRDtBQUNwRCwyREFBb0Q7QUFDcEQsd0VBQXFFO0FBQ3JFLDBEQUE4RDtBQUM5RCxvRUFBK0Q7QUFDL0QsbUNBQW1GO0FBU25GO0lBU0ksMkJBQW9CLFdBQThCLEVBQVUsS0FBeUIsRUFDN0UsS0FBdUIsRUFBVSxRQUFrQixFQUNuRCxhQUE0QjtRQUZoQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUM3RSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbkQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFQcEMsaUJBQVksR0FBRyxtQkFBWSxDQUFDLENBQUMsZ0RBQWdEO1FBUXpFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUUsMkVBQTJFO1FBQzNFLElBQUksQ0FBQyxTQUFTLEdBQVMsWUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxzRkFBc0Y7UUFDdEYsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsK0RBQStEO0lBQzlILENBQUM7SUFFRCw2Q0FBNkM7SUFDN0MsMENBQWMsR0FBZCxV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LE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDtrRUFDOEQ7SUFDOUQsc0NBQVUsR0FBVixVQUFXLEtBQWE7UUFBeEIsaUJBYUM7UUFaRyxJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsT0FBTyxFQUFFLEVBQUU7WUFDWCxZQUFZLEVBQUUsUUFBUTtZQUN0QixnQkFBZ0IsRUFBRSxRQUFRO1NBQzdCLENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLGFBQXNCO1lBQ2pELHVDQUF1QztZQUN2QyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNUt1QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBWSxpQkFBVTt3REFBQztJQUNmO1FBQTlCLGdCQUFTLENBQUMsa0JBQWtCLENBQUM7a0NBQW1CLGlCQUFVOytEQUFDO0lBQ3JDO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFXLGlCQUFVO3VEQUFDO0lBUG5DLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztTQUN6RCxDQUFDO1FBQ0Ysd0VBQXdFOzt5Q0FVbkMsZ0NBQWlCLEVBQWlCLDRCQUFrQjtZQUN0RSx1QkFBZ0IsRUFBb0IsaUJBQVE7WUFDcEMsaUNBQWE7T0FYM0IsaUJBQWlCLENBbUw3QjtJQUFELHdCQUFDO0NBQUEsQUFuTEQsSUFtTEM7QUFuTFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IGFuZHJvaWQgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBFZGl0U3RlcENvbXBvbmVudCB9IGZyb20gXCIuLi9lZGl0X3N0ZXAvZWRpdC1zdGVwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGRlZXBFcXVhbHMsIGlzTm9ubmVnYXRpdmVJbnRlZ2VyLCBjbG9uZSwgcGFkVHdvRGlnaXRzIH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcInRtci1lZGl0LXRhc2tcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2VkaXRfdGFzay9lZGl0LXRhc2suY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvZWRpdF90YXNrL2VkaXQtdGFzay5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbi8qIEEgcGFnZSB1c2VkIHRvIGVkaXQgdGFza3MgYnkgZGVmaW5pbmcgYW5kIHJlLWFycmFuZ2luZyB0aGVpciBzdGVwcyAqL1xyXG5leHBvcnQgY2xhc3MgRWRpdFRhc2tDb21wb25lbnQge1xyXG5cclxuICAgIHRhc2s6IFRhc2s7XHJcbiAgICBzYXZlZFRhc2s6IFRhc2s7IC8vYW4gdW5tb2RpZmllZCBjb3B5IG9mIHRoZSBsYXN0IHNhdmVkIHZlcnNpb24gb2YgdGhpcy50YXNrXHJcbiAgICBwYWRUd29EaWdpdHMgPSBwYWRUd29EaWdpdHM7IC8vdG8gdXNlIHRoaXMgZnVuY3Rpb24gZnJvbSB1dGlsIGluIHRoZSB0ZW1wbGF0ZVxyXG4gICAgQFZpZXdDaGlsZCgnbmFtZUZpZWxkJykgbmFtZUZpZWxkOiBFbGVtZW50UmVmOyAvL3RoZSB0ZXh0IGZpZWxkIGZvciB0aGUgdGFzaydzIG5hbWVcclxuICAgIEBWaWV3Q2hpbGQoJ2Rlc2NyaXB0aW9uRmllbGQnKSBkZXNjcmlwdGlvbkZpZWxkOiBFbGVtZW50UmVmOyAvL3RleHQgZmllbGQgZm9yIHRhc2sgZGVzY3JpcHRpb25cclxuICAgIEBWaWV3Q2hpbGQoJ3N0ZXBMaXN0Jykgc3RlcExpc3Q6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgcHJpdmF0ZSBkYXRhUmV0cmlldmVyOiBEYXRhUmV0cmlldmVyKSB7XHJcbiAgICAgICAgbGV0IHRhc2tEYXRhID0gdGhpcy5kYXRhUmV0cmlldmVyLmRhdGE7XHJcbiAgICAgICAgdGhpcy50YXNrID0gbmV3IFRhc2sodGFza0RhdGEubmFtZSwgdGFza0RhdGEuZGVzY3JpcHRpb24sIHRhc2tEYXRhLnN0ZXBzKTtcclxuICAgICAgICAvL3N0b3JlIHRoZSBjdXJyZW50bHkgc2F2ZWQgdmVyc2lvbiBvZiB0aGlzLnRhc2sgdG8gY2hlY2sgZm9yIG1vZGlmaWNhdGlvbnNcclxuICAgICAgICB0aGlzLnNhdmVkVGFzayA9IDxUYXNrPmNsb25lKHRoaXMudGFzayk7XHJcbiAgICAgICAgLy9zdG9yZSB0aGUgb3JpZ2luYWwgbmFtZSBvZiB0aGUgdGFzayBzbyB3ZSBjYW4gcmV0cmlldmUgYW4gdW5hZHVsdGVyYXRlZCBjb3B5IGluIHRoZSBcclxuICAgICAgICAvL1Rhc2tDb21wb25lbnQgKHByZXZpb3VzIHBhZ2UpIGlmIHRoZSB1c2VyIGRvZXNuJ3Qgc2F2ZSBoZXJlXHJcbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmlkZW50aWZpZXIgPSB0aGlzLnRhc2submFtZS50b1N0cmluZygpOyAvL3RoZSByZWZlcmVuY2UgdG8gdGhlIG5hbWUgaXMgZGVzdHJveWVkIG9uIGJhY2sgcHJlc3M7IGNvcHkgaXRcclxuICAgIH1cclxuXHJcbiAgICAvKiBEaXNwbGF5cyBhbiBhbGVydCBmb3Igd2hlbiBzYXZpbmcgZmFpbHMgKi9cclxuICAgIHNob3dGYWlsdXJlTXNnKG1zZykge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1NhdmUgZmFpbGVkJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogbXNnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogSGFuZGxlcyBhIG5vbi1uYXRpdmUgYmFjayBidXR0b24gcHJlc3MuIFRoZSB1c2VyIGlzIHdhcm5lZCBpZiB0aGV5IGhhdmVcclxuICAgIG1hZGUgdW5zYXZlZCBjaGFuZ2VzIGFuZCBwcm9tcHRlZCB0byBzYXZlLiAqL1xyXG4gICAgYmFja1ByZXNzKCkge1xyXG4gICAgICAgIC8vaWYgdGhlIHVzZXIgaGFzIHVuc2F2ZWQgY2hhbmdlc1xyXG4gICAgICAgIGlmICh0aGlzLmNoYW5nZXNOb3RTYXZlZCgpKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiVW5zYXZlZCBjaGFuZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIllvdSd2ZSBtYWRlIHVuc2F2ZWQgY2hhbmdlcy5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJTYXZlIGNoYW5nZXNcIixcclxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiRGlzY2FyZCBjaGFuZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICBuZXV0cmFsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucykudGhlbigod2FudHNUb1NhdmU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgaGl0cyBkaXNjYXJkIGNoYW5nZXMsIGxldCB0aGVtIGdvIGJhY2tcclxuICAgICAgICAgICAgICAgIGlmICh3YW50c1RvU2F2ZSA9PT0gZmFsc2UpIHsgLy9sb29rcyBkdW1iLiBpcyBuZWNlc3NhcnkuIGNhbiBiZSB1bmRlZmluZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYXZpZ2F0ZSBiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoZXkgd2FudCB0byBzYXZlIGFuZCBzYXZlIGlzIHN1Y2Nlc3NmdWxcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdhbnRzVG9TYXZlICYmIHRoaXMuc2F2ZVRhc2soKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmF2aWdhdGUgYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy90aGUgY2FzZSB3aGVyZSB0aGUgdXNlciBoaXRzIGNhbmNlbCAod2FudHNUb1NhdmUgaXMgdW5kZWZpbmVkKSBuZWVkc1xyXG4gICAgICAgICAgICAgICAgLy9ubyBhY3Rpb25cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogQ2hlY2sgd2hldGhlciB0aGUgb3JpZ2luYWwgKG9yIHByZXZpb3VzKSBzYXZlZCB2ZXJzaW9uIG9mIHRoaXNcclxuICAgIHRhc2sgbWF0Y2hlcyB0aGUgY3VycmVudCB2ZXJzaW9uIHRoZSB1c2VyIGlzIG1ha2luZy4gSWYgbm90LFxyXG4gICAgcmV0dXJucyB0cnVlICh0aGVyZSBhcmUgdW5zYXZlZCBjaGFuZ2VzKS4gKi9cclxuICAgIGNoYW5nZXNOb3RTYXZlZCgpIHtcclxuICAgICAgICByZXR1cm4gKCFkZWVwRXF1YWxzKHRoaXMudGFzaywgdGhpcy5zYXZlZFRhc2spKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBDaGVja3Mgd2hldGhlciB0aGUgZGF0YSB0aGUgdXNlciBoYXMgZW50ZXJlZCBzbyBmYXIgcmVwcmVzZW50c1xyXG4gICAgYSB2YWxpZCB0YXNrLiBUaGlzIGlzIG1vc3RseSBoZXJlIGJlY2F1c2UgYSB0YXNrIHRoYXQgZG9lc24ndCBtZWV0XHJcbiAgICB0aGVzZSBjcml0ZXJpYSB3b3VsZCBiZSBkaWZmaWN1bHQgZm9yIHRoZSB1c2VyIHRvIGlkZW50aWZ5L3dvcmsgd2l0aCBhbmRcclxuICAgIHByZXR0eSB1c2VsZXNzLiBUYXNrcyBtdXN0IGhhdmUgYSBuYW1lIHRvIGlkZW50aWZ5IHRoZW0sIG11c3QgaGF2ZVxyXG4gICAgYXQgbGVhc3Qgb25lIHN0ZXAsIHRoZSBzdGVwcyBtdXN0IGhhdmUgbmFtZXMsIGFuZCB0aGUgc3RlcHMgbXVzdCBoYXZlXHJcbiAgICBub24tbmVnYXRpdmUgaW50ZWdlciB2YWx1ZXMgYXMgdGhlaXIgdGltZXMuICovXHJcbiAgICB2YWxpZERhdGEoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2submFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsdXJlTXNnKFwiUGxlYXNlIGdpdmUgdGhpcyByb3V0aW5lIGEgbmFtZS5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGFzay5zdGVwcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBhZGQgYXQgbGVhc3Qgb25lIHN0ZXAuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YXNrLnN0ZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGVwID0gdGhpcy50YXNrLnN0ZXBzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBuYW1lIGV2ZXJ5IHN0ZXAgaW4gdGhlIHJvdXRpbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOb25uZWdhdGl2ZUludGVnZXIoc3RlcC5taW51dGVzKSB8fCAhaXNOb25uZWdhdGl2ZUludGVnZXIoc3RlcC5zZWNvbmRzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZygnVGhlIHN0ZXAgXCInK3N0ZXAubmFtZSsnXCIgaGFzIGFuIGludmFsaWQgdGltZS4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBTYXZlcyB0aGlzLnRhc2sgdG8gZGlzay4gUmV0dXJucyB0cnVlIGlmIGl0IHNhdmVzIGFuZCBmYWxzZSBpZiBpdCBkb2Vzbid0LlxyXG4gICAgT24gc3VjY2Vzc2Z1bCBzYXZlLCByZWZyZXNoZXMgdGhlIHNhdmVkVGFzayBvYmplY3QgdG8gYmUgdGhlIHNhbWUgYXMgdGhpcy50YXNrICovXHJcbiAgICBzYXZlVGFzaygpOiBib29sZWFuIHtcclxuICAgICAgICAvL2lmIHRoZSB0YXNrIGlzIGludmFsaWRcclxuICAgICAgICBpZiAoIXRoaXMudmFsaWREYXRhKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2F0dGVtcHQgdG8gc2F2ZS5cclxuICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyLnNhdmVOZXdUYXNrKHRoaXMudGFzaywgKHRoaXMuc2F2ZWRUYXNrLm5hbWUgIT0gdGhpcy50YXNrLm5hbWUpKVxyXG4gICAgICAgIC50aGVuKChzYXZlZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2F2ZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vcmVmcmVzaCB0aGUgc2F2ZWRUYXNrIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTYXZlZFRhc2soPFRhc2s+Y2xvbmUodGhpcy50YXNrKSk7XHJcbiAgICAgICAgICAgICAgICAvL2luIGNhc2UgdGhlIHVzZXIgY2hhbmdlZCB0aGUgbmFtZSwga2VlcCB0cmFjayBvZiB0aGUgbmV3IG5hbWUgc28gdGhhdCwgaWYgdGhlIHVzZXIgXHJcbiAgICAgICAgICAgICAgICAvL25hdmlnYXRlcyBiYWNrIHRvIHRoZSB2aWV3IHRoZSB0YXNrLCB0aGV5IHNlZSB0aGUgdGFzayB0aGV5IGp1c3Qgc2F2ZWQgaW5zdGVhZCBvZiB0aGF0IHdpdGhcclxuICAgICAgICAgICAgICAgIC8vdGhlIG9sZCBuYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuaWRlbnRpZmllciA9IHRoaXMudGFzay5uYW1lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNhdmVkVGFzayh0YXNrKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlZFRhc2sgPSB0YXNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIENyZWF0ZXMgYSBnZW5lcmljIHN0ZXAgaW4gdGhlIHRhc2sgYW5kIHBvcHMgdXAgYW4gZWRpdGluZyB3aW5kb3dcclxuICAgIHRvIHZpZXcgaXQuICovXHJcbiAgICBuZXdTdGVwKGluZGV4KSB7XHJcbiAgICAgICAgLy9jcmVhdGUgYSBuZXcgc3RlcCAobm8gdGl0bGUsIG5vIGRlc2NyaXB0aW9uLCAwIG1pbnV0ZXNcclxuICAgICAgICAvL2FuZCBzZWNvbmRzLCBvbmUgcmVwKVxyXG4gICAgICAgIGxldCBuZXdTdGVwID0gbmV3IFN0ZXAoXCJcIiwgXCJcIiwgMCwgMCwgMSk7XHJcbiAgICAgICAgLy9hZGQgbmV3U3RlcCB0byB0aGUgaW5kZXh0aCBpbmRleCBvZiB0aGlzLnRhc2suc3RlcHNcclxuICAgICAgICB0aGlzLnRhc2suc3RlcHMuc3BsaWNlKGluZGV4LCAwLCBuZXdTdGVwKTtcclxuICAgICAgICAvL3Njcm9sbCB0aGUgTGlzdFZpZXcgdG8gdGhlIG5ldyBzdGVwXHJcbiAgICAgICAgdGhpcy5zY3JvbGxTdGVwTGlzdFRvSW5kZXgoaW5kZXgpO1xyXG4gICAgICAgIC8vbGF1bmNoIGFuIGVkaXRpbmcgd2luZG93IGZvciB0aGUgbmV3IHN0ZXBcclxuICAgICAgICB0aGlzLmVkaXRTdGVwTW9kYWwobmV3U3RlcCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qIENhdXNlcyB0aGUgc3RlcHMgbGlzdCB2aWV3IHRvIHNjcm9sbCB0byBpdHMgaW5kZXh0aCBpdGVtLiAqL1xyXG4gICAgc2Nyb2xsU3RlcExpc3RUb0luZGV4KGluZGV4KSB7XHJcbiAgICAgICAgbGV0IGxpc3RWaWV3ID0gPFJhZExpc3RWaWV3PnRoaXMuc3RlcExpc3QubmF0aXZlRWxlbWVudDtcclxuICAgICAgICBsaXN0Vmlldy5yZWZyZXNoKCk7IC8vZW5zdXJlcyBhbiBpdGVtIGp1c3QgYWRkZWQgdG8gdGhlIHN0ZXBzIGFycmF5IGlzIGxvYWRlZFxyXG4gICAgICAgIGxpc3RWaWV3LnNjcm9sbFRvSW5kZXgoaW5kZXgpOyAvL2Rvbid0IGFuaW1hdGUtLWFzeW5jIGJlaGF2aW9yIGNhdXNlcyBnbGl0Y2hlcyBoZXJlXHJcbiAgICB9XHJcblxyXG4gICAgLyogUG9wIHVwIHRoZSBlZGl0IHN0ZXAgbW9kYWwgc28gdGhlIHVzZXIgY2FuIGNoYW5nZSB0aGUgY29udGVudHMgb2Ygc3RlcC4gKi9cclxuICAgIGVkaXRTdGVwTW9kYWwoc3RlcDogU3RlcCkge1xyXG4gICAgICAgIC8vcHJldmVudCB0aGUgYW5ub3lpbmcgYmVoYXZpb3Igb2Ygc2Nyb2xsaW5nIHRvIHRoZSBwYWdlJ3NcclxuICAgICAgICAvL2xhc3QgZm9jdXNlZCB0ZXh0IHZpZXcgd2hlbiB0aGUga2V5Ym9hcmQgaXMgdXNlZCBpbiB0aGUgbW9kYWxcclxuICAgICAgICBpZiAoYW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uRmllbGQubmF0aXZlRWxlbWVudC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5uYW1lRmllbGQubmF0aXZlRWxlbWVudC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9sYXVuY2ggdGhlIG1vZGFsIHdpdGggc3RlcCBpbiBpdHMgY29udGV4dFxyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjb250ZXh0OiB7IHN0ZXA6IHN0ZXAgfSxcclxuICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChFZGl0U3RlcENvbXBvbmVudCwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogUHJvbXB0cyB0aGUgdXNlciB0byBkZWxldGUgdGhlIHRhc2sgYXQgdGhpcy50YXNrLnN0ZXBzW2luZGV4XSwgaS5lLiwgdGhlXHJcbiAgICBpbmRleHRoIHN0ZXAgb2YgdGhlIHRhc2suIERlbGV0ZXMgdGhlIHRhc2sgaWYgdGhleSBjb25maXJtLiAqL1xyXG4gICAgZGVsZXRlU3RlcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSB0aGlzIGV4ZXJjaXNlP1wiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRGVsZXRlXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKCh3YW50c1RvRGVsZXRlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgY29uZ2lybXMsIGRlbGV0ZSB0aGUgdGFza1xyXG4gICAgICAgICAgICBpZiAod2FudHNUb0RlbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrLnJlbW92ZVN0ZXAoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=