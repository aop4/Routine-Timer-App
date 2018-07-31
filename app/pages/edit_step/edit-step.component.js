"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var pass_data_service_1 = require("../../shared/pass-data.service");
var Util = require("../../util");
var EditStepComponent = /** @class */ (function () {
    function EditStepComponent(params, dataRetriever) {
        this.params = params;
        this.dataRetriever = dataRetriever;
    }
    EditStepComponent.prototype.ngOnInit = function () {
        //retrieve the step's data
        this.step = this.params.context.step;
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
        this.repetitions = this.step.repetitions;
    };
    /* Remove the red warning border from textField */
    EditStepComponent.prototype.stopWarningUser = function (textField) {
        textField.borderWidth = "0";
    };
    /* Add a red warning border to textField */
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
    /* Called when the minutes or second field is modified. If the text within it
    can be converted to an integer, the corresponding attribute of this component
    is updated. Otherwise, the user is warned of invalid input. */
    EditStepComponent.prototype.updateTimeInterval = function (args, modifySeconds) {
        //retrieve the entered text
        var textField = args.object;
        var text = textField.text;
        //convert the entered text to a number
        var val = parseInt(text);
        //if conversion to integer successful
        if (this.validNumericText(text, true)) {
            //update component's data
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
    /* Attempts to store the data in the seconds text field as an integer
    value, and warns the user if this can't be done. */
    EditStepComponent.prototype.updateSeconds = function (args) {
        this.updateTimeInterval(args, true);
    };
    /* Attempts to store the data in the minutes text field as an integer
    value, and warns the user if this can't be done. */
    EditStepComponent.prototype.updateMinutes = function (args) {
        this.updateTimeInterval(args, false);
    };
    /* Attempts to store the data in the repetitions text field as an integer
    value, and warns the user if this can't be done. */
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
    /* Close this modal component (literally "this" component; it's modal suicide) */
    EditStepComponent.prototype.closeModal = function () {
        this.params.closeCallback();
    };
    /* Returns the default text in the minutes and the seconds text fields. If there
    is no time associated with the step, there is no default text in them. If
    there is a time associated with the step, the default text is that time,
    where the minutes and seconds are zero-extended if they're less than 9. */
    EditStepComponent.prototype.padTwoDigits = function (val) {
        if (this.seconds === 0 && this.minutes === 0) {
            return "";
        }
        else {
            return Util.padTwoDigits(val);
        }
    };
    EditStepComponent = __decorate([
        core_1.Component({
            selector: "tmr-edit-step",
            templateUrl: "pages/edit_step/edit-step.component.html",
            styleUrls: ["pages/edit_step/edit-step.component.css"]
        })
        /* A modal shown over the edit task page for adding/editing a step within a routine */
        ,
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams, pass_data_service_1.DataRetriever])
    ], EditStepComponent);
    return EditStepComponent;
}());
exports.EditStepComponent = EditStepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdGVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsbUVBQTRFO0FBRzVFLG9FQUErRDtBQUUvRCxpQ0FBbUM7QUFTbkM7SUFRSSwyQkFBb0IsTUFBeUIsRUFBVSxhQUE0QjtRQUEvRCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBRW5GLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzdDLENBQUM7SUFFRCxrREFBa0Q7SUFDbEQsMkNBQWUsR0FBZixVQUFnQixTQUFvQjtRQUNoQyxTQUFTLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUNoQyxDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLG9DQUFRLEdBQVIsVUFBUyxTQUFvQjtRQUN6QixTQUFTLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDt5REFDcUQ7SUFDckQsNENBQWdCLEdBQWhCLFVBQWlCLElBQVksRUFBRSxXQUFvQjtRQUMvQyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLEdBQUcsSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDckUsQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztrRUFFOEQ7SUFDOUQsOENBQWtCLEdBQWxCLFVBQW1CLElBQUksRUFBRSxhQUFhO1FBQ2xDLDJCQUEyQjtRQUMzQixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDMUIsc0NBQXNDO1FBQ3RDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixxQ0FBcUM7UUFDckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMseUJBQXlCO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUM1QixDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQzVCLENBQUM7WUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQUVEO3VEQUNtRDtJQUNuRCx5Q0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEO3VEQUNtRDtJQUNuRCx5Q0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEO3VEQUNtRDtJQUNuRCw2Q0FBaUIsR0FBakIsVUFBa0IsSUFBSTtRQUNsQixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0wsQ0FBQztJQUVELGlGQUFpRjtJQUNqRixzQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs4RUFHMEU7SUFDMUUsd0NBQVksR0FBWixVQUFhLEdBQVc7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0wsQ0FBQztJQTlHUSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7U0FDekQsQ0FBQztRQUNGLHNGQUFzRjs7eUNBU3RELDJCQUFpQixFQUF5QixpQ0FBYTtPQVIxRSxpQkFBaUIsQ0FnSDdCO0lBQUQsd0JBQUM7Q0FBQSxBQWhIRCxJQWdIQztBQWhIWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcclxuaW1wb3J0ICogYXMgVXRpbCBmcm9tIFwiLi4vLi4vdXRpbFwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwidG1yLWVkaXQtc3RlcFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvZWRpdF9zdGVwL2VkaXQtc3RlcC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9lZGl0X3N0ZXAvZWRpdC1zdGVwLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuLyogQSBtb2RhbCBzaG93biBvdmVyIHRoZSBlZGl0IHRhc2sgcGFnZSBmb3IgYWRkaW5nL2VkaXRpbmcgYSBzdGVwIHdpdGhpbiBhIHJvdXRpbmUgKi9cclxuZXhwb3J0IGNsYXNzIEVkaXRTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBzdGVwOiBTdGVwOyAvL3RoZSBzdGVwIHJlcHJlc2VudGVkIGJ5IHRoaXMgY29tcG9uZW50XHJcbiAgICAvL3Byb3BlcnRpZXMgb2YgdGhhdCBzdGVwXHJcbiAgICBtaW51dGVzOiBudW1iZXI7XHJcbiAgICBzZWNvbmRzOiBudW1iZXI7XHJcbiAgICByZXBldGl0aW9uczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSBkYXRhUmV0cmlldmVyOiBEYXRhUmV0cmlldmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgLy9yZXRyaWV2ZSB0aGUgc3RlcCdzIGRhdGFcclxuICAgICAgICB0aGlzLnN0ZXAgPSB0aGlzLnBhcmFtcy5jb250ZXh0LnN0ZXA7XHJcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gdGhpcy5zdGVwLnNlY29uZHM7XHJcbiAgICAgICAgdGhpcy5yZXBldGl0aW9ucyA9IHRoaXMuc3RlcC5yZXBldGl0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKiBSZW1vdmUgdGhlIHJlZCB3YXJuaW5nIGJvcmRlciBmcm9tIHRleHRGaWVsZCAqL1xyXG4gICAgc3RvcFdhcm5pbmdVc2VyKHRleHRGaWVsZDogVGV4dEZpZWxkKSB7XHJcbiAgICAgICAgdGV4dEZpZWxkLmJvcmRlcldpZHRoID0gXCIwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyogQWRkIGEgcmVkIHdhcm5pbmcgYm9yZGVyIHRvIHRleHRGaWVsZCAqL1xyXG4gICAgd2FyblVzZXIodGV4dEZpZWxkOiBUZXh0RmllbGQpIHtcclxuICAgICAgICB0ZXh0RmllbGQuYm9yZGVyQm90dG9tV2lkdGggPSAyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFJldHVybnMgZmFsc2UgaWYgdGV4dEZpZWxkIGNvbnRhaW5zIGFueXRoaW5nIGJlc2lkZXMgYSBub25uZWdhdGl2ZSBpbnRlZ2VyLCBvciBpZlxyXG4gICAgemVyb0FsbG93ZWQgaXMgZmFsc2UgYW5kIHRoZSB0ZXh0ZmllbGQgY29udGFpbnMgMC4gKi9cclxuICAgIHZhbGlkTnVtZXJpY1RleHQodGV4dDogc3RyaW5nLCB6ZXJvQWxsb3dlZDogYm9vbGVhbikge1xyXG4gICAgICAgIHZhciBudW1lcmljVmFsID0gcGFyc2VJbnQodGV4dCk7XHJcbiAgICAgICAgaWYgKG51bWVyaWNWYWwgPT09IE5hTiB8fCBudW1lcmljVmFsIDwgMCB8fCAhTnVtYmVyLmlzSW50ZWdlcihudW1lcmljVmFsKSB8fFxyXG4gICAgICAgICAgICAobnVtZXJpY1ZhbCA9PT0gMCAmJiAhemVyb0FsbG93ZWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyogQ2FsbGVkIHdoZW4gdGhlIG1pbnV0ZXMgb3Igc2Vjb25kIGZpZWxkIGlzIG1vZGlmaWVkLiBJZiB0aGUgdGV4dCB3aXRoaW4gaXRcclxuICAgIGNhbiBiZSBjb252ZXJ0ZWQgdG8gYW4gaW50ZWdlciwgdGhlIGNvcnJlc3BvbmRpbmcgYXR0cmlidXRlIG9mIHRoaXMgY29tcG9uZW50XHJcbiAgICBpcyB1cGRhdGVkLiBPdGhlcndpc2UsIHRoZSB1c2VyIGlzIHdhcm5lZCBvZiBpbnZhbGlkIGlucHV0LiAqL1xyXG4gICAgdXBkYXRlVGltZUludGVydmFsKGFyZ3MsIG1vZGlmeVNlY29uZHMpIHtcclxuICAgICAgICAvL3JldHJpZXZlIHRoZSBlbnRlcmVkIHRleHRcclxuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgdGV4dCA9IHRleHRGaWVsZC50ZXh0O1xyXG4gICAgICAgIC8vY29udmVydCB0aGUgZW50ZXJlZCB0ZXh0IHRvIGEgbnVtYmVyXHJcbiAgICAgICAgbGV0IHZhbCA9IHBhcnNlSW50KHRleHQpO1xyXG4gICAgICAgIC8vaWYgY29udmVyc2lvbiB0byBpbnRlZ2VyIHN1Y2Nlc3NmdWxcclxuICAgICAgICBpZiAodGhpcy52YWxpZE51bWVyaWNUZXh0KHRleHQsIHRydWUpKSB7XHJcbiAgICAgICAgICAgIC8vdXBkYXRlIGNvbXBvbmVudCdzIGRhdGFcclxuICAgICAgICAgICAgaWYgKG1vZGlmeVNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcC5zZWNvbmRzID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwLm1pbnV0ZXMgPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zdG9wV2FybmluZ1VzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9pZiBjb252ZXJzaW9uIHRvIGludGVnZXIgdW5zdWNjZXNzZnVsXHJcbiAgICAgICAgZWxzZSBpZiAodGV4dCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FyblVzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogQXR0ZW1wdHMgdG8gc3RvcmUgdGhlIGRhdGEgaW4gdGhlIHNlY29uZHMgdGV4dCBmaWVsZCBhcyBhbiBpbnRlZ2VyXHJcbiAgICB2YWx1ZSwgYW5kIHdhcm5zIHRoZSB1c2VyIGlmIHRoaXMgY2FuJ3QgYmUgZG9uZS4gKi9cclxuICAgIHVwZGF0ZVNlY29uZHMoYXJncykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZUludGVydmFsKGFyZ3MsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEF0dGVtcHRzIHRvIHN0b3JlIHRoZSBkYXRhIGluIHRoZSBtaW51dGVzIHRleHQgZmllbGQgYXMgYW4gaW50ZWdlclxyXG4gICAgdmFsdWUsIGFuZCB3YXJucyB0aGUgdXNlciBpZiB0aGlzIGNhbid0IGJlIGRvbmUuICovXHJcbiAgICB1cGRhdGVNaW51dGVzKGFyZ3MpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVJbnRlcnZhbChhcmdzLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogQXR0ZW1wdHMgdG8gc3RvcmUgdGhlIGRhdGEgaW4gdGhlIHJlcGV0aXRpb25zIHRleHQgZmllbGQgYXMgYW4gaW50ZWdlclxyXG4gICAgdmFsdWUsIGFuZCB3YXJucyB0aGUgdXNlciBpZiB0aGlzIGNhbid0IGJlIGRvbmUuICovXHJcbiAgICB1cGRhdGVSZXBldGl0aW9ucyhhcmdzKSB7XHJcbiAgICAgICAgdmFyIHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XHJcbiAgICAgICAgdmFyIHRleHQgPSB0ZXh0RmllbGQudGV4dDtcclxuICAgICAgICB2YXIgdmFsID0gcGFyc2VJbnQodGV4dCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsaWROdW1lcmljVGV4dCh0ZXh0RmllbGQudGV4dCwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RlcC5yZXBldGl0aW9ucyA9IHBhcnNlSW50KHRleHRGaWVsZC50ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wV2FybmluZ1VzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FyblVzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogQ2xvc2UgdGhpcyBtb2RhbCBjb21wb25lbnQgKGxpdGVyYWxseSBcInRoaXNcIiBjb21wb25lbnQ7IGl0J3MgbW9kYWwgc3VpY2lkZSkgKi9cclxuICAgIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFJldHVybnMgdGhlIGRlZmF1bHQgdGV4dCBpbiB0aGUgbWludXRlcyBhbmQgdGhlIHNlY29uZHMgdGV4dCBmaWVsZHMuIElmIHRoZXJlXHJcbiAgICBpcyBubyB0aW1lIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3RlcCwgdGhlcmUgaXMgbm8gZGVmYXVsdCB0ZXh0IGluIHRoZW0uIElmXHJcbiAgICB0aGVyZSBpcyBhIHRpbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBzdGVwLCB0aGUgZGVmYXVsdCB0ZXh0IGlzIHRoYXQgdGltZSxcclxuICAgIHdoZXJlIHRoZSBtaW51dGVzIGFuZCBzZWNvbmRzIGFyZSB6ZXJvLWV4dGVuZGVkIGlmIHRoZXkncmUgbGVzcyB0aGFuIDkuICovXHJcbiAgICBwYWRUd29EaWdpdHModmFsOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWNvbmRzID09PSAwICYmIHRoaXMubWludXRlcyA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLnBhZFR3b0RpZ2l0cyh2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=