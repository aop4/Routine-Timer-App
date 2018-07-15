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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtdGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkY7QUFFM0YsMENBQXlDO0FBQ3pDLGlEQUFnRDtBQUNoRCx3REFBaUQ7QUFDakQsd0RBQWlEO0FBQ2pELHdFQUFxRTtBQUVyRSx1REFBMkQ7QUFDM0QsaUVBQTREO0FBQzVELG1FQUE2RTtBQUM3RSxnQ0FBZ0Y7QUFFaEYsMkNBQStGO0FBRS9GLG9DQUFzQztBQUN0QywwQ0FBeUM7QUFTekM7SUErQ0ksMkJBQW9CLElBQVUsRUFBVSxXQUE4QixFQUFVLEtBQXlCLEVBQ3pGLEtBQXVCLEVBQVUsTUFBYyxFQUFVLFFBQWtCLEVBQzNFLGFBQTRCO1FBRnhCLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUN6RixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQzNFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBN0M1QyxpQkFBWSxHQUFHLG1CQUFZLENBQUMsQ0FBQyxnREFBZ0Q7UUE4Q3pFLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFNBQVMsR0FBUyxZQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLHNGQUFzRjtRQUN0Riw2REFBNkQ7UUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElB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QUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBM0l1QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBWSxpQkFBVTt3REFBQztJQUNmO1FBQTlCLGdCQUFTLENBQUMsa0JBQWtCLENBQUM7a0NBQW1CLGlCQUFVOytEQUFDO0lBTm5ELGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztTQUNuRCxDQUFDO3lDQWdENEIsV0FBSSxFQUF1QixnQ0FBaUIsRUFBaUIsNEJBQWtCO1lBQ2xGLHVCQUFnQixFQUFrQixlQUFNLEVBQW9CLGlCQUFRO1lBQzVELGlDQUFhO09BakRuQyxpQkFBaUIsQ0FrSjdCO0lBQUQsd0JBQUM7Q0FBQSxBQWxKRCxJQWtKQztBQWxKWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBFZGl0U3RlcENvbXBvbmVudCB9IGZyb20gXCIuLi9lZGl0X3N0ZXAvZWRpdC1zdGVwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XHJcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVJldHJpZXZlciB9IGZyb20gXCIuLi9zaGFyZWQvcGFzcy1kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBkZWVwRXF1YWxzLCBpc05vbm5lZ2F0aXZlSW50ZWdlciwgY2xvbmUsIHBhZFR3b0RpZ2l0cyB9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSwgYW5kcm9pZCB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tIFwibmF0aXZlc2NyaXB0LXRvYXN0XCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVGV4dFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXMvdmFsdWUtYWNjZXNzb3JzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ0bXItZWRpdC10YXNrXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJlZGl0X3Rhc2svZWRpdC10YXNrLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImVkaXRfdGFzay9lZGl0LXRhc2suY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRWRpdFRhc2tDb21wb25lbnQge1xyXG5cclxuICAgIHRhc2s6IFRhc2s7XHJcbiAgICBzYXZlZFRhc2s6IFRhc2s7IC8vYW4gdW5tb2RpZmllZCBjb3B5IG9mIHRoZSBsYXN0IHNhdmVkIHZlcnNpb24gb2YgdGhpcy50YXNrXHJcbiAgICBwYWRUd29EaWdpdHMgPSBwYWRUd29EaWdpdHM7IC8vdG8gdXNlIHRoaXMgZnVuY3Rpb24gZnJvbSB1dGlsIGluIHRoZSB0ZW1wbGF0ZVxyXG4gICAgQFZpZXdDaGlsZCgnbmFtZUZpZWxkJykgbmFtZUZpZWxkOiBFbGVtZW50UmVmO1xyXG4gICAgQFZpZXdDaGlsZCgnZGVzY3JpcHRpb25GaWVsZCcpIGRlc2NyaXB0aW9uRmllbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgc2hvd0ZhaWx1cmVNc2cobXNnKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnU2F2ZSBmYWlsZWQnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBtc2dcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlhbG9ncy5hbGVydChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2hhbmRsZSBhIG5vbi1uYXRpdmUgYmFjayBidXR0b24gcHJlc3NcclxuICAgIGJhY2tQcmVzcygpIHtcclxuICAgICAgICAvL2lmIHRoZSB1c2VyIGhhcyB1bnNhdmVkIGNoYW5nZXNcclxuICAgICAgICBpZiAodGhpcy5jaGFuZ2VzTm90U2F2ZWQoKSkge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVuc2F2ZWQgY2hhbmdlc1wiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UndmUgbWFkZSB1bnNhdmVkIGNoYW5nZXMuXCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiU2F2ZSBjaGFuZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkRpc2NhcmQgY2hhbmdlc1wiLFxyXG4gICAgICAgICAgICAgICAgbmV1dHJhbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9TYXZlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoZSB1c2VyIGhpdHMgZGlzY2FyZCBjaGFuZ2VzLCBsZXQgdGhlbSBnbyBiYWNrXHJcbiAgICAgICAgICAgICAgICBpZiAod2FudHNUb1NhdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYXZpZ2F0ZSBiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoZXkgd2FudCB0byBzYXZlIGFuZCBzYXZlIGlzIHN1Y2Nlc3NmdWxcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdhbnRzVG9TYXZlICYmIHRoaXMuc2F2ZVRhc2soKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmF2aWdhdGUgYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy90aGUgY2FzZSB3aGVyZSB0aGUgdXNlciBoaXRzIGNhbmNlbCAod2FudHNUb1NhdmUgaXMgdW5kZWZpbmVkKSBuZWVkc1xyXG4gICAgICAgICAgICAgICAgLy9ubyBhY3Rpb25cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgICAgICAgICAgcHJpdmF0ZSBkYXRhUmV0cmlldmVyOiBEYXRhUmV0cmlldmVyKSB7XHJcbiAgICAgICAgbGV0IHRhc2tEYXRhID0gdGhpcy5kYXRhUmV0cmlldmVyLmRhdGE7XHJcbiAgICAgICAgdGhpcy50YXNrID0gbmV3IFRhc2sodGFza0RhdGEubmFtZSwgdGFza0RhdGEuZGVzY3JpcHRpb24sIHRhc2tEYXRhLnN0ZXBzKTtcclxuICAgICAgICB0aGlzLnNhdmVkVGFzayA9IDxUYXNrPmNsb25lKHRoaXMudGFzayk7XHJcbiAgICAgICAgLy9zdG9yZSB0aGUgb3JpZ2luYWwgbmFtZSBvZiB0aGUgdGFzayBzbyB3ZSBjYW4gcmV0cmlldmUgYW4gdW5hZHVsdGVyYXRlZCBjb3B5IGluIHRoZSBcclxuICAgICAgICAvL1Rhc2tDb21wb25lbnQgKHByZXZpb3VzIHBhZ2UpIGlmIHRoZSB1c2VyIGRvZXNuJ3Qgc2F2ZSBoZXJlXHJcbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmlkZW50aWZpZXIgPSB0aGlzLnRhc2submFtZS50b1N0cmluZygpOyAvL3RoZSByZWZlcmVuY2UgdG8gdGhlIG5hbWUgaXMgZGVzdHJveWVkIG9uIGJhY2sgcHJlc3M7IGNvcHkgaXRcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VzTm90U2F2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICghZGVlcEVxdWFscyh0aGlzLnRhc2ssIHRoaXMuc2F2ZWRUYXNrKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWREYXRhKCkge1xyXG4gICAgICAgIGlmICghdGhpcy50YXNrLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBnaXZlIHRoaXMgcm91dGluZSBhIG5hbWUuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRhc2suc3RlcHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coXCJQbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSBzdGVwLlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFzay5zdGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RlcCA9IHRoaXMudGFzay5zdGVwc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coXCJQbGVhc2UgbmFtZSBldmVyeSBzdGVwIGluIHRoZSByb3V0aW5lLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTm9ubmVnYXRpdmVJbnRlZ2VyKHN0ZXAubWludXRlcykgfHwgIWlzTm9ubmVnYXRpdmVJbnRlZ2VyKHN0ZXAuc2Vjb25kcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coJ1RoZSBzdGVwIFwiJytzdGVwLm5hbWUrJ1wiIGhhcyBhbiBpbnZhbGlkIHRpbWUuJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2F2ZXMgdGhpcy50YXNrIHRvIGRpc2suIFJldHVybnMgdHJ1ZSBpZiBpdCBzYXZlcyBhbmQgZmFsc2UgaWYgaXQgZG9lc24ndC4gKi9cclxuICAgIHNhdmVUYXNrKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZERhdGEoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYXR0ZW1wdCB0byBzYXZlLiBPbiBzdWNjZXNzZnVsIHNhdmUsIHJlZnJlc2ggdGhlIHNhdmVkVGFzayBvYmplY3QgdG8gYmUgdGhlIHNhbWUgYXMgdGhpcy50YXNrXHJcbiAgICAgICAgdGhpcy5kYXRhTWFuYWdlci5zYXZlTmV3VGFzayh0aGlzLnRhc2ssICh0aGlzLnNhdmVkVGFzay5uYW1lICE9IHRoaXMudGFzay5uYW1lKSlcclxuICAgICAgICAudGhlbigoc2F2ZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNhdmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVkVGFzayA9IDxUYXNrPmNsb25lKHRoaXMudGFzayk7XHJcbiAgICAgICAgICAgICAgICAvL2luIGNhc2UgdGhlIHVzZXIgY2hhbmdlZCB0aGUgbmFtZSwga2VlcCB0cmFjayBvZiB0aGUgbmV3IG5hbWUgc28gdGhhdCwgaWYgdGhlIHVzZXIgXHJcbiAgICAgICAgICAgICAgICAvL25hdmlnYXRlcyBiYWNrIHRvIHRoZSB2aWV3IHRoZSB0YXNrLCB0aGV5IHNlZSB0aGUgdGFzayB0aGV5IGp1c3Qgc2F2ZWQgaW5zdGVhZCBvZiB0aGF0IHdpdGhcclxuICAgICAgICAgICAgICAgIC8vdGhlIG9sZCBuYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuaWRlbnRpZmllciA9IHRoaXMudGFzay5uYW1lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1N0ZXAoaW5kZXgpIHtcclxuICAgICAgICAvL2NyZWF0ZSBhIG5ldyBzdGVwXHJcbiAgICAgICAgbGV0IG5ld1N0ZXAgPSBuZXcgU3RlcChcIlwiLCBcIlwiLCAwLCAwLCAxKTtcclxuICAgICAgICAvL2FkZCBuZXdTdGVwIHRvIHRoZSBpbmRleHRoIGluZGV4IG9mIHRoaXMudGFzay5zdGVwc1xyXG4gICAgICAgIHRoaXMudGFzay5zdGVwcy5zcGxpY2UoaW5kZXgsIDAsIG5ld1N0ZXApO1xyXG4gICAgICAgIC8vbGF1bmNoIGFuIGVkaXRpbmcgd2luZG93IGZvciB0aGUgbmV3IHN0ZXBcclxuICAgICAgICB0aGlzLmVkaXRTdGVwTW9kYWwobmV3U3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFN0ZXBNb2RhbChzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgLy9wcmV2ZW50IHRoZSBhbm5veWluZyBiZWhhdmlvciBvZiBzY3JvbGxpbmcgdG8gdGhlIHBhZ2Unc1xyXG4gICAgICAgIC8vbGFzdCBmb2N1c2VkIHRleHQgdmlldyB3aGVuIHRoZSBrZXlib2FyZCBpcyB1c2VkIGluIHRoZSBtb2RhbFxyXG4gICAgICAgIGlmIChhbmRyb2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb25GaWVsZC5uYXRpdmVFbGVtZW50LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWVGaWVsZC5uYXRpdmVFbGVtZW50LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YSA9IHN0ZXA7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQ6IHsgc3RlcDogc3RlcCB9LFxyXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKEVkaXRTdGVwQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVN0ZXAoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgdGhpcyBzdGVwP1wiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRGVsZXRlXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKCh3YW50c1RvRGVsZXRlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgaGl0cyBkaXNjYXJkIGNoYW5nZXMsIGxldCB0aGVtIGdvIGJhY2tcclxuICAgICAgICAgICAgaWYgKHdhbnRzVG9EZWxldGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFzay5yZW1vdmVTdGVwKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19