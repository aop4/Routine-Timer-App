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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1zdGVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsbUVBQTRFO0FBRzVFLG9FQUErRDtBQUUvRCxpQ0FBbUM7QUFTbkM7SUFRSSwyQkFBb0IsTUFBeUIsRUFBVSxhQUE0QjtRQUEvRCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBRW5GLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM3QyxDQUFDO0lBRUQsMkNBQWUsR0FBZixVQUFnQixTQUFvQjtRQUNoQyxTQUFTLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUNoQyxDQUFDO0lBRUQsb0NBQVEsR0FBUixVQUFTLFNBQW9CO1FBQ3pCLFNBQVMsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEO3lEQUNxRDtJQUNyRCw0Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBWSxFQUFFLFdBQW9CO1FBQy9DLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssR0FBRyxJQUFJLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUNyRSxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUks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LENBQUM7U0FDekQsQ0FBQztRQUNGLHNGQUFzRjs7eUNBU3RELDJCQUFpQixFQUF5QixpQ0FBYTtPQVIxRSxpQkFBaUIsQ0EyRjdCO0lBQUQsd0JBQUM7Q0FBQSxBQTNGRCxJQTJGQztBQTNGWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XHJcblxyXG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcclxuaW1wb3J0ICogYXMgVXRpbCBmcm9tIFwiLi4vLi4vdXRpbFwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwidG1yLWVkaXQtc3RlcFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvZWRpdF9zdGVwL2VkaXQtc3RlcC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9lZGl0X3N0ZXAvZWRpdC1zdGVwLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuLyogQSBtb2RhbCBzaG93biBvdmVyIHRoZSBlZGl0IHRhc2sgcGFnZSBmb3IgYWRkaW5nL2VkaXRpbmcgYSBzdGVwIHdpdGhpbiBhIHJvdXRpbmUgKi9cclxuZXhwb3J0IGNsYXNzIEVkaXRTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBzdGVwOiBTdGVwOyAvL3RoZSBzdGVwIHJlcHJlc2VudGVkIGJ5IHRoaXMgY29tcG9uZW50XHJcbiAgICBtaW51dGVzOiBudW1iZXI7XHJcbiAgICBzZWNvbmRzOiBudW1iZXI7XHJcbiAgICByZXBldGl0aW9uczogbnVtYmVyO1xyXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcywgcHJpdmF0ZSBkYXRhUmV0cmlldmVyOiBEYXRhUmV0cmlldmVyKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwID0gdGhpcy5kYXRhUmV0cmlldmVyLmRhdGE7XHJcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gdGhpcy5zdGVwLnNlY29uZHM7XHJcbiAgICAgICAgdGhpcy5yZXBldGl0aW9ucyA9IHRoaXMuc3RlcC5yZXBldGl0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBzdG9wV2FybmluZ1VzZXIodGV4dEZpZWxkOiBUZXh0RmllbGQpIHtcclxuICAgICAgICB0ZXh0RmllbGQuYm9yZGVyV2lkdGggPSBcIjBcIjtcclxuICAgIH1cclxuXHJcbiAgICB3YXJuVXNlcih0ZXh0RmllbGQ6IFRleHRGaWVsZCkge1xyXG4gICAgICAgIHRleHRGaWVsZC5ib3JkZXJCb3R0b21XaWR0aCA9IDI7XHJcbiAgICB9XHJcblxyXG4gICAgLyogUmV0dXJucyBmYWxzZSBpZiB0ZXh0RmllbGQgY29udGFpbnMgYW55dGhpbmcgYmVzaWRlcyBhIG5vbm5lZ2F0aXZlIGludGVnZXIsIG9yIGlmXHJcbiAgICB6ZXJvQWxsb3dlZCBpcyBmYWxzZSBhbmQgdGhlIHRleHRmaWVsZCBjb250YWlucyAwLiAqL1xyXG4gICAgdmFsaWROdW1lcmljVGV4dCh0ZXh0OiBzdHJpbmcsIHplcm9BbGxvd2VkOiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFyIG51bWVyaWNWYWwgPSBwYXJzZUludCh0ZXh0KTtcclxuICAgICAgICBpZiAobnVtZXJpY1ZhbCA9PT0gTmFOIHx8IG51bWVyaWNWYWwgPCAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG51bWVyaWNWYWwpIHx8XHJcbiAgICAgICAgICAgIChudW1lcmljVmFsID09PSAwICYmICF6ZXJvQWxsb3dlZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaW1lSW50ZXJ2YWwoYXJncywgbW9kaWZ5U2Vjb25kcykge1xyXG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCB0ZXh0ID0gdGV4dEZpZWxkLnRleHQ7XHJcbiAgICAgICAgbGV0IHZhbCA9IHBhcnNlSW50KHRleHQpO1xyXG4gICAgICAgIGlmICh0aGlzLnZhbGlkTnVtZXJpY1RleHQodGV4dCwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgaWYgKG1vZGlmeVNlY29uZHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcC5zZWNvbmRzID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwLm1pbnV0ZXMgPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zdG9wV2FybmluZ1VzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGV4dCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FyblVzZXIodGV4dEZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2Vjb25kcyhhcmdzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lSW50ZXJ2YWwoYXJncywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTWludXRlcyhhcmdzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lSW50ZXJ2YWwoYXJncywgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVJlcGV0aXRpb25zKGFyZ3MpIHtcclxuICAgICAgICB2YXIgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcclxuICAgICAgICB2YXIgdGV4dCA9IHRleHRGaWVsZC50ZXh0O1xyXG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUludCh0ZXh0KTtcclxuICAgICAgICBpZiAodGhpcy52YWxpZE51bWVyaWNUZXh0KHRleHRGaWVsZC50ZXh0LCBmYWxzZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGVwLnJlcGV0aXRpb25zID0gcGFyc2VJbnQodGV4dEZpZWxkLnRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BXYXJuaW5nVXNlcih0ZXh0RmllbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuVXNlcih0ZXh0RmllbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIC8vY2xvc2UgdGhpcyBtb2RhbCBjb21wb25lbnQgKGxpdGVyYWxseSBcInRoaXNcIiBjb21wb25lbnQ7IGl0J3MgbW9kYWwgc3VpY2lkZSlcclxuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFkVHdvRGlnaXRzKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2Vjb25kcyA9PT0gMCAmJiB0aGlzLm1pbnV0ZXMgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gVXRpbC5wYWRUd29EaWdpdHModmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19