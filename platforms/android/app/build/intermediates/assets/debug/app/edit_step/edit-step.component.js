"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var pass_data_service_1 = require("../shared/pass-data.service");
var page_1 = require("tns-core-modules/ui/page");
var util_1 = require("../util");
var common_1 = require("@angular/common");
var EditStepComponent = /** @class */ (function () {
    function EditStepComponent(page, location, params) {
        this.page = page;
        this.location = location;
        this.params = params;
        this.padTwoDigits = util_1.padTwoDigits;
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
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdGVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBZ0Y7QUFDaEYsbUVBQTRFO0FBQzVFLGlFQUE0RDtBQUU1RCxpREFBZ0Q7QUFJaEQsZ0NBQXVDO0FBRXZDLDBDQUF5QztBQVN6QztJQStFSSwyQkFBb0IsSUFBVSxFQUFVLFFBQWtCLEVBQVUsTUFBeUI7UUFBekUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQTVFN0YsaUJBQVksR0FBRyxtQkFBWSxDQUFDO0lBOEU1QixDQUFDO0lBeEVELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGlDQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzdDLENBQUM7SUFFRCwyQ0FBZSxHQUFmLFVBQWdCLFNBQW9CO1FBQ2hDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxvQ0FBUSxHQUFSLFVBQVMsU0FBb0I7UUFDekIsU0FBUyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7eURBQ3FEO0lBQ3JELDRDQUFnQixHQUFoQixVQUFpQixJQUFZLEVBQUUsV0FBb0I7UUFDL0MsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxHQUFHLElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQ3JFLENBQUMsVUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw4Q0FBa0IsR0FBbEIsVUFBbUIsSUFBSSxFQUFFLGFBQWE7UUFDbEMsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQzFCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDNUIsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUM1QixDQUFDO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDTCxDQUFDO0lBRUQseUNBQWEsR0FBYixVQUFjLElBQUk7UUFDZCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELDZDQUFpQixHQUFqQixVQUFrQixJQUFJO1FBQ2xCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQVUsR0FBVjtRQUNJLDZFQUE2RTtRQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUF0RXVCO1FBQXZCLGdCQUFTLENBQUMsV0FBVyxDQUFDO2tDQUFZLGlCQUFVO3dEQUFDO0lBUHJDLGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztTQUNuRCxDQUFDO3lDQWdGNEIsV0FBSSxFQUFvQixpQkFBUSxFQUFrQiwyQkFBaUI7T0EvRXBGLGlCQUFpQixDQW1GN0I7SUFBRCx3QkFBQztDQUFBLEFBbkZELElBbUZDO0FBbkZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XHJcbmltcG9ydCB7IHBhZFR3b0RpZ2l0cyB9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcInRtci1lZGl0LXN0ZXBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImVkaXRfc3RlcC9lZGl0LXN0ZXAuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiZWRpdF9zdGVwL2VkaXQtc3RlcC5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFZGl0U3RlcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgc3RlcDogU3RlcDsgLy90aGUgc3RlcCByZXByZXNlbnRlZCBieSB0aGlzIGNvbXBvbmVudFxyXG4gICAgcGFkVHdvRGlnaXRzID0gcGFkVHdvRGlnaXRzO1xyXG4gICAgbWludXRlczogbnVtYmVyO1xyXG4gICAgc2Vjb25kczogbnVtYmVyO1xyXG4gICAgcmVwZXRpdGlvbnM6IG51bWJlcjtcclxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnN0ZXAgPSBEYXRhUmV0cmlldmVyLmRhdGE7XHJcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gdGhpcy5zdGVwLnNlY29uZHM7XHJcbiAgICAgICAgdGhpcy5yZXBldGl0aW9ucyA9IHRoaXMuc3RlcC5yZXBldGl0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBzdG9wV2FybmluZ1VzZXIodGV4dEZpZWxkOiBUZXh0RmllbGQpIHtcclxuICAgICAgICB0ZXh0RmllbGQuYm9yZGVyV2lkdGggPSBcIjBcIjtcclxuICAgIH1cclxuXHJcbiAgICB3YXJuVXNlcih0ZXh0RmllbGQ6IFRleHRGaWVsZCkge1xyXG4gICAgICAgIHRleHRGaWVsZC5ib3JkZXJCb3R0b21XaWR0aCA9IDI7XHJcbiAgICB9XHJcblxyXG4gICAgLyogUmV0dXJucyBmYWxzZSBpZiB0ZXh0RmllbGQgY29udGFpbnMgYW55dGhpbmcgYmVzaWRlcyBhIG5vbm5lZ2F0aXZlIGludGVnZXIsIG9yIGlmXHJcbiAgICB6ZXJvQWxsb3dlZCBpcyBmYWxzZSBhbmQgdGhlIHRleHRmaWVsZCBjb250YWlucyAwLiAqL1xyXG4gICAgdmFsaWROdW1lcmljVGV4dCh0ZXh0OiBzdHJpbmcsIHplcm9BbGxvd2VkOiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFyIG51bWVyaWNWYWwgPSBwYXJzZUludCh0ZXh0KTtcclxuICAgICAgICBpZiAobnVtZXJpY1ZhbCA9PT0gTmFOIHx8IG51bWVyaWNWYWwgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG51bWVyaWNWYWwpIHx8XHJcbiAgICAgICAgICAgIChudW1lcmljVmFsID09PSAwICYmICF6ZXJvQWxsb3dlZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaW1lSW50ZXJ2YWwoYXJncywgbW9kaWZ5U2Vjb25kcykge1xyXG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCB0ZXh0ID0gdGV4dEZpZWxkLnRleHQ7XHJcbiAgICAgICAgbGV0IHZhbCA9IHBhcnNlSW50KHRleHQpO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkTnVtZXJpY1RleHQodGV4dCwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgaWYgKG1vZGlmeVNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcC5zZWNvbmRzID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwLm1pbnV0ZXMgPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zdG9wV2FybmluZ1VzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FyblVzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2Vjb25kcyhhcmdzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lSW50ZXJ2YWwoYXJncywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTWludXRlcyhhcmdzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lSW50ZXJ2YWwoYXJncywgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVJlcGV0aXRpb25zKGFyZ3MpIHtcclxuICAgICAgICB2YXIgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcclxuICAgICAgICB2YXIgdGV4dCA9IHRleHRGaWVsZC50ZXh0O1xyXG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUludCh0ZXh0KTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZE51bWVyaWNUZXh0KHRleHRGaWVsZC50ZXh0LCBmYWxzZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGVwLnJlcGV0aXRpb25zID0gcGFyc2VJbnQodGV4dEZpZWxkLnRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BXYXJuaW5nVXNlcih0ZXh0RmllbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuVXNlcih0ZXh0RmllbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIC8vY2xvc2UgdGhpcyBtb2RhbCBjb21wb25lbnQgKGxpdGVyYWxseSBcInRoaXNcIiBjb21wb25lbnQ7IGl0J3MgbW9kYWwgc3VpY2lkZSlcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59Il19