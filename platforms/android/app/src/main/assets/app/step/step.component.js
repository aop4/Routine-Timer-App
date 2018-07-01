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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxpREFBZ0Q7QUFDaEQsd0RBQWlEO0FBQ2pELGdDQUF1QztBQUN2Qyx5REFBdUQ7QUFRdkQ7SUFZSSx1QkFBb0IsSUFBVSxFQUFVLFlBQTBCO1FBQTlDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQU5sRSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxtRUFBbUU7UUFDbkUsb0NBQW9DO1FBQ3BELGlCQUFZLEdBQUcsbUJBQVksQ0FBQztJQUs1QixDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELHNDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQiw4QkFBOEI7WUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxD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QUFDO0lBQ0wsQ0FBQztJQXpHUTtRQUFSLFlBQUssRUFBRTtrQ0FBTyxpQkFBSTsrQ0FBQztJQUZYLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDekMsQ0FBQzt5Q0FhNEIsV0FBSSxFQUF3Qiw0QkFBWTtPQVp6RCxhQUFhLENBNkd6QjtJQUFELG9CQUFDO0NBQUEsQUE3R0QsSUE2R0M7QUE3R1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU3RlcCB9IGZyb20gXCIuLi9zaGFyZWQvc3RlcC9zdGVwLm1vZGVsXCI7XG5pbXBvcnQgeyBwYWRUd29EaWdpdHMgfSBmcm9tIFwiLi4vdXRpbFwiO1xuaW1wb3J0IHsgQXVkaW9TZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9hdWRpby5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBzdGFydCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRtci1zdGVwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwic3RlcC9zdGVwLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJzdGVwL3N0ZXAuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc3RlcDogU3RlcDtcbiAgICBpbnRlcnZhbDogbnVtYmVyOyAvL2FuIElEIGZvciBhIEpTIGludGVydmFsXG4gICAgc2Vjb25kczogbnVtYmVyOyAvL2EgY29weSBvZiBzdGVwLnNlY29uZHMgdGhhdCdzIGxvd2VyZWQgYXMgdGltZSBwYXNzZXNcbiAgICBtaW51dGVzOiBudW1iZXI7IC8vYSBjb3B5IG9mIHN0ZXAubWludXRlcyB0aGF0J3MgbG93ZXJlZCBhcyB0aW1lIHBhc3Nlc1xuICAgIHRpbWVyT24gPSBmYWxzZTtcbiAgICBwYXVzZWQgPSBmYWxzZTsgLy93aGV0aGVyIHRoZSB0aW1lciBpcyBwYXVzZWQgbWlkLXRpbWluZyAoc28gdGhlIHJlc2V0IGJ1dHRvbiBrbm93c1xuICAgICAgICAgICAgICAgICAgICAvL3RvIGJlIHZpc2libGUgd2hlbiB0aW1lcidzIHBhdXNlZClcbiAgICBwYWRUd29EaWdpdHMgPSBwYWRUd29EaWdpdHM7XG4gICAgYWxhcm1PbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBhdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5zdG9wQWxhcm0oKTtcbiAgICB9XG5cbiAgICBoYW5kbGVUaW1lckVuZCgpIHtcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2UucGxheUFsYXJtKCk7XG4gICAgICAgIHRoaXMuYWxhcm1PbiA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xvY2soKSB7XG4gICAgICAgIHRoaXMuc2Vjb25kcyAtPSAxO1xuICAgICAgICBpZiAodGhpcy5zZWNvbmRzIDwgMCkge1xuICAgICAgICAgICAgLy9lbmQgb2Ygc3RlcCBoYXMgYmVlbiByZWFjaGVkXG4gICAgICAgICAgICBpZiAodGhpcy5taW51dGVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmRzID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVRpbWVyRW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZXMgLT0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZHMgPSA1OTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUludGVydmFsKCkge1xuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB0aGlzLnVwZGF0ZUNsb2NrKCkgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgaXNPdXRPZlRpbWUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5taW51dGVzID09IDAgJiYgdGhpcy5zZWNvbmRzID09IDApO1xuICAgIH1cblxuICAgIHN0b3BUaW1lcigpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgdGhpcy50aW1lck9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RvcEFsYXJtKCkge1xuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5zdG9wQWxhcm0oKTtcbiAgICAgICAgdGhpcy5hbGFybU9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc3RhcnRUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXJPbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RvcEFsYXJtKCk7XG4gICAgICAgIGlmICh0aGlzLmlzT3V0T2ZUaW1lKCkpIHtcbiAgICAgICAgICAgIC8vcmVzZXQgdGhlIHRpbWVyIHNvIGl0IGNhbiBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMuc3RlcC5taW51dGVzO1xuICAgICAgICAgICAgdGhpcy5zZWNvbmRzID0gdGhpcy5zdGVwLnNlY29uZHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lck9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnZhbCgpO1xuICAgIH1cblxuICAgIHBhdXNlVGltZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgIH1cblxuICAgIHJlc2V0VGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIC8vbWFrZSBzdXJlIGl0IGNvdW50cyBkb3duIGZyb20gdGhlIHRvcCBvZiB0aGUgZmlyc3Qgc2Vjb25kLlxuICAgICAgICAgICAgLy9PdGhlcndpc2UgdGhlIGZpcnN0IHNlY29uZCBtaWdodCBiZSB0aGVyZSBmb3IgbGlrZSAwLjAyIHNlY29uZHMsIHNvIHRoZSB0aW1lJ3Mgb2ZmXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7IC8vc2luY2UgdGVjaG5pY2FsbHkgaXQncyBub3Qgc3VzcGVuZGVkIG1pZC10aWNrLiBIZWxwcyBjb250cm9sIHRoZSBVSVxuICAgICAgICB0aGlzLnN0b3BBbGFybSgpO1xuICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLnN0ZXAubWludXRlcztcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gdGhpcy5zdGVwLnNlY29uZHM7XG4gICAgfVxuXG4gICAgcGxheVBhdXNlQnRuQWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlVGltZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=