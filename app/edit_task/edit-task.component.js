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
            styleUrls: ["edit_task/edit-task.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, data_service_1.SystemDataService, dialogs_1.ModalDialogService,
            core_1.ViewContainerRef, router_1.Router, common_1.Location])
    ], EditTaskComponent);
    return EditTaskComponent;
}());
exports.EditTaskComponent = EditTaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtdGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0U7QUFFcEUsMENBQXlDO0FBQ3pDLGlEQUFnRDtBQUNoRCx3REFBaUQ7QUFDakQsd0RBQWlEO0FBQ2pELHdFQUFxRTtBQUVyRSx1REFBMkQ7QUFDM0QsaUVBQTREO0FBQzVELG1FQUE2RTtBQUM3RSxnQ0FBa0U7QUFJbEUsb0NBQXNDO0FBQ3RDLDBDQUF5QztBQVF6QztJQTRDSSwyQkFBb0IsSUFBVSxFQUFVLFdBQThCLEVBQVUsS0FBeUIsRUFDN0YsS0FBdUIsRUFBVSxNQUFjLEVBQVUsUUFBa0I7UUFEbkUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQzdGLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbkYsSUFBSSxRQUFRLEdBQUcsaUNBQWEsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsU0FBUyxHQUFTLFlBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsc0ZBQXNGO1FBQ3RGLDZEQUE2RDtRQUM3RCxpQ0FBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLCtEQUErRDtJQUN6SCxDQUFDO0lBL0NELDBDQUFjLEdBQWQsVUFBZSxHQUFHO1FBQ2QsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFL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dGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBFZGl0U3RlcENvbXBvbmVudCB9IGZyb20gXCIuLi9lZGl0X3N0ZXAvZWRpdC1zdGVwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XHJcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRGF0YVJldHJpZXZlciB9IGZyb20gXCIuLi9zaGFyZWQvcGFzcy1kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBkZWVwRXF1YWxzLCBpc05vbm5lZ2F0aXZlSW50ZWdlciwgY2xvbmUgfSBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEsIGFuZHJvaWQgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSBcIm5hdGl2ZXNjcmlwdC10b2FzdFwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ0bXItZWRpdC10YXNrXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJlZGl0X3Rhc2svZWRpdC10YXNrLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImVkaXRfdGFzay9lZGl0LXRhc2suY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRWRpdFRhc2tDb21wb25lbnQge1xyXG5cclxuICAgIHRhc2s6IFRhc2s7XHJcbiAgICBzYXZlZFRhc2s6IFRhc2s7IC8vYW4gdW5tb2RpZmllZCBjb3B5IG9mIHRoZSBsYXN0IHNhdmVkIHZlcnNpb24gb2YgdGhpcy50YXNrXHJcblxyXG4gICAgc2hvd0ZhaWx1cmVNc2cobXNnKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnU2F2ZSBmYWlsZWQnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBtc2dcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlhbG9ncy5hbGVydChvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2hhbmRsZSBhIG5vbi1uYXRpdmUgYmFjayBidXR0b24gcHJlc3NcclxuICAgIGJhY2tQcmVzcygpIHtcclxuICAgICAgICAvL2lmIHRoZSB1c2VyIGhhcyB1bnNhdmVkIGNoYW5nZXNcclxuICAgICAgICBpZiAodGhpcy5jaGFuZ2VzTm90U2F2ZWQoKSkge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlVuc2F2ZWQgY2hhbmdlc1wiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UndmUgbWFkZSB1bnNhdmVkIGNoYW5nZXMuXCIsXHJcbiAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiU2F2ZSBjaGFuZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkRpc2NhcmQgY2hhbmdlc1wiLFxyXG4gICAgICAgICAgICAgICAgbmV1dHJhbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9TYXZlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoZSB1c2VyIGhpdHMgZGlzY2FyZCBjaGFuZ2VzLCBsZXQgdGhlbSBnbyBiYWNrXHJcbiAgICAgICAgICAgICAgICBpZiAod2FudHNUb1NhdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYXZpZ2F0ZSBiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoZXkgd2FudCB0byBzYXZlIGFuZCBzYXZlIGlzIHN1Y2Nlc3NmdWxcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdhbnRzVG9TYXZlICYmIHRoaXMuc2F2ZVRhc2soKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmF2aWdhdGUgYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy90aGUgY2FzZSB3aGVyZSB0aGUgdXNlciBoaXRzIGNhbmNlbCAod2FudHNUb1NhdmUgaXMgdW5kZWZpbmVkKSBuZWVkc1xyXG4gICAgICAgICAgICAgICAgLy9ubyBhY3Rpb25cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uKSB7XHJcbiAgICAgICAgbGV0IHRhc2tEYXRhID0gRGF0YVJldHJpZXZlci5kYXRhO1xyXG4gICAgICAgIHRoaXMudGFzayA9IG5ldyBUYXNrKHRhc2tEYXRhLm5hbWUsIHRhc2tEYXRhLmRlc2NyaXB0aW9uLCB0YXNrRGF0YS5zdGVwcyk7XHJcbiAgICAgICAgdGhpcy5zYXZlZFRhc2sgPSA8VGFzaz5jbG9uZSh0aGlzLnRhc2spO1xyXG4gICAgICAgIC8vc3RvcmUgdGhlIG9yaWdpbmFsIG5hbWUgb2YgdGhlIHRhc2sgc28gd2UgY2FuIHJldHJpZXZlIGFuIHVuYWR1bHRlcmF0ZWQgY29weSBpbiB0aGUgXHJcbiAgICAgICAgLy9UYXNrQ29tcG9uZW50IChwcmV2aW91cyBwYWdlKSBpZiB0aGUgdXNlciBkb2Vzbid0IHNhdmUgaGVyZVxyXG4gICAgICAgIERhdGFSZXRyaWV2ZXIuaWRlbnRpZmllciA9IHRoaXMudGFzay5uYW1lLnRvU3RyaW5nKCk7IC8vdGhlIHJlZmVyZW5jZSB0byB0aGUgbmFtZSBpcyBkZXN0cm95ZWQgb24gYmFjayBwcmVzczsgY29weSBpdFxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZXNOb3RTYXZlZCgpIHtcclxuICAgICAgICByZXR1cm4gKCFkZWVwRXF1YWxzKHRoaXMudGFzaywgdGhpcy5zYXZlZFRhc2spKTtcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZERhdGEoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhc2submFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGYWlsdXJlTXNnKFwiUGxlYXNlIGdpdmUgdGhpcyByb3V0aW5lIGEgbmFtZS5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGFzay5zdGVwcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBhZGQgYXQgbGVhc3Qgb25lIHN0ZXAuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YXNrLnN0ZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGVwID0gdGhpcy50YXNrLnN0ZXBzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBuYW1lIGV2ZXJ5IHN0ZXAgaW4gdGhlIHJvdXRpbmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOb25uZWdhdGl2ZUludGVnZXIoc3RlcC5taW51dGVzKSB8fCAhaXNOb25uZWdhdGl2ZUludGVnZXIoc3RlcC5zZWNvbmRzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZygnVGhlIHN0ZXAgXCInK3N0ZXAubmFtZSsnXCIgaGFzIGFuIGludmFsaWQgdGltZS4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBTYXZlcyB0aGlzLnRhc2sgdG8gZGlzay4gUmV0dXJucyB0cnVlIGlmIGl0IHNhdmVzIGFuZCBmYWxzZSBpZiBpdCBkb2Vzbid0LiAqL1xyXG4gICAgc2F2ZVRhc2soKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkRGF0YSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hdHRlbXB0IHRvIHNhdmUuIE9uIHN1Y2Nlc3NmdWwgc2F2ZSwgcmVmcmVzaCB0aGUgc2F2ZWRUYXNrIG9iamVjdCB0byBiZSB0aGUgc2FtZSBhcyB0aGlzLnRhc2tcclxuICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyLnNhdmVOZXdUYXNrKHRoaXMudGFzaywgKHRoaXMuc2F2ZWRUYXNrLm5hbWUgIT0gdGhpcy50YXNrLm5hbWUpKVxyXG4gICAgICAgIC50aGVuKChzYXZlZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2F2ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWRUYXNrID0gPFRhc2s+Y2xvbmUodGhpcy50YXNrKTtcclxuICAgICAgICAgICAgICAgIERhdGFSZXRyaWV2ZXIuaWRlbnRpZmllciA9IHRoaXMudGFzay5uYW1lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1N0ZXAoKSB7XHJcbiAgICAgICAgLy9jcmVhdGUgYSBuZXcgc3RlcCBhdCB0aGUgZW5kIG9mIHRhc2suc3RlcHNcclxuICAgICAgICBsZXQgbmV3U3RlcCA9IG5ldyBTdGVwKFwiXCIsIFwiXCIsIDAsIDAsIDEpO1xyXG4gICAgICAgIHRoaXMudGFzay5zdGVwcy5wdXNoKG5ld1N0ZXApO1xyXG4gICAgICAgIC8vbGF1bmNoIGFuIGVkaXRpbmcgd2luZG93IGZvciB0aGUgbmV3IHN0ZXBcclxuICAgICAgICB0aGlzLmVkaXRTdGVwTW9kYWwobmV3U3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFN0ZXBNb2RhbChzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgRGF0YVJldHJpZXZlci5kYXRhID0gc3RlcDtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY29udGV4dDogeyBzdGVwOiBzdGVwIH0sXHJcbiAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoRWRpdFN0ZXBDb21wb25lbnQsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlU3RlcChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSB0aGlzIHN0ZXA/XCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJEZWxldGVcIixcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHdhbnRzVG9EZWxldGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBoaXRzIGRpc2NhcmQgY2hhbmdlcywgbGV0IHRoZW0gZ28gYmFja1xyXG4gICAgICAgICAgICBpZiAod2FudHNUb0RlbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrLnJlbW92ZVN0ZXAoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=