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
            templateUrl: "pages/edit_task/edit-task.component.html",
            styleUrls: ["pages/edit_task/edit-task.component.css"]
        }),
        __metadata("design:paramtypes", [data_service_1.SystemDataService, dialogs_1.ModalDialogService,
            core_1.ViewContainerRef, common_1.Location,
            pass_data_service_1.DataRetriever])
    ], EditTaskComponent);
    return EditTaskComponent;
}());
exports.EditTaskComponent = EditTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtdGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFFM0YsbUVBQTZFO0FBQzdFLDJDQUFzQztBQUN0QyxvQ0FBc0M7QUFDdEMsMENBQXlDO0FBRXpDLDJEQUFvRDtBQUNwRCwyREFBb0Q7QUFDcEQsd0VBQXFFO0FBQ3JFLDBEQUE4RDtBQUM5RCxvRUFBK0Q7QUFDL0QsbUNBQW1GO0FBUW5GO0lBU0ksMkJBQW9CLFdBQThCLEVBQVUsS0FBeUIsRUFDN0UsS0FBdUIsRUFBVSxRQUFrQixFQUNuRCxhQUE0QjtRQUZoQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUM3RSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbkQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFQcEMsaUJBQVksR0FBRyxtQkFBWSxDQUFDLENBQUMsZ0RBQWdEO1FBUXpFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFNBQVMsR0FBUyxZQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLHNGQUFzRjtRQUN0Riw2REFBNkQ7UUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQywrREFBK0Q7SUFDOUgsQ0FBQztJQUVELDBDQUFjLEdBQWQsVUFBZSxHQUFHO1FBQ2QsSUFBSSxPQUFPLEdB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O1lBQ1gsWUFBWSxFQUFFLFFBQVE7WUFDdEIsZ0JBQWdCLEVBQUUsUUFBUTtTQUM3QixDQUFDO1FBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxhQUFzQjtZQUNqRCxvREFBb0Q7WUFDcEQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJKdUI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVksaUJBQVU7d0RBQUM7SUFDZjtRQUE5QixnQkFBUyxDQUFDLGtCQUFrQixDQUFDO2tDQUFtQixpQkFBVTsrREFBQztJQUNyQztRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxpQkFBVTt1REFBQztJQVBuQyxpQkFBaUI7UUFMN0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7U0FDekQsQ0FBQzt5Q0FVbUMsZ0NBQWlCLEVBQWlCLDRCQUFrQjtZQUN0RSx1QkFBZ0IsRUFBb0IsaUJBQVE7WUFDcEMsaUNBQWE7T0FYM0IsaUJBQWlCLENBNEo3QjtJQUFELHdCQUFDO0NBQUEsQUE1SkQsSUE0SkM7QUE1SlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IGFuZHJvaWQgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBFZGl0U3RlcENvbXBvbmVudCB9IGZyb20gXCIuLi9lZGl0X3N0ZXAvZWRpdC1zdGVwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGRlZXBFcXVhbHMsIGlzTm9ubmVnYXRpdmVJbnRlZ2VyLCBjbG9uZSwgcGFkVHdvRGlnaXRzIH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcInRtci1lZGl0LXRhc2tcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL2VkaXRfdGFzay9lZGl0LXRhc2suY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvZWRpdF90YXNrL2VkaXQtdGFzay5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFZGl0VGFza0NvbXBvbmVudCB7XHJcblxyXG4gICAgdGFzazogVGFzaztcclxuICAgIHNhdmVkVGFzazogVGFzazsgLy9hbiB1bm1vZGlmaWVkIGNvcHkgb2YgdGhlIGxhc3Qgc2F2ZWQgdmVyc2lvbiBvZiB0aGlzLnRhc2tcclxuICAgIHBhZFR3b0RpZ2l0cyA9IHBhZFR3b0RpZ2l0czsgLy90byB1c2UgdGhpcyBmdW5jdGlvbiBmcm9tIHV0aWwgaW4gdGhlIHRlbXBsYXRlXHJcbiAgICBAVmlld0NoaWxkKCduYW1lRmllbGQnKSBuYW1lRmllbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdkZXNjcmlwdGlvbkZpZWxkJykgZGVzY3JpcHRpb25GaWVsZDogRWxlbWVudFJlZjtcclxuICAgIEBWaWV3Q2hpbGQoJ3N0ZXBMaXN0Jykgc3RlcExpc3Q6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgcHJpdmF0ZSBkYXRhUmV0cmlldmVyOiBEYXRhUmV0cmlldmVyKSB7XHJcbiAgICAgICAgbGV0IHRhc2tEYXRhID0gdGhpcy5kYXRhUmV0cmlldmVyLmRhdGE7XHJcbiAgICAgICAgdGhpcy50YXNrID0gbmV3IFRhc2sodGFza0RhdGEubmFtZSwgdGFza0RhdGEuZGVzY3JpcHRpb24sIHRhc2tEYXRhLnN0ZXBzKTtcclxuICAgICAgICB0aGlzLnNhdmVkVGFzayA9IDxUYXNrPmNsb25lKHRoaXMudGFzayk7XHJcbiAgICAgICAgLy9zdG9yZSB0aGUgb3JpZ2luYWwgbmFtZSBvZiB0aGUgdGFzayBzbyB3ZSBjYW4gcmV0cmlldmUgYW4gdW5hZHVsdGVyYXRlZCBjb3B5IGluIHRoZSBcclxuICAgICAgICAvL1Rhc2tDb21wb25lbnQgKHByZXZpb3VzIHBhZ2UpIGlmIHRoZSB1c2VyIGRvZXNuJ3Qgc2F2ZSBoZXJlXHJcbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmlkZW50aWZpZXIgPSB0aGlzLnRhc2submFtZS50b1N0cmluZygpOyAvL3RoZSByZWZlcmVuY2UgdG8gdGhlIG5hbWUgaXMgZGVzdHJveWVkIG9uIGJhY2sgcHJlc3M7IGNvcHkgaXRcclxuICAgIH1cclxuXHJcbiAgICBzaG93RmFpbHVyZU1zZyhtc2cpIHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdTYXZlIGZhaWxlZCcsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1zZ1xyXG4gICAgICAgIH1cclxuICAgICAgICBkaWFsb2dzLmFsZXJ0KG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vaGFuZGxlIGEgbm9uLW5hdGl2ZSBiYWNrIGJ1dHRvbiBwcmVzc1xyXG4gICAgYmFja1ByZXNzKCkge1xyXG4gICAgICAgIC8vaWYgdGhlIHVzZXIgaGFzIHVuc2F2ZWQgY2hhbmdlc1xyXG4gICAgICAgIGlmICh0aGlzLmNoYW5nZXNOb3RTYXZlZCgpKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiVW5zYXZlZCBjaGFuZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIllvdSd2ZSBtYWRlIHVuc2F2ZWQgY2hhbmdlcy5cIixcclxuICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJTYXZlIGNoYW5nZXNcIixcclxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiRGlzY2FyZCBjaGFuZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICBuZXV0cmFsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucykudGhlbigod2FudHNUb1NhdmU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgaGl0cyBkaXNjYXJkIGNoYW5nZXMsIGxldCB0aGVtIGdvIGJhY2tcclxuICAgICAgICAgICAgICAgIGlmICh3YW50c1RvU2F2ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL25hdmlnYXRlIGJhY2tcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vaWYgdGhleSB3YW50IHRvIHNhdmUgYW5kIHNhdmUgaXMgc3VjY2Vzc2Z1bFxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAod2FudHNUb1NhdmUgJiYgdGhpcy5zYXZlVGFzaygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYXZpZ2F0ZSBiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3RoZSBjYXNlIHdoZXJlIHRoZSB1c2VyIGhpdHMgY2FuY2VsICh3YW50c1RvU2F2ZSBpcyB1bmRlZmluZWQpIG5lZWRzXHJcbiAgICAgICAgICAgICAgICAvL25vIGFjdGlvblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VzTm90U2F2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICghZGVlcEVxdWFscyh0aGlzLnRhc2ssIHRoaXMuc2F2ZWRUYXNrKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWREYXRhKCkge1xyXG4gICAgICAgIGlmICghdGhpcy50YXNrLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBnaXZlIHRoaXMgcm91dGluZSBhIG5hbWUuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRhc2suc3RlcHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coXCJQbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSBzdGVwLlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFzay5zdGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RlcCA9IHRoaXMudGFzay5zdGVwc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coXCJQbGVhc2UgbmFtZSBldmVyeSBzdGVwIGluIHRoZSByb3V0aW5lLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTm9ubmVnYXRpdmVJbnRlZ2VyKHN0ZXAubWludXRlcykgfHwgIWlzTm9ubmVnYXRpdmVJbnRlZ2VyKHN0ZXAuc2Vjb25kcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coJ1RoZSBzdGVwIFwiJytzdGVwLm5hbWUrJ1wiIGhhcyBhbiBpbnZhbGlkIHRpbWUuJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2F2ZXMgdGhpcy50YXNrIHRvIGRpc2suIFJldHVybnMgdHJ1ZSBpZiBpdCBzYXZlcyBhbmQgZmFsc2UgaWYgaXQgZG9lc24ndC4gKi9cclxuICAgIHNhdmVUYXNrKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZERhdGEoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYXR0ZW1wdCB0byBzYXZlLiBPbiBzdWNjZXNzZnVsIHNhdmUsIHJlZnJlc2ggdGhlIHNhdmVkVGFzayBvYmplY3QgdG8gYmUgdGhlIHNhbWUgYXMgdGhpcy50YXNrXHJcbiAgICAgICAgdGhpcy5kYXRhTWFuYWdlci5zYXZlTmV3VGFzayh0aGlzLnRhc2ssICh0aGlzLnNhdmVkVGFzay5uYW1lICE9IHRoaXMudGFzay5uYW1lKSlcclxuICAgICAgICAudGhlbigoc2F2ZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNhdmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVkVGFzayA9IDxUYXNrPmNsb25lKHRoaXMudGFzayk7XHJcbiAgICAgICAgICAgICAgICAvL2luIGNhc2UgdGhlIHVzZXIgY2hhbmdlZCB0aGUgbmFtZSwga2VlcCB0cmFjayBvZiB0aGUgbmV3IG5hbWUgc28gdGhhdCwgaWYgdGhlIHVzZXIgXHJcbiAgICAgICAgICAgICAgICAvL25hdmlnYXRlcyBiYWNrIHRvIHRoZSB2aWV3IHRoZSB0YXNrLCB0aGV5IHNlZSB0aGUgdGFzayB0aGV5IGp1c3Qgc2F2ZWQgaW5zdGVhZCBvZiB0aGF0IHdpdGhcclxuICAgICAgICAgICAgICAgIC8vdGhlIG9sZCBuYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuaWRlbnRpZmllciA9IHRoaXMudGFzay5uYW1lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1N0ZXAoaW5kZXgpIHtcclxuICAgICAgICAvL2NyZWF0ZSBhIG5ldyBzdGVwXHJcbiAgICAgICAgbGV0IG5ld1N0ZXAgPSBuZXcgU3RlcChcIlwiLCBcIlwiLCAwLCAwLCAxKTtcclxuICAgICAgICAvL2FkZCBuZXdTdGVwIHRvIHRoZSBpbmRleHRoIGluZGV4IG9mIHRoaXMudGFzay5zdGVwc1xyXG4gICAgICAgIHRoaXMudGFzay5zdGVwcy5zcGxpY2UoaW5kZXgsIDAsIG5ld1N0ZXApO1xyXG4gICAgICAgIC8vc2Nyb2xsIHRoZSBMaXN0VmlldyB0byB0aGUgbmV3IHN0ZXBcclxuICAgICAgICB0aGlzLnNjcm9sbFN0ZXBMaXN0VG9JbmRleChpbmRleCk7XHJcbiAgICAgICAgLy9sYXVuY2ggYW4gZWRpdGluZyB3aW5kb3cgZm9yIHRoZSBuZXcgc3RlcFxyXG4gICAgICAgIHRoaXMuZWRpdFN0ZXBNb2RhbChuZXdTdGVwKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyogQ2F1c2VzIHRoZSBzdGVwcyBsaXN0IHZpZXcgdG8gc2Nyb2xsIHRvIGl0cyBpbmRleHRoIGl0ZW0uICovXHJcbiAgICBzY3JvbGxTdGVwTGlzdFRvSW5kZXgoaW5kZXgpIHtcclxuICAgICAgICBsZXQgbGlzdFZpZXcgPSA8UmFkTGlzdFZpZXc+dGhpcy5zdGVwTGlzdC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxpc3RWaWV3LnJlZnJlc2goKTsgLy9lbnN1cmVzIGFuIGl0ZW0ganVzdCBhZGRlZCB0byB0aGUgc3RlcHMgYXJyYXkgaXMgbG9hZGVkXHJcbiAgICAgICAgbGlzdFZpZXcuc2Nyb2xsVG9JbmRleChpbmRleCk7IC8vZG9uJ3QgYW5pbWF0ZS0tYXN5bmMgYmVoYXZpb3IgY2F1c2VzIGdsaXRjaGVzIGhlcmVcclxuICAgIH1cclxuXHJcbiAgICBlZGl0U3RlcE1vZGFsKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAvL3ByZXZlbnQgdGhlIGFubm95aW5nIGJlaGF2aW9yIG9mIHNjcm9sbGluZyB0byB0aGUgcGFnZSdzXHJcbiAgICAgICAgLy9sYXN0IGZvY3VzZWQgdGV4dCB2aWV3IHdoZW4gdGhlIGtleWJvYXJkIGlzIHVzZWQgaW4gdGhlIG1vZGFsXHJcbiAgICAgICAgaWYgKGFuZHJvaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbkZpZWxkLm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZUZpZWxkLm5hdGl2ZUVsZW1lbnQuYW5kcm9pZC5jbGVhckZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YVJldHJpZXZlci5kYXRhID0gc3RlcDtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY29udGV4dDogeyBzdGVwOiBzdGVwIH0sXHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoRWRpdFN0ZXBDb21wb25lbnQsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlU3RlcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSB0aGlzIHN0ZXA/XCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJEZWxldGVcIixcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9EZWxldGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBoaXRzIGRpc2NhcmQgY2hhbmdlcywgbGV0IHRoZW0gZ28gYmFja1xyXG4gICAgICAgICAgICBpZiAod2FudHNUb0RlbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrLnJlbW92ZVN0ZXAoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=