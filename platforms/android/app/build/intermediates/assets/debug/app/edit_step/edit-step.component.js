"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var pass_data_service_1 = require("../shared/pass-data.service");
var page_1 = require("tns-core-modules/ui/page");
var common_1 = require("@angular/common");
var Util = require("../util");
var EditStepComponent = /** @class */ (function () {
    function EditStepComponent(page, location, params) {
        this.page = page;
        this.location = location;
        this.params = params;
    }
    EditStepComponent.prototype.ngOnInit = function () {
        this.step = pass_data_service_1.DataRetriever.data;
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
        }),
        __metadata("design:paramtypes", [page_1.Page, common_1.Location, dialogs_1.ModalDialogParams])
    ], EditStepComponent);
    return EditStepComponent;
}());
exports.EditStepComponent = EditStepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdGVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBZ0Y7QUFDaEYsbUVBQTRFO0FBQzVFLGlFQUE0RDtBQUU1RCxpREFBZ0Q7QUFLaEQsMENBQXlDO0FBQ3pDLDhCQUFnQztBQVNoQztJQXVGSSwyQkFBb0IsSUFBVSxFQUFVLFFBQWtCLEVBQVUsTUFBeUI7UUFBekUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjtJQUU3RixDQUFDO0lBakZELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGlDQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzdDLENBQUM7SUFFRCwyQ0FBZSxHQUFmLFVBQWdCLFNBQW9CO1FBQ2hDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxvQ0FBUSxHQUFSLFVBQVMsU0FBb0I7UUFDekIsU0FBUyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7eURBQ3FEO0lBQ3JELDRDQUFnQixHQUFoQixVQUFpQixJQUFZLEVBQUUsV0FBb0I7UUFDL0MsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxHQUFHLElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FB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QWU7WUFDekIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztTQUNuRCxDQUFDO3lDQXdGNEIsV0FBSSxFQUFvQixpQkFBUSxFQUFrQiwyQkFBaUI7T0F2RnBGLGlCQUFpQixDQTJGN0I7SUFBRCx3QkFBQztDQUFBLEFBM0ZELElBMkZDO0FBM0ZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0ICogYXMgVXRpbCBmcm9tIFwiLi4vdXRpbFwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJ0bXItZWRpdC1zdGVwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJlZGl0X3N0ZXAvZWRpdC1zdGVwLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImVkaXRfc3RlcC9lZGl0LXN0ZXAuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRWRpdFN0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHN0ZXA6IFN0ZXA7IC8vdGhlIHN0ZXAgcmVwcmVzZW50ZWQgYnkgdGhpcyBjb21wb25lbnRcclxuICAgIG1pbnV0ZXM6IG51bWJlcjtcclxuICAgIHNlY29uZHM6IG51bWJlcjtcclxuICAgIHJlcGV0aXRpb25zOiBudW1iZXI7XHJcbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwID0gRGF0YVJldHJpZXZlci5kYXRhO1xyXG4gICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMuc3RlcC5taW51dGVzO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xyXG4gICAgICAgIHRoaXMucmVwZXRpdGlvbnMgPSB0aGlzLnN0ZXAucmVwZXRpdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcFdhcm5pbmdVc2VyKHRleHRGaWVsZDogVGV4dEZpZWxkKSB7XHJcbiAgICAgICAgdGV4dEZpZWxkLmJvcmRlcldpZHRoID0gXCIwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgd2FyblVzZXIodGV4dEZpZWxkOiBUZXh0RmllbGQpIHtcclxuICAgICAgICB0ZXh0RmllbGQuYm9yZGVyQm90dG9tV2lkdGggPSAyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFJldHVybnMgZmFsc2UgaWYgdGV4dEZpZWxkIGNvbnRhaW5zIGFueXRoaW5nIGJlc2lkZXMgYSBub25uZWdhdGl2ZSBpbnRlZ2VyLCBvciBpZlxyXG4gICAgemVyb0FsbG93ZWQgaXMgZmFsc2UgYW5kIHRoZSB0ZXh0ZmllbGQgY29udGFpbnMgMC4gKi9cclxuICAgIHZhbGlkTnVtZXJpY1RleHQodGV4dDogc3RyaW5nLCB6ZXJvQWxsb3dlZDogYm9vbGVhbikge1xyXG4gICAgICAgIHZhciBudW1lcmljVmFsID0gcGFyc2VJbnQodGV4dCk7XHJcbiAgICAgICAgaWYgKG51bWVyaWNWYWwgPT09IE5hTiB8fCBudW1lcmljVmFsIDwgMCB8fCAhTnVtYmVyLmlzSW50ZWdlcihudW1lcmljVmFsKSB8fFxyXG4gICAgICAgICAgICAobnVtZXJpY1ZhbCA9PT0gMCAmJiAhemVyb0FsbG93ZWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGltZUludGVydmFsKGFyZ3MsIG1vZGlmeVNlY29uZHMpIHtcclxuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgdGV4dCA9IHRleHRGaWVsZC50ZXh0O1xyXG4gICAgICAgIGxldCB2YWwgPSBwYXJzZUludCh0ZXh0KTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZE51bWVyaWNUZXh0KHRleHQsIHRydWUpKSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RpZnlTZWNvbmRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXAuc2Vjb25kcyA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcC5taW51dGVzID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFdhcm5pbmdVc2VyKHRleHRGaWVsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRleHQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLndhcm5Vc2VyKHRleHRGaWVsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlY29uZHMoYXJncykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZUludGVydmFsKGFyZ3MsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU1pbnV0ZXMoYXJncykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZUludGVydmFsKGFyZ3MsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVSZXBldGl0aW9ucyhhcmdzKSB7XHJcbiAgICAgICAgdmFyIHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgdmFyIHRleHQgPSB0ZXh0RmllbGQudGV4dDtcclxuICAgICAgICB2YXIgdmFsID0gcGFyc2VJbnQodGV4dCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWROdW1lcmljVGV4dCh0ZXh0RmllbGQudGV4dCwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RlcC5yZXBldGl0aW9ucyA9IHBhcnNlSW50KHRleHRGaWVsZC50ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wV2FybmluZ1VzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FyblVzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICAvL2Nsb3NlIHRoaXMgbW9kYWwgY29tcG9uZW50IChsaXRlcmFsbHkgXCJ0aGlzXCIgY29tcG9uZW50OyBpdCdzIG1vZGFsIHN1aWNpZGUpXHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhZFR3b0RpZ2l0cyh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnNlY29uZHMgPT09IDAgJiYgdGhpcy5taW51dGVzID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWwucGFkVHdvRGlnaXRzKHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcykge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSJdfQ==