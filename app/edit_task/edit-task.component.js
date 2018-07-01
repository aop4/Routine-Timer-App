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
    EditTaskComponent.prototype.cancelEdit = function () {
        this.location.back();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC10YXNrLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtdGFzay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0U7QUFFcEUsMENBQXlDO0FBQ3pDLGlEQUFnRDtBQUNoRCx3REFBaUQ7QUFDakQsd0RBQWlEO0FBQ2pELHdFQUFxRTtBQUVyRSx1REFBMkQ7QUFDM0QsaUVBQTREO0FBQzVELG1FQUE2RTtBQUM3RSxnQ0FBa0U7QUFJbEUsb0NBQXNDO0FBQ3RDLDBDQUF5QztBQVN6QztJQTRDSSwyQkFBb0IsSUFBVSxFQUFVLFdBQThCLEVBQVUsS0FBeUIsRUFDN0YsS0FBdUIsRUFBVSxNQUFjLEVBQVUsUUFBa0I7UUFEbkUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQzdGLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbkYsSUFBSSxRQUFRLEdBQUcsaUNBQWEsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsU0FBUyxHQUFTLFlBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsc0ZBQXNGO1FBQ3RGLDZEQUE2RDtRQUM3RCxpQ0FBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLCtEQUErRDtJQUN6SCxDQUFDO0lBL0NELDBDQUFjLEdBQWQsVUFBZSxHQUFHO1FBQ2QsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFL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STdCO0lBQUQsd0JBQUM7Q0FBQSxBQXhJRCxJQXdJQztBQXhJWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xyXG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcclxuaW1wb3J0IHsgRWRpdFN0ZXBDb21wb25lbnQgfSBmcm9tIFwiLi4vZWRpdF9zdGVwL2VkaXQtc3RlcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xyXG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgZGVlcEVxdWFscywgaXNOb25uZWdhdGl2ZUludGVnZXIsIGNsb25lIH0gZnJvbSBcIi4uL3V0aWxcIjtcclxuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ1aS9mcmFtZVwiO1xyXG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhLCBhbmRyb2lkIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwidG1yLWVkaXQtdGFza1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiZWRpdF90YXNrL2VkaXQtdGFzay5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJlZGl0X3Rhc2svZWRpdC10YXNrLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgICBwcm92aWRlcnM6IFtTeXN0ZW1EYXRhU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVkaXRUYXNrQ29tcG9uZW50IHtcclxuXHJcbiAgICB0YXNrOiBUYXNrO1xyXG4gICAgc2F2ZWRUYXNrOiBUYXNrOyAvL2FuIHVubW9kaWZpZWQgY29weSBvZiB0aGUgbGFzdCBzYXZlZCB2ZXJzaW9uIG9mIHRoaXMudGFza1xyXG5cclxuICAgIHNob3dGYWlsdXJlTXNnKG1zZykge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1NhdmUgZmFpbGVkJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogbXNnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9oYW5kbGUgYSBub24tbmF0aXZlIGJhY2sgYnV0dG9uIHByZXNzXHJcbiAgICBiYWNrUHJlc3MoKSB7XHJcbiAgICAgICAgLy9pZiB0aGUgdXNlciBoYXMgdW5zYXZlZCBjaGFuZ2VzXHJcbiAgICAgICAgaWYgKHRoaXMuY2hhbmdlc05vdFNhdmVkKCkpIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJVbnNhdmVkIGNoYW5nZXNcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91J3ZlIG1hZGUgdW5zYXZlZCBjaGFuZ2VzLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlNhdmUgY2hhbmdlc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJEaXNjYXJkIGNoYW5nZXNcIixcclxuICAgICAgICAgICAgICAgIG5ldXRyYWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKCh3YW50c1RvU2F2ZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBoaXRzIGRpc2NhcmQgY2hhbmdlcywgbGV0IHRoZW0gZ28gYmFja1xyXG4gICAgICAgICAgICAgICAgaWYgKHdhbnRzVG9TYXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmF2aWdhdGUgYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9pZiB0aGV5IHdhbnQgdG8gc2F2ZSBhbmQgc2F2ZSBpcyBzdWNjZXNzZnVsXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh3YW50c1RvU2F2ZSAmJiB0aGlzLnNhdmVUYXNrKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL25hdmlnYXRlIGJhY2tcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vdGhlIGNhc2Ugd2hlcmUgdGhlIHVzZXIgaGl0cyBjYW5jZWwgKHdhbnRzVG9TYXZlIGlzIHVuZGVmaW5lZCkgbmVlZHNcclxuICAgICAgICAgICAgICAgIC8vbm8gYWN0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge1xyXG4gICAgICAgIGxldCB0YXNrRGF0YSA9IERhdGFSZXRyaWV2ZXIuZGF0YTtcclxuICAgICAgICB0aGlzLnRhc2sgPSBuZXcgVGFzayh0YXNrRGF0YS5uYW1lLCB0YXNrRGF0YS5kZXNjcmlwdGlvbiwgdGFza0RhdGEuc3RlcHMpO1xyXG4gICAgICAgIHRoaXMuc2F2ZWRUYXNrID0gPFRhc2s+Y2xvbmUodGhpcy50YXNrKTtcclxuICAgICAgICAvL3N0b3JlIHRoZSBvcmlnaW5hbCBuYW1lIG9mIHRoZSB0YXNrIHNvIHdlIGNhbiByZXRyaWV2ZSBhbiB1bmFkdWx0ZXJhdGVkIGNvcHkgaW4gdGhlIFxyXG4gICAgICAgIC8vVGFza0NvbXBvbmVudCAocHJldmlvdXMgcGFnZSkgaWYgdGhlIHVzZXIgZG9lc24ndCBzYXZlIGhlcmVcclxuICAgICAgICBEYXRhUmV0cmlldmVyLmlkZW50aWZpZXIgPSB0aGlzLnRhc2submFtZS50b1N0cmluZygpOyAvL3RoZSByZWZlcmVuY2UgdG8gdGhlIG5hbWUgaXMgZGVzdHJveWVkIG9uIGJhY2sgcHJlc3M7IGNvcHkgaXRcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VzTm90U2F2ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICghZGVlcEVxdWFscyh0aGlzLnRhc2ssIHRoaXMuc2F2ZWRUYXNrKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWREYXRhKCkge1xyXG4gICAgICAgIGlmICghdGhpcy50YXNrLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93RmFpbHVyZU1zZyhcIlBsZWFzZSBnaXZlIHRoaXMgcm91dGluZSBhIG5hbWUuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRhc2suc3RlcHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coXCJQbGVhc2UgYWRkIGF0IGxlYXN0IG9uZSBzdGVwLlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFzay5zdGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RlcCA9IHRoaXMudGFzay5zdGVwc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coXCJQbGVhc2UgbmFtZSBldmVyeSBzdGVwIGluIHRoZSByb3V0aW5lLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTm9ubmVnYXRpdmVJbnRlZ2VyKHN0ZXAubWludXRlcykgfHwgIWlzTm9ubmVnYXRpdmVJbnRlZ2VyKHN0ZXAuc2Vjb25kcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ZhaWx1cmVNc2coJ1RoZSBzdGVwIFwiJytzdGVwLm5hbWUrJ1wiIGhhcyBhbiBpbnZhbGlkIHRpbWUuJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyogU2F2ZXMgdGhpcy50YXNrIHRvIGRpc2suIFJldHVybnMgdHJ1ZSBpZiBpdCBzYXZlcyBhbmQgZmFsc2UgaWYgaXQgZG9lc24ndC4gKi9cclxuICAgIHNhdmVUYXNrKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZERhdGEoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYXR0ZW1wdCB0byBzYXZlLiBPbiBzdWNjZXNzZnVsIHNhdmUsIHJlZnJlc2ggdGhlIHNhdmVkVGFzayBvYmplY3QgdG8gYmUgdGhlIHNhbWUgYXMgdGhpcy50YXNrXHJcbiAgICAgICAgdGhpcy5kYXRhTWFuYWdlci5zYXZlTmV3VGFzayh0aGlzLnRhc2ssICh0aGlzLnNhdmVkVGFzay5uYW1lICE9IHRoaXMudGFzay5uYW1lKSlcclxuICAgICAgICAudGhlbigoc2F2ZWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNhdmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVkVGFzayA9IDxUYXNrPmNsb25lKHRoaXMudGFzayk7XHJcbiAgICAgICAgICAgICAgICBEYXRhUmV0cmlldmVyLmlkZW50aWZpZXIgPSB0aGlzLnRhc2submFtZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdTdGVwKCkge1xyXG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IHN0ZXAgYXQgdGhlIGVuZCBvZiB0YXNrLnN0ZXBzXHJcbiAgICAgICAgbGV0IG5ld1N0ZXAgPSBuZXcgU3RlcChcIlwiLCBcIlwiLCAwLCAwLCAxKTtcclxuICAgICAgICB0aGlzLnRhc2suc3RlcHMucHVzaChuZXdTdGVwKTtcclxuICAgICAgICAvL2xhdW5jaCBhbiBlZGl0aW5nIHdpbmRvdyBmb3IgdGhlIG5ldyBzdGVwXHJcbiAgICAgICAgdGhpcy5lZGl0U3RlcE1vZGFsKG5ld1N0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRTdGVwTW9kYWwoc3RlcDogU3RlcCkge1xyXG4gICAgICAgIERhdGFSZXRyaWV2ZXIuZGF0YSA9IHN0ZXA7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQ6IHsgc3RlcDogc3RlcCB9LFxyXG4gICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKEVkaXRTdGVwQ29tcG9uZW50LCBvcHRpb25zKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVN0ZXAoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJEZWxldGUgdGhpcyBzdGVwP1wiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiRGVsZXRlXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKCh3YW50c1RvRGVsZXRlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgIC8vaWYgdGhlIHVzZXIgaGl0cyBkaXNjYXJkIGNoYW5nZXMsIGxldCB0aGVtIGdvIGJhY2tcclxuICAgICAgICAgICAgaWYgKHdhbnRzVG9EZWxldGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFzay5yZW1vdmVTdGVwKGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbEVkaXQoKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==