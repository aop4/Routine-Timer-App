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
        var taskData = pass_data_service_1.DataRetriever.data;
        this.task = new task_model_1.Task(taskData.name, taskData.description, taskData.steps);
        this.savedTask = Object.assign({}, this.task);
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
        if (!this.validData()) {
            return false;
        }
        //attempt to save. On successful save, refresh the savedTask object to be the same as this.task
        var saved = this.dataManager.saveNewTask(this.task, (this.savedTask.name != this.task.name));
        if (saved) {
            this.savedTask = Object.assign({}, this.task);
            pass_data_service_1.DataRetriever.identifier = this.task.name;
            return true;
        }
        return false;
    };
    EditTaskComponent.prototype.newStep = function () {
        //create a new step at the end of task.steps
        var newStep = new step_model_1.Step("", "", 0, 0, 1);
        this.task.steps.push(newStep);
        //launch an editing window for the new step
        this.editStepModal(newStep);
    };
    EditTaskComponent.prototype.editStepModal = function (step) {
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
    EditTaskComponent = __decorate([
        core_1.Component({
            selector: "tmr-edit-task",
            templateUrl: "edit_task/edit-task.component.html",
            styleUrls: ["edit_task/edit-task.component.css"],
            providers: [data_service_1.SystemDataService]
        }),
        __metadata("design:paramtypes", [page_1.Page, data_service_1.SystemDataService, dialogs_1.ModalDialogService,
            core_1.ViewContainerRef, router_1.Router, common_1.Location])
    ], EditTaskComponent);
    return EditTaskComponent;
}());
exports.EditTaskComponent = EditTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtdGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0U7QUFFcEUsMENBQXlDO0FBQ3pDLGlEQUFnRDtBQUNoRCx3REFBaUQ7QUFDakQsd0RBQWlEO0FBQ2pELHdFQUFxRTtBQUVyRSx1REFBMkQ7QUFDM0QsaUVBQTREO0FBQzVELG1FQUE2RTtBQUM3RSxnQ0FBMkQ7QUFJM0Qsb0NBQXNDO0FBQ3RDLDBDQUF5QztBQVN6QztJQTRDSSwyQkFBb0IsSUFBVSxFQUFVLFdBQThCLEVBQVUsS0FBeUIsRUFDN0YsS0FBdUIsRUFBVSxNQUFjLEVBQVUsUUFBa0I7UUFEbkUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQzdGLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbkYsSUFBSSxRQUFRLEdBQUcsaUNBQWEsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxzRkFBc0Y7UUFDdEYsNkRBQTZEO1FBQzdELGlDQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsK0RBQStEO0lBQ3pILENBQUM7SUEvQ0QsMENBQWMsR0FBZCxVQUFlLEdBQUc7UUFDZCxJQUFJ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bXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcclxuaW1wb3J0IHsgRWRpdFN0ZXBDb21wb25lbnQgfSBmcm9tIFwiLi4vZWRpdF9zdGVwL2VkaXQtc3RlcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xyXG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgZGVlcEVxdWFscywgaXNOb25uZWdhdGl2ZUludGVnZXIgfSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEsIGFuZHJvaWQgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ0bXItZWRpdC10YXNrXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJlZGl0X3Rhc2svZWRpdC10YXNrLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImVkaXRfdGFzay9lZGl0LXRhc2suY29tcG9uZW50LmNzc1wiXSxcclxuICAgIHByb3ZpZGVyczogW1N5c3RlbURhdGFTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRWRpdFRhc2tDb21wb25lbnQge1xyXG5cclxuICAgIHRhc2s6IFRhc2s7XHJcbiAgICBzYXZlZFRhc2s6IFRhc2s7IC8vYW4gdW5tb2RpZmllZCB2ZXJzaW9uIG9mIHRoZSBsYXN0IHNhdmVkIHZlcnNpb24gb2YgYHRhc2tgXHJcblxyXG4gICAgc2hvd0ZhaWx1cmVNc2cobXNnKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnU2F2ZSBmYWlsZWQnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBtc2dcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlhbG9ncy5hbGVydChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2hhbmRsZSBhIG5vbi1uYXRpdmUgYmFjayBidXR0b24gcHJlc3NcclxuICAgIGJhY2tQcmVzcygpIHtcclxuICAgICAgICAvL2lmIHRoZSB1c2VyIGhhcyB1bnNhdmVkIGNoYW5nZXNcclxuICAgICAgICBpZiAodGhpcy5jaGFuZ2VzTm90U2F2ZWQoKSkge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVuc2F2ZWQgY2hhbmdlc1wiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UndmUgbWFkZSB1bnNhdmVkIGNoYW5nZXMuXCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiU2F2ZSBjaGFuZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkRpc2NhcmQgY2hhbmdlc1wiLFxyXG4gICAgICAgICAgICAgICAgbmV1dHJhbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9TYXZlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoZSB1c2VyIGhpdHMgZGlzY2FyZCBjaGFuZ2VzLCBsZXQgdGhlbSBnbyBiYWNrXHJcbiAgICAgICAgICAgICAgICBpZiAod2FudHNUb1NhdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYXZpZ2F0ZSBiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoZXkgd2FudCB0byBzYXZlIGFuZCBzYXZlIGlzIHN1Y2Nlc3NmdWxcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdhbnRzVG9TYXZlICYmIHRoaXMuc2F2ZVRhc2soKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmF2aWdhdGUgYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy90aGUgY2FzZSB3aGVyZSB0aGUgdXNlciBoaXRzIGNhbmNlbCAod2FudHNUb1NhdmUgaXMgdW5kZWZpbmVkKSBuZWVkc1xyXG4gICAgICAgICAgICAgICAgLy9ubyBhY3Rpb25cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uKSB7XHJcbiAgICAgICAgbGV0IHRhc2tEYXRhID0gRGF0YVJldHJpZXZlci5kYXRhO1xyXG4gICAgICAgIHRoaXMudGFzayA9IG5ldyBUYXNrKHRhc2tEYXRhLm5hbWUsIHRhc2tEYXRhLmRlc2NyaXB0aW9uLCB0YXNrRGF0YS5zdGVwcyk7XHJcbiAgICAgICAgdGhpcy5zYXZlZFRhc2sgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRhc2spO1xyXG4gICAgICAgIC8vc3RvcmUgdGhlIG9yaWdpbmFsIG5hbWUgb2YgdGhlIHRhc2sgc28gd2UgY2FuIHJldHJpZXZlIGFuIHVuYWR1bHRlcmF0ZWQgY29weSBpbiB0aGUgXHJcbiAgICAgICAgLy9UYXNrQ29tcG9uZW50IChwcmV2aW91cyBwYWdlKSBpZiB0aGUgdXNlciBkb2Vzbid0IHNhdmUgaGVyZVxyXG4gICAgICAgIERhdGFSZXRyaWV2ZXIuaWRlbnRpZmllciA9IHRoaXMudGFzay5uYW1lLnRvU3RyaW5nKCk7IC8vdGhlIHJlZmVyZW5jZSB0byB0aGUgbmFtZSBpcyBkZXN0cm95ZWQgb24gYmFjayBwcmVzczsgY29weSBpdFxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZXNOb3RTYXZlZCgpIHtcclxuICAgICAgICByZXR1cm4gKCFkZWVwRXF1YWxzKHRoaXMudGFzaywgdGhpcy5zYXZlZFRhc2spKTtcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZERhdGEoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2submFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsdXJlTXNnKFwiUGxlYXNlIGdpdmUgdGhpcyByb3V0aW5lIGEgbmFtZS5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGFzay5zdGVwcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBhZGQgYXQgbGVhc3Qgb25lIHN0ZXAuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YXNrLnN0ZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGVwID0gdGhpcy50YXNrLnN0ZXBzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBuYW1lIGV2ZXJ5IHN0ZXAgaW4gdGhlIHJvdXRpbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOb25uZWdhdGl2ZUludGVnZXIoc3RlcC5taW51dGVzKSB8fCAhaXNOb25uZWdhdGl2ZUludGVnZXIoc3RlcC5zZWNvbmRzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZygnVGhlIHN0ZXAgXCInK3N0ZXAubmFtZSsnXCIgaGFzIGFuIGludmFsaWQgdGltZS4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBTYXZlcyB0aGlzLnRhc2sgdG8gZGlzay4gUmV0dXJucyB0cnVlIGlmIGl0IHNhdmVzIGFuZCBmYWxzZSBpZiBpdCBkb2Vzbid0LiAqL1xyXG4gICAgc2F2ZVRhc2soKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkRGF0YSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hdHRlbXB0IHRvIHNhdmUuIE9uIHN1Y2Nlc3NmdWwgc2F2ZSwgcmVmcmVzaCB0aGUgc2F2ZWRUYXNrIG9iamVjdCB0byBiZSB0aGUgc2FtZSBhcyB0aGlzLnRhc2tcclxuICAgICAgICBsZXQgc2F2ZWQgPSB0aGlzLmRhdGFNYW5hZ2VyLnNhdmVOZXdUYXNrKHRoaXMudGFzaywgKHRoaXMuc2F2ZWRUYXNrLm5hbWUgIT0gdGhpcy50YXNrLm5hbWUpKTtcclxuICAgICAgICBpZiAoc2F2ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlZFRhc2sgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRhc2spO1xyXG4gICAgICAgICAgICBEYXRhUmV0cmlldmVyLmlkZW50aWZpZXIgPSB0aGlzLnRhc2submFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdTdGVwKCkge1xyXG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IHN0ZXAgYXQgdGhlIGVuZCBvZiB0YXNrLnN0ZXBzXHJcbiAgICAgICAgbGV0IG5ld1N0ZXAgPSBuZXcgU3RlcChcIlwiLCBcIlwiLCAwLCAwLCAxKTtcclxuICAgICAgICB0aGlzLnRhc2suc3RlcHMucHVzaChuZXdTdGVwKTtcclxuICAgICAgICAvL2xhdW5jaCBhbiBlZGl0aW5nIHdpbmRvdyBmb3IgdGhlIG5ldyBzdGVwXHJcbiAgICAgICAgdGhpcy5lZGl0U3RlcE1vZGFsKG5ld1N0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRTdGVwTW9kYWwoc3RlcDogU3RlcCkge1xyXG4gICAgICAgIERhdGFSZXRyaWV2ZXIuZGF0YSA9IHN0ZXA7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQ6IHsgc3RlcDogc3RlcCB9LFxyXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKEVkaXRTdGVwQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVN0ZXAoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgdGhpcyBzdGVwP1wiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRGVsZXRlXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKCh3YW50c1RvRGVsZXRlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgaGl0cyBkaXNjYXJkIGNoYW5nZXMsIGxldCB0aGVtIGdvIGJhY2tcclxuICAgICAgICAgICAgaWYgKHdhbnRzVG9EZWxldGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFzay5yZW1vdmVTdGVwKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSJdfQ==