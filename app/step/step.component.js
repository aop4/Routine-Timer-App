"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var step_model_1 = require("../shared/step/step.model");
var util_1 = require("../util");
var audio_service_1 = require("../shared/audio.service");
var StepComponent = /** @class */ (function () {
    function StepComponent(page, audioService) {
        this.page = page;
        this.audioService = audioService;
        this.timerOn = false;
        this.paused = false; //whether the timer is paused mid-timing (so the reset button knows
        //to be visible when timer's paused)
        this.padTwoDigits = util_1.padTwoDigits;
    }
    StepComponent.prototype.ngOnInit = function () {
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    };
    StepComponent.prototype.ngOnDestroy = function () {
        this.audioService.stopAlarm();
    };
    StepComponent.prototype.handleTimerEnd = function () {
        this.stopTimer();
        this.audioService.playAlarm();
        this.alarmOn = true;
    };
    StepComponent.prototype.updateClock = function () {
        this.seconds -= 1;
        if (this.seconds < 0) {
            //end of step has been reached
            if (this.minutes === 0) {
                this.seconds = 0;
                this.handleTimerEnd();
            }
            else {
                this.minutes -= 1;
                this.seconds = 59;
            }
        }
    };
    StepComponent.prototype.createInterval = function () {
        var _this = this;
        this.interval = setInterval(function () { _this.updateClock(); }, 1000);
    };
    StepComponent.prototype.isOutOfTime = function () {
        return (this.minutes == 0 && this.seconds == 0);
    };
    StepComponent.prototype.stopTimer = function () {
        clearInterval(this.interval);
        this.timerOn = false;
    };
    StepComponent.prototype.stopAlarm = function () {
        this.audioService.stopAlarm();
        this.alarmOn = false;
    };
    StepComponent.prototype.startTimer = function () {
        if (this.timerOn) {
            return;
        }
        this.paused = false;
        this.stopAlarm();
        if (this.isOutOfTime()) {
            //reset the timer so it can start from the beginning
            this.minutes = this.step.minutes;
            this.seconds = this.step.seconds;
        }
        this.timerOn = true;
        this.createInterval();
    };
    StepComponent.prototype.pauseTimer = function () {
        if (!this.timerOn) {
            return;
        }
        this.paused = true;
        this.stopTimer();
    };
    StepComponent.prototype.resetTimer = function () {
        if (this.timerOn) {
            //make sure it counts down from the top of the first second.
            //Otherwise the first second might be there for like 0.02 seconds, so the time's off
            clearInterval(this.interval);
            this.createInterval();
        }
        this.paused = false; //since technically it's not suspended mid-tick. Helps control the UI
        this.stopAlarm();
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    };
    StepComponent.prototype.playPauseBtnAction = function () {
        if (this.timerOn) {
            this.pauseTimer();
        }
        else {
            this.startTimer();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", step_model_1.Step)
    ], StepComponent.prototype, "step", void 0);
    StepComponent = __decorate([
        core_1.Component({
            selector: "tmr-step",
            templateUrl: "step/step.component.html",
            styleUrls: ["step/step.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, audio_service_1.AudioService])
    ], StepComponent);
    return StepComponent;
}());
exports.StepComponent = StepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxpREFBZ0Q7QUFDaEQsd0RBQWlEO0FBQ2pELGdDQUF1QztBQUN2Qyx5REFBdUQ7QUFRdkQ7SUFZSSx1QkFBb0IsSUFBVSxFQUFVLFlBQTBCO1FBQTlDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQU5sRSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxtRUFBbUU7UUFDbkUsb0NBQW9DO1FBQ3BELGlCQUFZLEdBQUcsbUJBQVksQ0FBQztJQUs1QixDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELHNDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQiw4QkFBOEI7WUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxD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QUFDO0lBQ0wsQ0FBQztJQXpHUTtRQUFSLFlBQUssRUFBRTtrQ0FBTyxpQkFBSTsrQ0FBQztJQUZYLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDekMsQ0FBQzt5Q0FhNEIsV0FBSSxFQUF3Qiw0QkFBWTtPQVp6RCxhQUFhLENBNkd6QjtJQUFELG9CQUFDO0NBQUEsQUE3R0QsSUE2R0M7QUE3R1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgU3RlcCB9IGZyb20gXCIuLi9zaGFyZWQvc3RlcC9zdGVwLm1vZGVsXCI7XHJcbmltcG9ydCB7IHBhZFR3b0RpZ2l0cyB9IGZyb20gXCIuLi91dGlsXCI7XHJcbmltcG9ydCB7IEF1ZGlvU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvYXVkaW8uc2VydmljZVwiO1xyXG5pbXBvcnQgeyBzdGFydCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcInRtci1zdGVwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJzdGVwL3N0ZXAuY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wic3RlcC9zdGVwLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgc3RlcDogU3RlcDtcclxuICAgIGludGVydmFsOiBudW1iZXI7IC8vYW4gSUQgZm9yIGEgSlMgaW50ZXJ2YWxcclxuICAgIHNlY29uZHM6IG51bWJlcjsgLy9hIGNvcHkgb2Ygc3RlcC5zZWNvbmRzIHRoYXQncyBsb3dlcmVkIGFzIHRpbWUgcGFzc2VzXHJcbiAgICBtaW51dGVzOiBudW1iZXI7IC8vYSBjb3B5IG9mIHN0ZXAubWludXRlcyB0aGF0J3MgbG93ZXJlZCBhcyB0aW1lIHBhc3Nlc1xyXG4gICAgdGltZXJPbiA9IGZhbHNlO1xyXG4gICAgcGF1c2VkID0gZmFsc2U7IC8vd2hldGhlciB0aGUgdGltZXIgaXMgcGF1c2VkIG1pZC10aW1pbmcgKHNvIHRoZSByZXNldCBidXR0b24ga25vd3NcclxuICAgICAgICAgICAgICAgICAgICAvL3RvIGJlIHZpc2libGUgd2hlbiB0aW1lcidzIHBhdXNlZClcclxuICAgIHBhZFR3b0RpZ2l0cyA9IHBhZFR3b0RpZ2l0cztcclxuICAgIGFsYXJtT246IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGF1ZGlvU2VydmljZTogQXVkaW9TZXJ2aWNlKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gdGhpcy5zdGVwLnNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVGltZXJFbmQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5wbGF5QWxhcm0oKTtcclxuICAgICAgICB0aGlzLmFsYXJtT24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNsb2NrKCkge1xyXG4gICAgICAgIHRoaXMuc2Vjb25kcyAtPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLnNlY29uZHMgPCAwKSB7XHJcbiAgICAgICAgICAgIC8vZW5kIG9mIHN0ZXAgaGFzIGJlZW4gcmVhY2hlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy5taW51dGVzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVUaW1lckVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGVzIC09IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZHMgPSA1OTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVJbnRlcnZhbCgpIHtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB0aGlzLnVwZGF0ZUNsb2NrKCkgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNPdXRPZlRpbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm1pbnV0ZXMgPT0gMCAmJiB0aGlzLnNlY29uZHMgPT0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcFRpbWVyKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy50aW1lck9uID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcEFsYXJtKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnN0b3BBbGFybSgpO1xyXG4gICAgICAgIHRoaXMuYWxhcm1PbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0VGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZXJPbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9wQWxhcm0oKTtcclxuICAgICAgICBpZiAodGhpcy5pc091dE9mVGltZSgpKSB7XHJcbiAgICAgICAgICAgIC8vcmVzZXQgdGhlIHRpbWVyIHNvIGl0IGNhbiBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmdcclxuICAgICAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XHJcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVyT24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlSW50ZXJ2YWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZVRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy50aW1lck9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XHJcbiAgICAgICAgICAgIC8vbWFrZSBzdXJlIGl0IGNvdW50cyBkb3duIGZyb20gdGhlIHRvcCBvZiB0aGUgZmlyc3Qgc2Vjb25kLlxyXG4gICAgICAgICAgICAvL090aGVyd2lzZSB0aGUgZmlyc3Qgc2Vjb25kIG1pZ2h0IGJlIHRoZXJlIGZvciBsaWtlIDAuMDIgc2Vjb25kcywgc28gdGhlIHRpbWUncyBvZmZcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlOyAvL3NpbmNlIHRlY2huaWNhbGx5IGl0J3Mgbm90IHN1c3BlbmRlZCBtaWQtdGljay4gSGVscHMgY29udHJvbCB0aGUgVUlcclxuICAgICAgICB0aGlzLnN0b3BBbGFybSgpO1xyXG4gICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMuc3RlcC5taW51dGVzO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlQYXVzZUJ0bkFjdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2VUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=