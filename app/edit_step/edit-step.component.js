"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var pass_data_service_1 = require("../shared/pass-data.service");
var page_1 = require("tns-core-modules/ui/page");
var common_1 = require("@angular/common");
var Util = require("../util");
var EditStepComponent = /** @class */ (function () {
    function EditStepComponent(page, location, params, dataRetriever) {
        this.page = page;
        this.location = location;
        this.params = params;
        this.dataRetriever = dataRetriever;
    }
    EditStepComponent.prototype.ngOnInit = function () {
        this.step = this.dataRetriever.data;
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
        this.repetitions = this.step.repetitions;
    };
    EditStepComponent.prototype.stopWarningUser = function (textField) {
        textField.borderWidth = "0";
    };
    EditStepComponent.prototype.warnUser = function (textField) {
        textField.borderBottomWidth = 2;
    };
    /* Returns false if textField contains anything besides a nonnegative integer, or if
    zeroAllowed is false and the textfield contains 0. */
    EditStepComponent.prototype.validNumericText = function (text, zeroAllowed) {
        var numericVal = parseInt(text);
        if (numericVal === NaN || numericVal < 0 || !Number.isInteger(numericVal) ||
            (numericVal === 0 && !zeroAllowed)) {
            return false;
        }
        return true;
    };
    EditStepComponent.prototype.updateTimeInterval = function (args, modifySeconds) {
        var textField = args.object;
        var text = textField.text;
        var val = parseInt(text);
        if (this.validNumericText(text, true)) {
            if (modifySeconds) {
                this.step.seconds = val;
            }
            else {
                this.step.minutes = val;
            }
            this.stopWarningUser(textField);
        }
        else if (text != "") {
            this.warnUser(textField);
        }
    };
    EditStepComponent.prototype.updateSeconds = function (args) {
        this.updateTimeInterval(args, true);
    };
    EditStepComponent.prototype.updateMinutes = function (args) {
        this.updateTimeInterval(args, false);
    };
    EditStepComponent.prototype.updateRepetitions = function (args) {
        var textField = args.object;
        var text = textField.text;
        var val = parseInt(text);
        if (this.validNumericText(textField.text, false)) {
            this.step.repetitions = parseInt(textField.text);
            this.stopWarningUser(textField);
        }
        else {
            this.warnUser(textField);
        }
    };
    EditStepComponent.prototype.closeModal = function () {
        //close this modal component (literally "this" component; it's modal suicide)
        this.params.closeCallback();
    };
    EditStepComponent.prototype.padTwoDigits = function (val) {
        if (this.seconds === 0 && this.minutes === 0) {
            return "";
        }
        else {
            return Util.padTwoDigits(val);
        }
    };
    __decorate([
        core_1.ViewChild('container'),
        __metadata("design:type", core_1.ElementRef)
    ], EditStepComponent.prototype, "container", void 0);
    EditStepComponent = __decorate([
        core_1.Component({
            selector: "tmr-edit-step",
            templateUrl: "edit_step/edit-step.component.html",
            styleUrls: ["edit_step/edit-step.component.css"]
        })
        /* A modal shown over the edit task page for adding/editing a step within a routine */
        ,
        __metadata("design:paramtypes", [page_1.Page, common_1.Location, dialogs_1.ModalDialogParams,
            pass_data_service_1.DataRetriever])
    ], EditStepComponent);
    return EditStepComponent;
}());
exports.EditStepComponent = EditStepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdGVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBZ0Y7QUFDaEYsbUVBQTRFO0FBQzVFLGlFQUE0RDtBQUU1RCxpREFBZ0Q7QUFLaEQsMENBQXlDO0FBQ3pDLDhCQUFnQztBQVVoQztJQVFJLDJCQUFvQixJQUFVLEVBQVUsUUFBa0IsRUFBVSxNQUF5QixFQUNqRixhQUE0QjtRQURwQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ2pGLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBRXhDLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM3QyxDQUFDO0lBRUQsMkNBQWUsR0FBZixVQUFnQixTQUFvQjtRQUNoQyxTQUFTLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUNoQyxDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLFNBQW9CO1FBQ3pCLFNBQVMsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEO3lEQUNxRDtJQUNyRCw0Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBWSxFQUFFLFdBQW9CO1FBQy9DLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtB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QU5yQyxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7U0FDbkQsQ0FBQztRQUNGLHNGQUFzRjs7eUNBU3hELFdBQUksRUFBb0IsaUJBQVEsRUFBa0IsMkJBQWlCO1lBQ2xFLGlDQUFhO09BVC9CLGlCQUFpQixDQTRGN0I7SUFBRCx3QkFBQztDQUFBLEFBNUZELElBNEZDO0FBNUZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0ICogYXMgVXRpbCBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ0bXItZWRpdC1zdGVwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJlZGl0X3N0ZXAvZWRpdC1zdGVwLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImVkaXRfc3RlcC9lZGl0LXN0ZXAuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG4vKiBBIG1vZGFsIHNob3duIG92ZXIgdGhlIGVkaXQgdGFzayBwYWdlIGZvciBhZGRpbmcvZWRpdGluZyBhIHN0ZXAgd2l0aGluIGEgcm91dGluZSAqL1xyXG5leHBvcnQgY2xhc3MgRWRpdFN0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHN0ZXA6IFN0ZXA7IC8vdGhlIHN0ZXAgcmVwcmVzZW50ZWQgYnkgdGhpcyBjb21wb25lbnRcclxuICAgIG1pbnV0ZXM6IG51bWJlcjtcclxuICAgIHNlY29uZHM6IG51bWJlcjtcclxuICAgIHJlcGV0aXRpb25zOiBudW1iZXI7XHJcbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVJldHJpZXZlcjogRGF0YVJldHJpZXZlcikge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuc3RlcCA9IHRoaXMuZGF0YVJldHJpZXZlci5kYXRhO1xyXG4gICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMuc3RlcC5taW51dGVzO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xyXG4gICAgICAgIHRoaXMucmVwZXRpdGlvbnMgPSB0aGlzLnN0ZXAucmVwZXRpdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcFdhcm5pbmdVc2VyKHRleHRGaWVsZDogVGV4dEZpZWxkKSB7XHJcbiAgICAgICAgdGV4dEZpZWxkLmJvcmRlcldpZHRoID0gXCIwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgd2FyblVzZXIodGV4dEZpZWxkOiBUZXh0RmllbGQpIHtcclxuICAgICAgICB0ZXh0RmllbGQuYm9yZGVyQm90dG9tV2lkdGggPSAyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFJldHVybnMgZmFsc2UgaWYgdGV4dEZpZWxkIGNvbnRhaW5zIGFueXRoaW5nIGJlc2lkZXMgYSBub25uZWdhdGl2ZSBpbnRlZ2VyLCBvciBpZlxyXG4gICAgemVyb0FsbG93ZWQgaXMgZmFsc2UgYW5kIHRoZSB0ZXh0ZmllbGQgY29udGFpbnMgMC4gKi9cclxuICAgIHZhbGlkTnVtZXJpY1RleHQodGV4dDogc3RyaW5nLCB6ZXJvQWxsb3dlZDogYm9vbGVhbikge1xyXG4gICAgICAgIHZhciBudW1lcmljVmFsID0gcGFyc2VJbnQodGV4dCk7XHJcbiAgICAgICAgaWYgKG51bWVyaWNWYWwgPT09IE5hTiB8fCBudW1lcmljVmFsIDwgMCB8fCAhTnVtYmVyLmlzSW50ZWdlcihudW1lcmljVmFsKSB8fFxyXG4gICAgICAgICAgICAobnVtZXJpY1ZhbCA9PT0gMCAmJiAhemVyb0FsbG93ZWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGltZUludGVydmFsKGFyZ3MsIG1vZGlmeVNlY29uZHMpIHtcclxuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgdGV4dCA9IHRleHRGaWVsZC50ZXh0O1xyXG4gICAgICAgIGxldCB2YWwgPSBwYXJzZUludCh0ZXh0KTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZE51bWVyaWNUZXh0KHRleHQsIHRydWUpKSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RpZnlTZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXAuc2Vjb25kcyA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcC5taW51dGVzID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFdhcm5pbmdVc2VyKHRleHRGaWVsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRleHQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5Vc2VyKHRleHRGaWVsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlY29uZHMoYXJncykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZUludGVydmFsKGFyZ3MsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1pbnV0ZXMoYXJncykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZUludGVydmFsKGFyZ3MsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVSZXBldGl0aW9ucyhhcmdzKSB7XHJcbiAgICAgICAgdmFyIHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgdmFyIHRleHQgPSB0ZXh0RmllbGQudGV4dDtcclxuICAgICAgICB2YXIgdmFsID0gcGFyc2VJbnQodGV4dCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWROdW1lcmljVGV4dCh0ZXh0RmllbGQudGV4dCwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RlcC5yZXBldGl0aW9ucyA9IHBhcnNlSW50KHRleHRGaWVsZC50ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wV2FybmluZ1VzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FyblVzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICAvL2Nsb3NlIHRoaXMgbW9kYWwgY29tcG9uZW50IChsaXRlcmFsbHkgXCJ0aGlzXCIgY29tcG9uZW50OyBpdCdzIG1vZGFsIHN1aWNpZGUpXHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhZFR3b0RpZ2l0cyh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnNlY29uZHMgPT09IDAgJiYgdGhpcy5taW51dGVzID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWwucGFkVHdvRGlnaXRzKHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==